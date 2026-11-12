import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Globe2, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold font-display">E</span>
            </div>
            <span className="text-xl font-bold font-display text-slate-900">EMS Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-medium text-slate-600">About</Button>
            <Button variant="ghost" className="font-medium text-slate-600">Features</Button>
            <Link href="/sign-in"><Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-lg shadow-blue-600/20">Sign In</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              The Future of Education Management
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-slate-900 leading-[1.1] mb-6">
              Learn, Connect, <span className="text-blue-600">Succeed.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed max-w-lg">
              One platform for Mentoring, Coaching Institute Admissions, and Foreign Education Consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up"><Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 rounded-xl">Start Learning Now <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 hover:bg-slate-50 rounded-xl">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl -z-10" />
            {/* Landing page hero - student studying with laptop */}
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
              alt="Students learning together" 
              className="rounded-3xl shadow-2xl border-4 border-white/50 w-full object-cover aspect-[4/3]"
            />
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
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

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Everything you need to excel</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Whether you're a student looking to learn, an institute looking for leads, or seeking career guidance abroad.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Expert Mentoring",
                desc: "Access world-class courses and study materials from top mentors.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Building2,
                title: "Institute Marketplace",
                desc: "Find and apply to the best coaching institutes in your city directly.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: Globe2,
                title: "Global Consulting",
                desc: "Get expert guidance for foreign education and visa processes.",
                color: "text-orange-600",
                bg: "bg-orange-50"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
