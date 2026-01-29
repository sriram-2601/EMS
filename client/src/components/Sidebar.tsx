import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-ems";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Building2, 
  Globe2, 
  LogOut, 
  UserCircle,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();
  const { data: profile } = useProfile();

  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["all"] },
    { href: "/courses", icon: GraduationCap, label: "Courses", roles: ["all"] },
    { href: "/institutes", icon: Building2, label: "Institutes", roles: ["all"] },
    { href: "/consultation", icon: Globe2, label: "Consultation", roles: ["all"] },
    // Role specific items could be filtered here
    { href: "/leads", icon: Users, label: "Manage Leads", roles: ["institute"] },
  ];

  const filteredItems = menuItems.filter(item => {
    if (item.roles.includes("all")) return true;
    return profile?.role && item.roles.includes(profile.role);
  });

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-display text-blue-400 tracking-tight">EMS Pro</h1>
        <p className="text-xs text-slate-400 mt-1">Education Management System</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              location === item.href 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", location === item.href ? "text-white" : "text-slate-500 group-hover:text-white")} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
            <UserCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-white">{profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'User'}</p>
            <p className="text-xs text-slate-500 truncate">Online</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-950/30"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
