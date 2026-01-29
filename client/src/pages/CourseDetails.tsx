import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { useCourse, useCreateLesson } from "@/hooks/use-ems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLessonSchema, type InsertLesson } from "@shared/schema";

export default function CourseDetails() {
  const [, params] = useRoute("/courses/:id");
  const courseId = parseInt(params?.id || "0");
  const { data: course, isLoading } = useCourse(courseId);
  const createLesson = useCreateLesson();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<InsertLesson>({
    resolver: zodResolver(insertLessonSchema.omit({ courseId: true })),
    defaultValues: {
      title: "",
      content: "",
      order: 1,
    }
  });

  const onSubmit = (data: InsertLesson) => {
    createLesson.mutate({ ...data, courseId }, {
      onSuccess: () => setIsDialogOpen(false)
    });
  };

  if (isLoading || !course) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 shadow-xl">
          <img 
            src={course.imageUrl || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80"} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div>
              <h1 className="text-4xl font-bold font-display text-white mb-2">{course.title}</h1>
              <p className="text-slate-200 text-lg">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-display text-slate-900">Course Content</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Add Lesson
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lesson</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label>Title</label>
                  <Input {...form.register("title")} />
                </div>
                <div className="space-y-2">
                  <label>Content</label>
                  <Textarea {...form.register("content")} placeholder="Lesson text or video URL" />
                </div>
                <div className="space-y-2">
                  <label>Order</label>
                  <Input type="number" {...form.register("order", { valueAsNumber: true })} />
                </div>
                <Button type="submit" className="w-full" disabled={createLesson.isPending}>
                  {createLesson.isPending ? "Adding..." : "Add Lesson"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <Accordion type="single" collapsible className="w-full">
            {course.lessons?.sort((a, b) => a.order - b.order).map((lesson) => (
              <AccordionItem key={lesson.id} value={`item-${lesson.id}`}>
                <AccordionTrigger className="hover:no-underline hover:bg-slate-50 px-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-left">{lesson.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-14 py-4 text-slate-600">
                  <div className="prose prose-sm max-w-none">
                    {lesson.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {(!course.lessons || course.lessons.length === 0) && (
              <div className="text-center py-12 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No lessons added yet.</p>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
}
