import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-ems";
import { useEffect } from "react";

// Pages
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Onboarding from "@/pages/Onboarding";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import Institutes from "@/pages/Institutes";
import Consultation from "@/pages/Consultation";
import Leads from "@/pages/Leads";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      // Not logged in -> go to landing (handled by router fallthrough usually, but here strict)
      // Actually landing page is public at /, so we might redirect there
      setLocation("/");
    } else if (!isAuthLoading && user && !isProfileLoading && !profile) {
      // Logged in but no profile -> onboarding
      setLocation("/onboarding");
    }
  }, [user, isAuthLoading, profile, isProfileLoading, setLocation]);

  if (isAuthLoading || isProfileLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) return null; // Will redirect via effect
  if (!profile) return null; // Will redirect via effect

  return <Component />;
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Switch>
      {/* Public Route */}
      <Route path="/">
        {user ? <Dashboard /> : <Landing />}
      </Route>

      {/* Onboarding - requires Auth but NO profile */}
      <Route path="/onboarding" component={Onboarding} />

      {/* Protected Routes - require Auth AND Profile */}
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/courses">
        <ProtectedRoute component={Courses} />
      </Route>
      <Route path="/courses/:id">
        <ProtectedRoute component={CourseDetails} />
      </Route>
      <Route path="/institutes">
        <ProtectedRoute component={Institutes} />
      </Route>
      <Route path="/consultation">
        <ProtectedRoute component={Consultation} />
      </Route>
      <Route path="/leads">
        <ProtectedRoute component={Leads} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
