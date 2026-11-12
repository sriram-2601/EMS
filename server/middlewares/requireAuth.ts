import { getAuth } from "@clerk/express";
import type { RequestHandler } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, type User } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      dbUser?: User;
    }
  }
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // The original OIDC subject is stored as users.id. Clerk preserves it in
    // sessionClaims.userId for migrated users; new accounts use their Clerk ID.
    const claimedId = auth.sessionClaims?.userId;
    const userId = typeof claimedId === "string" && claimedId ? claimedId : auth.userId;
    let [dbUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!dbUser) {
      const [inserted] = await db.insert(users).values({ id: userId }).onConflictDoNothing().returning();
      if (inserted) dbUser = inserted;
      else [dbUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    }
    if (!dbUser) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    req.dbUser = dbUser;
    next();
  } catch (error) {
    next(error);
  }
};
