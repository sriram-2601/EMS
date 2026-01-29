import { pgTable, text, serial, integer, boolean, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Import auth models to ensure they are included in migrations
export * from "./models/auth";
import { users } from "./models/auth";

// Enums
export const userRoleEnum = pgEnum("user_role", ["student", "mentor", "admin", "institute", "counsellor"]);
export const leadStatusEnum = pgEnum("lead_status", ["applied", "contacted", "joined", "rejected"]);
export const appointmentStatusEnum = pgEnum("appointment_status", ["scheduled", "completed", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed"]);

// === PROFILES (Extending Auth User) ===
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  role: userRoleEnum("role").default("student").notNull(),
  bio: text("bio"),
  phone: text("phone"),
  metadata: jsonb("metadata"), // flexible field for role-specific data (e.g., institute address, counsellor specialization)
});

// === MENTORING (LMS) ===
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  mentorId: text("mentor_id").references(() => users.id), // The user ID of the mentor
  imageUrl: text("image_url"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title").notNull(),
  content: text("content").notNull(), // text content or video URL
  order: integer("order").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  progress: integer("progress").default(0), // percentage
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

// === COACHING TIE-UPS ===
export const institutes = pgTable("institutes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  contactEmail: text("contact_email").notNull(),
  ownerId: text("owner_id").references(() => users.id), // Institute admin
  isVerified: boolean("is_verified").default(false),
});

export const instituteLeads = pgTable("institute_leads", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").references(() => users.id),
  instituteId: integer("institute_id").references(() => institutes.id),
  status: leadStatusEnum("status").default("applied"),
  appliedAt: timestamp("applied_at").defaultNow(),
  notes: text("notes"),
});

// === FOREIGN CONSULTATION ===
export const counsellors = pgTable("counsellors", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  specialization: text("specialization").notNull(), // e.g., "USA", "UK", "Visa"
  hourlyRate: integer("hourly_rate").notNull(),
  bio: text("bio"),
  availability: jsonb("availability"), // Simple JSON availability config
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").references(() => users.id),
  counsellorId: integer("counsellor_id").references(() => counsellors.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  durationMinutes: integer("duration_minutes").default(60),
  status: appointmentStatusEnum("status").default("scheduled"),
  notes: text("notes"),
  meetingLink: text("meeting_link"),
});

// === PAYMENTS ===
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  amount: integer("amount").notNull(), // cents
  currency: text("currency").default("INR"),
  status: paymentStatusEnum("status").default("pending"),
  razorpayPaymentId: text("razorpay_payment_id"),
  purpose: text("purpose").notNull(), // "course", "institute", "consultation"
  referenceId: integer("reference_id"), // ID of course, institute, or appointment
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  mentor: one(users, {
    fields: [courses.mentorId],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const institutesRelations = relations(institutes, ({ one, many }) => ({
  owner: one(users, {
    fields: [institutes.ownerId],
    references: [users.id],
  }),
  leads: many(instituteLeads),
}));

export const instituteLeadsRelations = relations(instituteLeads, ({ one }) => ({
  student: one(users, {
    fields: [instituteLeads.studentId],
    references: [users.id],
  }),
  institute: one(institutes, {
    fields: [instituteLeads.instituteId],
    references: [institutes.id],
  }),
}));

export const counsellorsRelations = relations(counsellors, ({ one, many }) => ({
  user: one(users, {
    fields: [counsellors.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  student: one(users, {
    fields: [appointments.studentId],
    references: [users.id],
  }),
  counsellor: one(counsellors, {
    fields: [appointments.counsellorId],
    references: [counsellors.id],
  }),
}));

// === ZOD SCHEMAS ===
export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true, createdAt: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ id: true, progress: true, enrolledAt: true });
export const insertInstituteSchema = createInsertSchema(institutes).omit({ id: true, isVerified: true });
export const insertInstituteLeadSchema = createInsertSchema(instituteLeads).omit({ id: true, status: true, appliedAt: true });
export const insertCounsellorSchema = createInsertSchema(counsellors).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, status: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, status: true, createdAt: true });

// === EXPLICIT TYPES ===
export type Profile = typeof profiles.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type Institute = typeof institutes.$inferSelect;
export type InstituteLead = typeof instituteLeads.$inferSelect;
export type Counsellor = typeof counsellors.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Payment = typeof payments.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type InsertInstitute = z.infer<typeof insertInstituteSchema>;
export type InsertInstituteLead = z.infer<typeof insertInstituteLeadSchema>;
export type InsertCounsellor = z.infer<typeof insertCounsellorSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type CreateCourseRequest = InsertCourse;
export type UpdateCourseRequest = Partial<InsertCourse>;
export type CreateLessonRequest = InsertLesson;
