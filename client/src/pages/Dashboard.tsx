import { useAuth } from "@/hooks/use-auth";
import { useProfile, useAdminStats } from "@/hooks/use-ems";
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/StatsCard";
import { Users, BookOpen, Building2, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: stats } = useAdminStats();

  if (!profile) return null;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Welcome back, {user?.firstName}. Here's what's happening today.
        </p>
      </div>

      {profile.role === "admin" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users} 
            className="bg-white"
          />
          <StatsCard 
            title="Active Courses" 
            value={stats.totalCourses} 
            icon={BookOpen} 
            className="bg-white"
          />
          <StatsCard 
            title="Institutes" 
            value={stats.totalInstitutes} 
            icon={Building2} 
            className="bg-white"
          />
          <StatsCard 
            title="Appointments" 
            value={stats.totalAppointments} 
            icon={Calendar} 
            className="bg-white"
          />
        </div>
      )}

      {profile.role === "student" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold font-display mb-2">Continue Learning</h2>
                <p className="text-blue-100 mb-6 max-w-md">You have 2 pending lessons in "Advanced Mathematics". Keep up the momentum!</p>
                <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                  Resume Course
                </button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <BookOpen className="w-64 h-64" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg mb-4">Recommended Institutes</h3>
              <p className="text-slate-500 text-sm">Based on your interests, check out the Institutes page.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg mb-4">Upcoming Appointments</h3>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No appointments scheduled</p>
                <button className="text-blue-600 font-medium text-sm mt-2 hover:underline">Book a consultation</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
