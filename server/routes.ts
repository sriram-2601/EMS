import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth setup
  await setupAuth(app);
  registerAuthRoutes(app);

  // === PROFILES ===
  app.get(api.profiles.me.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const profile = await storage.getProfile(req.user!.id);
    res.json(profile || null);
  });

  app.put(api.profiles.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.profiles.update.input.parse(req.body);
    
    // Check if profile exists
    const existing = await storage.getProfile(req.user!.id);
    let profile;
    if (existing) {
      profile = await storage.updateProfile(req.user!.id, input);
    } else {
      profile = await storage.createProfile({ ...input, userId: req.user!.id });
    }
    res.json(profile);
  });

  // === COURSES ===
  app.get(api.courses.list.path, async (req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  app.get(api.courses.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const course = await storage.getCourse(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const lessons = await storage.getLessonsByCourseId(id);
    res.json({ ...course, lessons });
  });

  app.post(api.courses.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.courses.create.input.parse(req.body);
    const course = await storage.createCourse({ ...input, mentorId: req.user!.id });
    res.status(201).json(course);
  });

  app.post(api.courses.enroll.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const courseId = Number(req.params.id);
    
    // Check existing
    const existing = await storage.getEnrollment(req.user!.id, courseId);
    if (existing) return res.json(existing);

    const enrollment = await storage.createEnrollment({ userId: req.user!.id, courseId });
    res.status(201).json(enrollment);
  });

  app.post(api.lessons.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const courseId = Number(req.params.courseId);
    const input = api.lessons.create.input.parse(req.body);
    const lesson = await storage.createLesson({ ...input, courseId });
    res.status(201).json(lesson);
  });

  // === INSTITUTES ===
  app.get(api.institutes.list.path, async (req, res) => {
    const institutes = await storage.getInstitutes();
    res.json(institutes);
  });

  app.get(api.institutes.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const institute = await storage.getInstitute(id);
    if (!institute) return res.status(404).json({ message: "Institute not found" });
    res.json(institute);
  });

  app.post(api.institutes.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.institutes.create.input.parse(req.body);
    const institute = await storage.createInstitute({ ...input, ownerId: req.user!.id });
    res.status(201).json(institute);
  });

  app.post(api.institutes.apply.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const instituteId = Number(req.params.id);
    const lead = await storage.createInstituteLead({ 
      instituteId, 
      studentId: req.user!.id,
      notes: "Applied via platform"
    });
    res.status(201).json(lead);
  });

  app.get(api.leads.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    // In real app, check if user is owner of an institute
    // For now, let's just return leads for the first institute owned by user (simplified)
    // Or just all leads for now if admin/owner
    // TODO: proper permission check
    // Assuming instituteId is passed or inferred. 
    // Let's just mock getting leads for institute ID 1 for now if not implemented fully
    const leads = await storage.getInstituteLeads(1); 
    res.json(leads);
  });

  app.patch(api.leads.updateStatus.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const id = Number(req.params.id);
    const { status } = req.body;
    const lead = await storage.updateLeadStatus(id, status);
    res.json(lead);
  });

  // === COUNSELLORS & APPOINTMENTS ===
  app.get(api.counsellors.list.path, async (req, res) => {
    const counsellors = await storage.getCounsellors();
    res.json(counsellors);
  });

  app.post(api.appointments.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const input = api.appointments.create.input.parse(req.body);
    const appointment = await storage.createAppointment({ ...input, studentId: req.user!.id });
    res.status(201).json(appointment);
  });

  app.get(api.appointments.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const appointments = await storage.getAppointmentsByUser(req.user!.id);
    res.json(appointments);
  });

  // === ADMIN ===
  app.get(api.admin.stats.path, async (req, res) => {
    // if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    // TODO: Check admin role
    const stats = await storage.getStats();
    res.json(stats);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const courses = await storage.getCourses();
  if (courses.length === 0) {
    console.log("Seeding database...");
    
    // Seed Courses
    await storage.createCourse({
      title: "Complete Python Bootcamp",
      description: "Learn Python from scratch to advanced.",
      price: 4999,
      published: true,
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
    });
    
    await storage.createCourse({
      title: "NEET Physics Mastery",
      description: "Comprehensive guide to crack NEET Physics.",
      price: 9999,
      published: true,
      imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80"
    });

    // Seed Institutes
    await storage.createInstitute({
      name: "Allen Career Institute",
      description: "Top coaching for JEE and NEET.",
      location: "Kota, Rajasthan",
      contactEmail: "info@allen.ac.in",
      isVerified: true,
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
    });

    await storage.createInstitute({
      name: "Aakash Institute",
      description: "Premier institute for medical entrance exams.",
      location: "Delhi",
      contactEmail: "admissions@aakash.ac.in",
      isVerified: true,
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80"
    });

    // Seed Counsellors
    // Need a user first, but we can't easily create one with ID here without auth flow.
    // For now, we skip seeding counsellors linked to users to avoid FK issues if users don't exist.
    // Or we create a dummy user first.
    // (Skipping for safety to avoid errors on empty DB)
  }
}
