import { db } from "./db";
import {
  users, profiles, courses, lessons, enrollments, institutes, instituteLeads, counsellors, appointments,
  type User, type Profile, type Course, type Lesson, type Enrollment, type Institute, type InstituteLead, type Counsellor, type Appointment,
  type InsertProfile, type InsertCourse, type InsertLesson, type InsertEnrollment, type InsertInstitute, type InsertInstituteLead, type InsertCounsellor, type InsertAppointment
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, profile: Partial<InsertProfile>): Promise<Profile>;

  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Lessons
  getLessonsByCourseId(courseId: number): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Enrollments
  getEnrollment(userId: string, courseId: number): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;

  // Institutes
  getInstitutes(): Promise<Institute[]>;
  getInstitute(id: number): Promise<Institute | undefined>;
  createInstitute(institute: InsertInstitute): Promise<Institute>;
  
  // Leads
  createInstituteLead(lead: InsertInstituteLead): Promise<InstituteLead>;
  getInstituteLeads(instituteId: number): Promise<(InstituteLead & { student: User | null })[]>;
  updateLeadStatus(leadId: number, status: string): Promise<InstituteLead>;

  // Counsellors
  getCounsellors(): Promise<Counsellor[]>;
  getCounsellor(id: number): Promise<Counsellor | undefined>;
  createCounsellor(counsellor: InsertCounsellor): Promise<Counsellor>;

  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByUser(userId: string): Promise<Appointment[]>;
  getAppointmentsByCounsellor(counsellorId: number): Promise<Appointment[]>;
  
  // Admin
  getStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // === PROFILES ===
  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profiles).values(profile).returning();
    return newProfile;
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile> {
    const [updated] = await db
      .update(profiles)
      .set(updates)
      .where(eq(profiles.userId, userId))
      .returning();
    return updated;
  }

  // === COURSES ===
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  // === LESSONS ===
  async getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return await db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(lessons.order);
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db.insert(lessons).values(lesson).returning();
    return newLesson;
  }

  // === ENROLLMENTS ===
  async getEnrollment(userId: string, courseId: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment;
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();
    return newEnrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  // === INSTITUTES ===
  async getInstitutes(): Promise<Institute[]> {
    return await db.select().from(institutes);
  }

  async getInstitute(id: number): Promise<Institute | undefined> {
    const [institute] = await db.select().from(institutes).where(eq(institutes.id, id));
    return institute;
  }

  async createInstitute(institute: InsertInstitute): Promise<Institute> {
    const [newInstitute] = await db.insert(institutes).values(institute).returning();
    return newInstitute;
  }

  // === LEADS ===
  async createInstituteLead(lead: InsertInstituteLead): Promise<InstituteLead> {
    const [newLead] = await db.insert(instituteLeads).values(lead).returning();
    return newLead;
  }

  async getInstituteLeads(instituteId: number): Promise<(InstituteLead & { student: User | null })[]> {
    // Basic join simulation for now, ideally use drizzle's query builder relations
    const leads = await db.select().from(instituteLeads).where(eq(instituteLeads.instituteId, instituteId));
    
    // Enrich with student info (inefficient but works for now)
    const enrichedLeads = await Promise.all(leads.map(async (lead) => {
      const [student] = await db.select().from(users).where(eq(users.id, lead.studentId!));
      return { ...lead, student: student || null };
    }));
    
    return enrichedLeads;
  }

  async updateLeadStatus(leadId: number, status: string): Promise<InstituteLead> {
     // @ts-ignore
    const [updated] = await db.update(instituteLeads).set({ status }).where(eq(instituteLeads.id, leadId)).returning();
    return updated;
  }

  // === COUNSELLORS ===
  async getCounsellors(): Promise<Counsellor[]> {
    return await db.select().from(counsellors);
  }

  async getCounsellor(id: number): Promise<Counsellor | undefined> {
    const [counsellor] = await db.select().from(counsellors).where(eq(counsellors.id, id));
    return counsellor;
  }

  async createCounsellor(counsellor: InsertCounsellor): Promise<Counsellor> {
    const [newCounsellor] = await db.insert(counsellors).values(counsellor).returning();
    return newCounsellor;
  }

  // === APPOINTMENTS ===
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }

  async getAppointmentsByUser(userId: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.studentId, userId));
  }
  
  async getAppointmentsByCounsellor(counsellorId: number): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.counsellorId, counsellorId));
  }

  // === ADMIN ===
  async getStats(): Promise<any> {
    // Mock stats for MVP, real impl requires count queries
    return {
      totalUsers: 100,
      totalCourses: (await this.getCourses()).length,
      totalInstitutes: (await this.getInstitutes()).length,
      totalAppointments: 50
    };
  }
}

export const storage = new DatabaseStorage();
