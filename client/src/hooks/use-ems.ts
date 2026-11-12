import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@clerk/react";
import type { 
  InsertCourse, InsertLesson, InsertInstitute, InsertCounsellor, InsertAppointment,
  UpdateCourseRequest
} from "@shared/schema";

// === PROFILES ===
export function useProfile() {
  const { isLoaded, isSignedIn } = useAuth();
  return useQuery({
    queryKey: [api.profiles.me.path],
    queryFn: async () => {
      const res = await apiRequest("GET", api.profiles.me.path);
      return api.profiles.me.responses[200].parse(await res.json());
    },
    enabled: isLoaded && !!isSignedIn,
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest(api.profiles.update.method, api.profiles.update.path, data);
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
      const res = await apiRequest("GET", api.courses.list.path);
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id });
      const res = await apiRequest("GET", url);
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
      const res = await apiRequest(api.courses.create.method, api.courses.create.path, data);
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
      const res = await apiRequest(api.courses.enroll.method, url);
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
      const res = await apiRequest(api.lessons.create.method, url, data);
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
      const res = await apiRequest("GET", api.institutes.list.path);
      return api.institutes.list.responses[200].parse(await res.json());
    },
  });
}

export function useInstitute(id: number) {
  return useQuery({
    queryKey: [api.institutes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.institutes.get.path, { id });
      const res = await apiRequest("GET", url);
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
      const res = await apiRequest(api.institutes.create.method, api.institutes.create.path, data);
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
      const res = await apiRequest(api.institutes.apply.method, url);
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
      const res = await apiRequest("GET", api.leads.list.path);
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
      const res = await apiRequest(api.leads.updateStatus.method, url, { status });
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
      const res = await apiRequest("GET", api.counsellors.list.path);
      return api.counsellors.list.responses[200].parse(await res.json());
    },
  });
}

export function useAppointments() {
  return useQuery({
    queryKey: [api.appointments.list.path],
    queryFn: async () => {
      const res = await apiRequest("GET", api.appointments.list.path);
      return api.appointments.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await apiRequest(api.appointments.create.method, api.appointments.create.path, data);
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
      const res = await apiRequest("GET", api.admin.stats.path);
      return api.admin.stats.responses[200].parse(await res.json());
    },
  });
}
