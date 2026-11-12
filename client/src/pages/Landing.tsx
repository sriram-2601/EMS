import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  Compass,
  GraduationCap,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import "./landing.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const riseIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Landing() {
  return (
    <main className="ems-refresh">
      <header className="ems-topbar">
        <div className="ems-shell ems-nav">
          <a className="ems-brand" href="#top" aria-label="EMS Pro home">
            <span className="ems-mark"><GraduationCap size={20} strokeWidth={2.2} /></span>
            <span>EMS Pro<small>Education, moving forward</small></span>
          </a>
          <nav className="ems-nav-links" aria-label="Main navigation">
            <a href="#pathways">Explore pathways</a>
            <a href="#institutes">For institutes</a>
            <a href="#counselling">Study abroad</a>
            <Link className="ems-nav-cta" href="/sign-in">Sign in <ArrowUpRight size={15} /></Link>
          </nav>
          <a className="ems-mobile-menu" href="#pathways" aria-label="Explore pathways">
            <Menu size={23} />
          </a>
        </div>
      </header>

      <section id="top" className="ems-hero">
        <div className="ems-shell ems-hero-grid">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ems-kicker"><span className="ems-kicker-dot" />A clearer way to choose what’s next</div>
            <h1>Your next step should feel <em>possible.</em></h1>
            <p className="ems-hero-copy">
              Find courses that fit, discover institutes worth exploring, or talk through studying abroad with a counsellor. Start with the decision in front of you.
            </p>
            <div className="ems-hero-actions">
              <Link className="ems-button" href="/sign-up">Explore your options <ArrowRight size={17} /></Link>
              <a className="ems-text-link" href="#pathways">See how EMS Pro helps <ArrowDownRight size={16} /></a>
            </div>
            <div className="ems-hero-note">
              <span><Check size={11} /></span>
              Browse courses, compare details, and take the next step at your pace.
            </div>
          </motion.div>

          <motion.div
            className="ems-art"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            role="img"
            aria-label="Illustration of a student reading beside a sunlit window"
          >
            <div className="ems-side-note">A little more direction, every day</div>
            <div className="ems-orbit" />
            <div className="ems-sun" />
            <div className="ems-art-figure">
              <div className="ems-window" />
              <div className="ems-person">
                <div className="ems-person-head" />
                <div className="ems-person-hair" />
                <div className="ems-person-body" />
              </div>
              <div className="ems-book" />
            </div>
            <div className="ems-art-label">
              <span>Start where you are</span>
              <strong>Build a path that feels like yours.</strong>
            </div>
            <div className="ems-stamp">Learn<br />choose<br />move</div>
          </motion.div>
        </div>
      </section>

      <div className="ems-strip">
        <div className="ems-shell ems-strip-inner">
          <span className="ems-strip-label">One place to move forward</span>
          <span className="ems-strip-item"><BookOpen size={17} /> Courses to explore</span>
          <span className="ems-strip-item"><Building2 size={17} /> Institutes to find</span>
          <span className="ems-strip-item"><Globe2 size={17} /> Counsellors to talk to</span>
        </div>
      </div>

      <section id="pathways" className="ems-section ems-journey">
        <div className="ems-shell">
          <motion.div
            className="ems-section-head"
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={riseIn}
            transition={{ duration: 0.55 }}
          >
            <div>
              <div className="ems-eyebrow">Find your starting point</div>
              <h2>Three ways to make your next move.</h2>
            </div>
            <p>
              Education decisions rarely come in a straight line. Pick the question on your mind today; you can explore the rest when you’re ready.
            </p>
          </motion.div>
          <div className="ems-paths">
            <motion.article className="ems-path-card primary" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <div className="ems-path-top"><span className="ems-path-num">01 / LEARN</span><span className="ems-path-icon"><BookOpen size={20} /></span></div>
              <h3>Find a course<br />that fits.</h3>
              <p>Browse courses, open the details, and find the one that matches what you want to learn next.</p>
              <Link className="ems-card-link" href="/sign-up">Explore courses <ArrowRight size={17} /></Link>
              <div className="ems-path-deco" />
            </motion.article>
            <motion.article className="ems-path-card" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.08 }}>
              <div className="ems-path-top"><span className="ems-path-num">02 / CONNECT</span><span className="ems-path-icon"><Building2 size={20} /></span></div>
              <h3>Meet the right<br />institute.</h3>
              <p>Find coaching institutes and submit an application when you’re ready to take it further.</p>
              <Link className="ems-card-link" href="/sign-up">Find an institute <ArrowRight size={17} /></Link>
              <div className="ems-path-deco" />
            </motion.article>
            <motion.article className="ems-path-card" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.16 }}>
              <div className="ems-path-top"><span className="ems-path-num">03 / LOOK OUTWARD</span><span className="ems-path-icon"><Compass size={20} /></span></div>
              <h3>Talk through<br />studying abroad.</h3>
              <p>Explore counsellor support and schedule a consultation about your study-abroad plans.</p>
              <a className="ems-card-link" href="#counselling">Meet a counsellor <ArrowRight size={17} /></a>
              <div className="ems-path-deco" />
            </motion.article>
          </div>
        </div>
      </section>

      <section id="courses" className="ems-course">
        <div className="ems-shell ems-course-grid">
          <motion.div
            className="ems-course-copy"
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="ems-eyebrow">A better way to begin</div>
            <h2>Curiosity first.<br />Then a course.</h2>
            <p>
              Explore what’s available before you commit. EMS Pro brings course discovery, course details, and enrollment into one straightforward journey.
            </p>
            <ul className="ems-checklist">
              <li><span className="ems-check"><Check size={12} /></span>Browse courses in one place</li>
              <li><span className="ems-check"><Check size={12} /></span>Review details before deciding</li>
              <li><span className="ems-check"><Check size={12} /></span>Enroll when you’re ready</li>
            </ul>
            <Link className="ems-text-link" href="/sign-up">Start exploring <ArrowRight size={16} /></Link>
          </motion.div>
          <motion.div className="ems-course-board" initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }}>
            <div className="ems-board-top"><span>Make room for what’s next</span><span><Sparkles size={15} /></span></div>
            <div className="ems-search-mock"><Search size={16} /> What would you like to learn?</div>
            <div className="ems-course-row"><span className="ems-course-icon"><BookOpen size={19} /></span><span><strong>Explore a course</strong><small>Start with a subject that interests you</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-course-row"><span className="ems-course-icon"><GraduationCap size={20} /></span><span><strong>Read the details</strong><small>See what a course includes</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-course-row"><span className="ems-course-icon"><Check size={20} /></span><span><strong>Take the next step</strong><small>Enroll when it feels right</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-board-foot">A simple path from looking to learning.</div>
          </motion.div>
        </div>
      </section>

      <section id="institutes" className="ems-partners">
        <div className="ems-shell ems-partner-grid">
          <motion.div
            className="ems-partner-art"
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            role="img"
            aria-label="Illustration of a welcoming learning institute"
          >
            <div className="ems-art-caption"><span /> A place to grow</div>
            <div className="ems-building" />
            <div className="ems-floating-note">Good learning starts with finding your people.</div>
          </motion.div>
          <motion.div
            className="ems-partner-copy"
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="ems-eyebrow">For coaching institutes</div>
            <h2>Be easier to find. Easier to reach.</h2>
            <p>
              EMS Pro gives students a way to discover institutes and submit applications. For institute teams, lead tracking keeps student enquiries in view.
            </p>
            <div className="ems-rule" />
            <div className="ems-partner-detail">
              <span className="ems-path-icon"><Search size={18} /></span>
              <div><strong>Help students find you</strong><p>Put your institute in the path of students looking for their next learning opportunity.</p></div>
            </div>
            <div className="ems-partner-detail">
              <span className="ems-path-icon"><MessageCircle size={18} /></span>
              <div><strong>Keep track of leads</strong><p>Follow up on student interest with lead tracking built for institute teams.</p></div>
            </div>
            <Link className="ems-text-link" href="/sign-up">Get started with EMS Pro <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>

      <section id="counselling" className="ems-counsellor">
        <div className="ems-shell ems-counsellor-inner">
          <motion.div
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="ems-eyebrow">For the bigger questions</div>
            <h2>Thinking about studying abroad?</h2>
            <p className="ems-counsellor-copy">
              You don’t have to have every detail figured out before you talk. Find a counsellor and schedule a consultation to discuss your study-abroad plans.
            </p>
            <div style={{ marginTop: 29 }}>
              <Link className="ems-button" href="/sign-up">Explore counsellor consultations <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
          <div className="ems-steps">
            <div className="ems-step"><span className="ems-step-num">1</span><div><strong>Explore counsellors</strong><span>See who’s available to guide your next conversation.</span></div></div>
            <div className="ems-step"><span className="ems-step-num">2</span><div><strong>Choose a time to talk</strong><span>Schedule a consultation that works for you.</span></div></div>
            <div className="ems-step"><span className="ems-step-num">3</span><div><strong>Bring your questions</strong><span>Talk through the choices you’re considering.</span></div></div>
          </div>
        </div>
      </section>

      <section className="ems-start">
        <div className="ems-shell">
          <motion.div
            className="ems-start-head"
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={riseIn}
            transition={{ duration: 0.55 }}
          >
            <div className="ems-eyebrow">Your next step starts here</div>
            <h2>Come as a student.<br />Or as an institute.</h2>
            <p>
              Whether you’re choosing where to learn or helping students find their way, EMS Pro is a place to get started.
            </p>
          </motion.div>
          <div className="ems-start-choices">
            <Link className="ems-start-card" href="/sign-up">
              <span className="ems-path-icon"><GraduationCap size={20} /></span>
              <span><strong>I’m a student</strong><span>Explore courses, institutes, and counsellors.</span></span>
              <ArrowRight size={18} />
            </Link>
            <Link className="ems-start-card" href="/sign-up">
              <span className="ems-path-icon"><Building2 size={20} /></span>
              <span><strong>I’m with an institute</strong><span>Connect with students and track leads.</span></span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="ems-footer">
        <div className="ems-shell ems-footer-inner">
          <a className="ems-footer-brand" href="#top">
            <span className="ems-mark"><GraduationCap size={16} /></span>
            EMS Pro
          </a>
          <nav className="ems-footer-links" aria-label="Footer navigation">
            <a href="#pathways">Pathways</a>
            <a href="#institutes">Institutes</a>
            <a href="#counselling">Counselling</a>
            <Link href="/sign-in">Sign in</Link>
          </nav>
          <span className="ems-copyright">Education, moving forward.</span>
        </div>
      </footer>
    </main>
  );
}
