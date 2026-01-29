import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useInstitutes, useCreateInstitute, useApplyInstitute, useProfile } from "@/hooks/use-ems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Plus, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInstituteSchema, type InsertInstitute } from "@shared/schema";

export default function Institutes() {
  const { data: institutes, isLoading } = useInstitutes();
  const { data: profile } = useProfile();
  const createInstitute = useCreateInstitute();
  const applyInstitute = useApplyInstitute();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<InsertInstitute>({
    resolver: zodResolver(insertInstituteSchema.omit({ ownerId: true })),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      contactEmail: "",
      imageUrl: "",
    }
  });

  const onSubmit = (data: InsertInstitute) => {
    createInstitute.mutate(data, {
      onSuccess: () => setIsDialogOpen(false)
    });
  };

  const isInstitute = profile?.role === "institute" || profile?.role === "admin";

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Coaching Institutes</h1>
          <p className="text-slate-500 mt-1">Find top-rated coaching centers near you.</p>
        </div>
        
        {isInstitute && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20">
                <Plus className="w-4 h-4 mr-2" /> Register Institute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Institute</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label>Institute Name</label>
                  <Input {...form.register("name")} />
                </div>
                <div className="space-y-2">
                  <label>Description</label>
                  <Textarea {...form.register("description")} />
                </div>
                <div className="space-y-2">
                  <label>Location</label>
                  <Input {...form.register("location")} />
                </div>
                <div className="space-y-2">
                  <label>Contact Email</label>
                  <Input {...form.register("contactEmail")} />
                </div>
                <Button type="submit" className="w-full" disabled={createInstitute.isPending}>
                  {createInstitute.isPending ? "Registering..." : "Register Institute"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isLoading ? (
        <div>Loading institutes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutes?.map((institute) => (
            <Card key={institute.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-100">
              <div className="h-48 bg-slate-100 relative">
                {/* Institute stock image */}
                <img 
                  src={institute.imageUrl || `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80`} 
                  alt={institute.name}
                  className="w-full h-full object-cover"
                />
                {institute.isVerified && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold font-display text-slate-900">{institute.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span>{institute.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 line-clamp-3">{institute.description}</p>
              </CardContent>
              <CardFooter className="pt-3 border-t border-slate-50">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => applyInstitute.mutate(institute.id)}
                  disabled={applyInstitute.isPending}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
