import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@clerk/react";
import { useUpdateProfile } from "@/hooks/use-ems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { insertProfileSchema } from "@shared/schema";
import { GraduationCap, Building2, UserCog, User, Globe2 } from "lucide-react";
import { useLocation } from "wouter";

const schema = insertProfileSchema.omit({ userId: true });
type FormData = z.infer<typeof schema>;

export default function Onboarding() {
  const { user } = useUser();
  const updateProfile = useUpdateProfile();
  const [, setLocation] = useLocation();
  const [role, setRole] = useState<string>("student");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "student",
      bio: "",
      phone: "",
      metadata: {},
    },
  });

  const onSubmit = (data: FormData) => {
    updateProfile.mutate({ ...data, role }, {
      onSuccess: () => setLocation("/dashboard")
    });
  };

  const roles = [
    { id: "student", label: "Student", icon: GraduationCap, desc: "I want to learn and grow" },
    { id: "mentor", label: "Mentor", icon: UserCog, desc: "I want to create courses" },
    { id: "institute", label: "Institute", icon: Building2, desc: "I represent an institution" },
    { id: "counsellor", label: "Counsellor", icon: Globe2, desc: "I provide foreign consultation" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-xl border-none">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-display font-bold text-slate-900">Welcome, {user?.firstName}!</CardTitle>
          <CardDescription className="text-lg">Let's set up your profile to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold">I am a...</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      form.setValue("role", r.id as any);
                    }}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                      role === r.id 
                        ? "border-blue-600 bg-blue-50" 
                        : "border-slate-100 hover:border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <r.icon className={`w-5 h-5 ${role === r.id ? "text-blue-600" : "text-slate-500"}`} />
                      <span className={`font-bold ${role === r.id ? "text-blue-700" : "text-slate-900"}`}>{r.label}</span>
                    </div>
                    <p className="text-sm text-slate-500">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input {...form.register("phone")} id="phone" placeholder="+1234567890" className="h-12" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea {...form.register("bio")} id="bio" placeholder="Tell us a bit about yourself..." className="min-h-[100px]" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
