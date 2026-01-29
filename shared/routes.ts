import { z } from "zod";
import { 
  insertProfileSchema, 
  insertCourseSchema, 
  insertLessonSchema, 
  insertEnrollmentSchema,
  insertInstituteSchema,
  insertInstituteLeadSchema,
  insertCounsellorSchema,
  insertAppointmentSchema,
  profiles, courses, lessons, enrollments, institutes, instituteLeads, counsellors, appointments
} from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  // === PROFILES ===
  profiles: {
    me: {
      method: "GET" as const,
      path: "/api/profiles/me",
      responses: {
        200: z.custom<typeof profiles.$inferSelect>().nullable(),
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: "PUT" as const,
      path: "/api/profiles/me",
      input: insertProfileSchema.omit({ userId: true }),
      responses: {
        200: z.custom<typeof profiles.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },

  // === MENTORING (LMS) ===
  courses: {
    list: {
      method: "GET" as const,
      path: "/api/courses",
      responses: {
        200: z.array(z.custom<typeof courses.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/courses/:id",
      responses: {
        200: z.custom<typeof courses.$inferSelect & { lessons: (typeof lessons.$inferSelect)[] }>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/courses",
      input: insertCourseSchema.omit({ mentorId: true }),
      responses: {
        201: z.custom<typeof courses.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    enroll: {
      method: "POST" as const,
      path: "/api/courses/:id/enroll",
      responses: {
        201: z.custom<typeof enrollments.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    }
  },

  lessons: {
    create: {
      method: "POST" as const,
      path: "/api/courses/:courseId/lessons",
      input: insertLessonSchema.omit({ courseId: true }),
      responses: {
        201: z.custom<typeof lessons.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    }
  },

  // === COACHING INSTITUTES ===
  institutes: {
    list: {
      method: "GET" as const,
      path: "/api/institutes",
      responses: {
        200: z.array(z.custom<typeof institutes.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/institutes/:id",
      responses: {
        200: z.custom<typeof institutes.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/institutes",
      input: insertInstituteSchema.omit({ ownerId: true }),
      responses: {
        201: z.custom<typeof institutes.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    apply: {
      method: "POST" as const,
      path: "/api/institutes/:id/apply",
      responses: {
        201: z.custom<typeof instituteLeads.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    }
  },

  leads: {
    list: {
      method: "GET" as const,
      path: "/api/institutes/leads", // For institute owners
      responses: {
        200: z.array(z.custom<typeof instituteLeads.$inferSelect & { student: any }>()),
        401: errorSchemas.unauthorized,
      },
    },
    updateStatus: {
      method: "PATCH" as const,
      path: "/api/leads/:id/status",
      input: z.object({ status: z.enum(["applied", "contacted", "joined", "rejected"]) }),
      responses: {
        200: z.custom<typeof instituteLeads.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },

  // === CONSULTATION ===
  counsellors: {
    list: {
      method: "GET" as const,
      path: "/api/counsellors",
      responses: {
        200: z.array(z.custom<typeof counsellors.$inferSelect>()),
      },
    },
  },

  appointments: {
    create: {
      method: "POST" as const,
      path: "/api/appointments",
      input: insertAppointmentSchema.omit({ studentId: true }),
      responses: {
        201: z.custom<typeof appointments.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/appointments",
      responses: {
        200: z.array(z.custom<typeof appointments.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    }
  },
  
  // === ADMIN ===
  admin: {
    stats: {
      method: "GET" as const,
      path: "/api/admin/stats",
      responses: {
        200: z.object({
          totalUsers: z.number(),
          totalCourses: z.number(),
          totalInstitutes: z.number(),
          totalAppointments: z.number(),
        }),
        401: errorSchemas.unauthorized,
        403: errorSchemas.unauthorized,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
