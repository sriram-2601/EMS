import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCourses, useCreateCourse, useEnrollCourse, useProfile } from "@/hooks/use-ems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, BookOpen, Clock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCourseSchema, type InsertCourse } from "@shared/schema";
import { useLocation } from "wouter";

export default function Courses() {
  const { data: courses, isLoading } = useCourses();
  const { data: profile } = useProfile();
  const createCourse = useCreateCourse();
  const enrollCourse = useEnrollCourse();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<InsertCourse>({
    resolver: zodResolver(insertCourseSchema.omit({ mentorId: true })),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      published: true,
      imageUrl: "",
    }
  });

  const onSubmit = (data: InsertCourse) => {
    createCourse.mutate(data, {
      onSuccess: () => setIsDialogOpen(false)
    });
  };

  const isMentor = profile?.role === "mentor" || profile?.role === "admin";

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 data-testid={profile ? "profile-courses" : undefined} className="text-3xl font-bold font-display text-slate-900">Courses</h1>
          <p className="text-slate-500 mt-1">Explore and enroll in premium courses.</p>
        </div>
        
        {isMentor && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                <Plus className="w-4 h-4 mr-2" /> Create Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input {...form.register("title")} placeholder="Intro to Physics" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input {...form.register("description")} placeholder="Course details..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (cents)</label>
                  <Input type="number" {...form.register("price", { valueAsNumber: true })} />
                </div>
                <Button type="submit" className="w-full" disabled={createCourse.isPending}>
                  {createCourse.isPending ? "Creating..." : "Create Course"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input placeholder="Search courses..." className="pl-10 h-12 bg-white border-slate-200" />
      </div>

      {isLoading ? (
        <div>Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-100 group">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {/* Random tech/edu image from unsplash */}
                <img 
                  src={course.imageUrl || `https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80`} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm hover:bg-white">
                  ${(course.price / 100).toFixed(2)}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold font-display text-slate-900 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Mentor</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>4 Weeks</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t border-slate-50">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setLocation(`/courses/${course.id}`)}
                  >
                    Details
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => enrollCourse.mutate(course.id)}
                    disabled={enrollCourse.isPending}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
