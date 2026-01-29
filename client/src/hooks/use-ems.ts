import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { 
  InsertCourse, InsertLesson, InsertInstitute, InsertCounsellor, InsertAppointment,
  UpdateCourseRequest
} from "@shared/schema";

// === PROFILES ===
export function useProfile() {
  return useQuery({
    queryKey: [api.profiles.me.path],
    queryFn: async () => {
      const res = await fetch(api.profiles.me.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return api.profiles.me.responses[200].parse(await res.json());
    },
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.profiles.update.path, {
        method: api.profiles.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return api.profiles.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.me.path] });
      toast({ title: "Profile updated", description: "Your information has been saved." });
    },
  });
}

// === COURSES (LMS) ===
export function useCourses() {
  return useQuery({
    queryKey: [api.courses.list.path],
    queryFn: async () => {
      const res = await fetch(api.courses.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch courses");
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch course");
      return api.courses.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertCourse) => {
      const res = await fetch(api.courses.create.path, {
        method: api.courses.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create course");
      return api.courses.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
      toast({ title: "Course created", description: "Start adding lessons now." });
    },
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (courseId: number) => {
      const url = buildUrl(api.courses.enroll.path, { id: courseId });
      const res = await fetch(url, {
        method: api.courses.enroll.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to enroll");
      return api.courses.enroll.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
      toast({ title: "Enrolled successfully", description: "Welcome to the course!" });
    },
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ courseId, ...data }: { courseId: number } & InsertLesson) => {
      const url = buildUrl(api.lessons.create.path, { courseId });
      const res = await fetch(url, {
        method: api.lessons.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create lesson");
      return api.lessons.create.responses[201].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.courses.get.path, variables.courseId] });
      toast({ title: "Lesson added", description: "Your content has been added to the course." });
    },
  });
}

// === INSTITUTES ===
export function useInstitutes() {
  return useQuery({
    queryKey: [api.institutes.list.path],
    queryFn: async () => {
      const res = await fetch(api.institutes.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch institutes");
      return api.institutes.list.responses[200].parse(await res.json());
    },
  });
}

export function useInstitute(id: number) {
  return useQuery({
    queryKey: [api.institutes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.institutes.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch institute");
      return api.institutes.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateInstitute() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertInstitute) => {
      const res = await fetch(api.institutes.create.path, {
        method: api.institutes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to register institute");
      return api.institutes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.institutes.list.path] });
      toast({ title: "Institute Registered", description: "Your institute is now listed." });
    },
  });
}

export function useApplyInstitute() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (instituteId: number) => {
      const url = buildUrl(api.institutes.apply.path, { id: instituteId });
      const res = await fetch(url, {
        method: api.institutes.apply.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to apply");
      return api.institutes.apply.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ title: "Application Sent", description: "The institute will contact you shortly." });
    },
  });
}

export function useLeads() {
  return useQuery({
    queryKey: [api.leads.list.path],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch leads");
      return api.leads.list.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: "applied" | "contacted" | "joined" | "rejected" }) => {
      const url = buildUrl(api.leads.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.leads.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update status");
      return api.leads.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      toast({ title: "Status updated", description: "Lead status has been changed." });
    },
  });
}

// === COUNSELLORS & APPOINTMENTS ===
export function useCounsellors() {
  return useQuery({
    queryKey: [api.counsellors.list.path],
    queryFn: async () => {
      const res = await fetch(api.counsellors.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch counsellors");
      return api.counsellors.list.responses[200].parse(await res.json());
    },
  });
}

export function useAppointments() {
  return useQuery({
    queryKey: [api.appointments.list.path],
    queryFn: async () => {
      const res = await fetch(api.appointments.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return api.appointments.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await fetch(api.appointments.create.path, {
        method: api.appointments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to book appointment");
      return api.appointments.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.appointments.list.path] });
      toast({ title: "Appointment Booked", description: "Your consultation is scheduled." });
    },
  });
}

// === ADMIN ===
export function useAdminStats() {
  return useQuery({
    queryKey: [api.admin.stats.path],
    queryFn: async () => {
      const res = await fetch(api.admin.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.admin.stats.responses[200].parse(await res.json());
    },
  });
}
