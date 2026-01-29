import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCounsellors, useCreateAppointment } from "@/hooks/use-ems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, type InsertAppointment } from "@shared/schema";
import { format } from "date-fns";

export default function Consultation() {
  const { data: counsellors, isLoading } = useCounsellors();
  const createAppointment = useCreateAppointment();
  const [selectedCounsellor, setSelectedCounsellor] = useState<number | null>(null);

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema.omit({ studentId: true })),
    defaultValues: {
      durationMinutes: 60,
      notes: "",
    }
  });

  const onSubmit = (data: InsertAppointment) => {
    if (!selectedCounsellor) return;
    
    // Simple date handling for prototype - parse the datetime-local input
    // In production use a proper DatePicker component
    const scheduledAt = new Date(data.scheduledAt);
    
    createAppointment.mutate({
      ...data,
      counsellorId: selectedCounsellor,
      scheduledAt
    }, {
      onSuccess: () => setSelectedCounsellor(null)
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-900">Foreign Consultation</h1>
        <p className="text-slate-500 mt-1">Book 1-on-1 sessions with expert counsellors.</p>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {counsellors?.map((c) => (
            <Card key={c.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.id}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold font-display text-slate-900">Dr. Counsellor</h3>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                        ${c.hourlyRate}/hr
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{c.specialization}</p>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{c.bio || "Experienced study abroad consultant specializing in visa applications and university selection."}</p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20"
                          onClick={() => setSelectedCounsellor(c.id)}
                        >
                          Book Appointment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book Session</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Date & Time</label>
                            <Input 
                              type="datetime-local" 
                              {...form.register("scheduledAt", { valueAsDate: true })} 
                              className="block"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Topic / Notes</label>
                            <Input {...form.register("notes")} placeholder="Visa questions, university list..." />
                          </div>
                          <Button type="submit" className="w-full" disabled={createAppointment.isPending}>
                            {createAppointment.isPending ? "Booking..." : "Confirm Booking"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
