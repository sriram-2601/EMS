import "./_group.css";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Building2,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export function Current() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="font-display font-bold text-white">E</span>
            </div>
            <span className="font-display text-xl font-bold text-slate-900">EMS Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-medium text-slate-600">About</Button>
            <Button variant="ghost" className="font-medium text-slate-600">Features</Button>
            <a href="/sign-in">
              <Button className="bg-blue-600 px-6 font-medium text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
                Sign In
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              The Future of Education Management
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] text-slate-900 lg:text-7xl">
              Learn, Connect, <span className="text-blue-600">Succeed.</span>
            </h1>
            <p className="mb-8 max-w-lg text-xl leading-relaxed text-slate-500">
              One platform for Mentoring, Coaching Institute Admissions, and Foreign Education Consultation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/sign-up">
                <Button size="lg" className="h-14 rounded-xl bg-blue-600 px-8 text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700">
                  Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="h-14 rounded-xl border-slate-200 px-8 text-lg hover:bg-slate-50">
                For Institutes
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
              alt="Students learning together"
              className="aspect-[4/3] w-full rounded-3xl border-4 border-white/50 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 max-w-xs animate-bounce rounded-2xl border border-slate-100 bg-white p-4 shadow-xl" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Admission Confirmed</p>
                  <p className="text-sm text-slate-500">Harvard University</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-slate-900">Everything you need to excel</h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              Whether you're a student looking to learn, an institute looking for leads, or seeking career guidance abroad.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Expert Mentoring",
                desc: "Access world-class courses and study materials from top mentors.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Building2,
                title: "Institute Marketplace",
                desc: "Find and apply to the best coaching institutes in your city directly.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: Globe2,
                title: "Global Consulting",
                desc: "Get expert guidance for foreign education and visa processes.",
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-slate-100 bg-white p-8 shadow-lg"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="leading-relaxed text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
