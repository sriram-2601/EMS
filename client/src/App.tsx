import { useEffect, useRef } from "react";
import { Switch, Route, Redirect, useLocation, Router as WouterRouter } from "wouter";
import { ClerkProvider, SignIn, SignUp, Show, useAuth, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useProfile } from "@/hooks/use-ems";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Onboarding from "@/pages/Onboarding";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import Institutes from "@/pages/Institutes";
import Consultation from "@/pages/Consultation";
import Leads from "@/pages/Leads";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const clerkAppearance = {
  theme: shadcn,
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#2563eb",
    colorForeground: "#0f172a",
    colorMutedForeground: "#475569",
    colorDanger: "#dc2626",
    colorBackground: "#ffffff",
    colorInput: "#f8fafc",
    colorInputForeground: "#0f172a",
    colorNeutral: "#0f172a",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: { width: "100%", display: "flex", justifyContent: "center" },
    cardBox: { background: "#ffffff", borderRadius: "1rem", width: "440px", maxWidth: "100%", overflow: "hidden", boxShadow: "0 20px 50px #0f172a1c" },
    card: { boxShadow: "none", border: "none", background: "transparent" },
    footer: { boxShadow: "none", border: "none", background: "transparent" },
    headerTitle: { color: "#0f172a" },
    headerSubtitle: { color: "#475569" },
    socialButtonsBlockButtonText: { color: "#0f172a" },
    formFieldLabel: { color: "#0f172a" },
    footerActionLink: { color: "#1d4ed8" },
    footerActionText: { color: "#475569" },
    dividerText: { color: "#475569" },
    identityPreviewEditButton: { color: "#1d4ed8" },
    formFieldSuccessText: { color: "#166534" },
    alertText: { color: "#991b1b" },
    logoBox: { margin: "0 auto" },
    logoImage: { height: "44px" },
    socialButtonsBlockButton: { borderColor: "#cbd5e1" },
    formButtonPrimary: { backgroundColor: "#2563eb", color: "#ffffff" },
    formFieldInput: { backgroundColor: "#f8fafc", color: "#0f172a" },
    footerAction: { color: "#475569" },
    dividerLine: { backgroundColor: "#cbd5e1" },
    alert: { backgroundColor: "#fef2f2" },
    otpCodeFieldInput: { backgroundColor: "#f8fafc", color: "#0f172a" },
    formFieldRow: { color: "#0f172a" },
    main: { color: "#0f172a" },
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function ProfileGate({ component: Component, onboarding = false }: { component: React.ComponentType; onboarding?: boolean }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: profile, isLoading, isError, error } = useProfile();

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isSignedIn) return <Redirect to="/sign-in" />;
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Unable to access your profile</h1>
        <p>{error instanceof Error && /^(401|403):/.test(error.message) ? "Your account does not have access to this page." : "Please try again later."}</p>
      </div>
    );
  }
  if (onboarding) return profile ? <Redirect to="/dashboard" /> : <Component />;
  return profile ? <Component /> : <Redirect to="/onboarding" />;
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in"><Redirect to="/dashboard" /></Show>
      <Show when="signed-out"><Landing /></Show>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route path="/onboarding">{() => <ProfileGate component={Onboarding} onboarding />}</Route>
      <Route path="/dashboard">{() => <ProfileGate component={Dashboard} />}</Route>
      <Route path="/courses/:id">{() => <ProfileGate component={CourseDetails} />}</Route>
      <Route path="/courses">{() => <ProfileGate component={Courses} />}</Route>
      <Route path="/institutes">{() => <ProfileGate component={Institutes} />}</Route>
      <Route path="/consultation">{() => <ProfileGate component={Consultation} />}</Route>
      <Route path="/leads">{() => <ProfileGate component={Leads} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: { start: { title: "Welcome back", subtitle: "Sign in to EMS Pro" } },
        signUp: { start: { title: "Create your account", subtitle: "Get started with EMS Pro" } },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
