import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  MessageCircle,
  Zap,
  Clock,
  Settings2,
  BarChart3,
  Users,
  Check,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

/* ---------- tiny helpers ---------- */

function useScrolledPast(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- chat animation for hero ---------- */

const demoMessages = [
  { dir: 'out' as const, text: 'add task: Design hero section' },
  { dir: 'in' as const, text: 'Done -- *Design hero section* created.\nPriority: High | Due: Apr 5' },
  { dir: 'out' as const, text: "how's the sprint?" },
  { dir: 'in' as const, text: 'Sprint 4 -- 67% complete\n4 done, 3 in progress, 2 blocked\n5 days left' },
  { dir: 'out' as const, text: 'assign hero to Maya' },
  { dir: 'in' as const, text: "Done -- Maya's on it" },
];

function MiniChat() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= demoMessages.length) {
      const reset = setTimeout(() => setVisibleCount(0), 3000);
      return () => clearTimeout(reset);
    }
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1200);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="flex flex-col gap-1.5 px-3 py-3 overflow-hidden h-[280px]">
      {demoMessages.slice(0, visibleCount).map((msg, i) => (
        <motion.div
          key={`${i}-${visibleCount > demoMessages.length ? 'r' : ''}`}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[11px] leading-[15px] shadow-sm ${
            msg.dir === 'out'
              ? 'self-end bg-[#d9fdd3] rounded-tr-sm'
              : 'self-start bg-white rounded-tl-sm'
          }`}
        >
          {msg.dir === 'in' && (
            <span className="block text-[10px] font-semibold text-[#00a884] mb-0.5">WAPA</span>
          )}
          <span className="whitespace-pre-wrap text-[#111b21]">{msg.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- feature cards ---------- */

const features = [
  {
    icon: MessageCircle,
    title: 'Natural Language',
    desc: 'Just text what you need. No forms, no dropdowns, no training required.',
  },
  {
    icon: Users,
    title: 'Zero Onboarding',
    desc: 'Your team already uses WhatsApp. There is nothing new to learn.',
  },
  {
    icon: Zap,
    title: 'Instant Response',
    desc: 'Sub-800ms replies. WAPA feels like texting a team member, not a bot.',
  },
  {
    icon: Settings2,
    title: 'Smart Defaults',
    desc: 'Auto-assigns priority, due dates, and sprints so you can skip the setup.',
  },
  {
    icon: BarChart3,
    title: 'Sprint Tracking',
    desc: 'Burndown charts, velocity graphs, and progress updates -- all via chat.',
  },
  {
    icon: Clock,
    title: 'Daily Standups',
    desc: 'Automated daily check-ins. WAPA asks, your team replies, you get a summary.',
  },
];

/* ---------- pricing ---------- */

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    features: ['1 project', '5 team members', 'Basic task management', 'WhatsApp integration', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$8',
    period: '/mo',
    features: ['Unlimited projects', '15 team members', 'Sprint tracking', 'Burndown charts', 'Priority support', 'Custom workflows'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$15',
    period: '/mo',
    features: ['Everything in Pro', 'Unlimited members', 'Advanced analytics', 'API access', 'SSO & audit logs', 'Dedicated account manager'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

/* ---------- page ---------- */

export function LandingPage() {
  const scrolled = useScrolledPast(40);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[var(--font-body)]">
      {/* ---- NAVBAR ---- */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--wapa-green-500)] flex items-center justify-center text-white font-bold text-sm">
              W
            </div>
            <span className="font-bold text-lg tracking-tight font-[var(--font-display)]">WAPA</span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/demo"
              className="text-sm font-semibold text-white bg-[var(--wapa-green-500)] hover:bg-[var(--wapa-green-400)] px-4 py-2 rounded-lg transition-colors"
            >
              Try Demo
            </Link>
          </div>

          {/* mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* mobile menu */}
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3"
          >
            <a href="#features" className="block text-sm font-medium text-gray-700" onClick={() => setMobileNav(false)}>Features</a>
            <a href="#how-it-works" className="block text-sm font-medium text-gray-700" onClick={() => setMobileNav(false)}>How it Works</a>
            <a href="#pricing" className="block text-sm font-medium text-gray-700" onClick={() => setMobileNav(false)}>Pricing</a>
            <Link to="/demo" className="block text-sm font-semibold text-[var(--wapa-green-600)]" onClick={() => setMobileNav(false)}>Try Demo</Link>
          </motion.div>
        )}
      </nav>

      {/* ---- HERO ---- */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        {/* decorative gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--wapa-green-100)] opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-50 opacity-50 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight font-[var(--font-display)]"
            >
              Project management that lives in your{' '}
              <span className="text-[var(--wapa-green-500)]">group chat</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg text-gray-500 max-w-lg leading-relaxed"
            >
              Stop forcing your team onto another platform. WAPA turns your WhatsApp into a powerful PM tool.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/demo"
                className="group relative inline-flex items-center gap-2 bg-[var(--wapa-green-500)] hover:bg-[var(--wapa-green-400)] text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-green-500/20"
              >
                <span className="absolute inset-0 rounded-xl animate-pulse bg-[var(--wapa-green-400)] opacity-0 group-hover:opacity-30 transition-opacity" />
                Try the Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-base px-6 py-3.5 rounded-xl transition-colors"
              >
                See Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* right -- phone frame */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex justify-center"
          >
            <div className="w-[280px] rounded-[2.5rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden">
              {/* phone status bar */}
              <div className="bg-[#008069] h-6 flex items-center justify-center">
                <div className="w-16 h-3 bg-gray-900 rounded-full" />
              </div>
              {/* WA header mini */}
              <div className="bg-[#008069] px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">W</div>
                <div>
                  <div className="text-white text-xs font-medium">WAPA</div>
                  <div className="text-green-100 text-[9px]">online</div>
                </div>
              </div>
              {/* chat area */}
              <div
                className="min-h-[280px]"
                style={{ backgroundColor: '#efeae2', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20h1v1h-1z\' fill=\'%23d4cfc6\' fill-opacity=\'.15\'/%3E%3C/svg%3E")' }}
              >
                <MiniChat />
              </div>
              {/* input bar */}
              <div className="bg-[#f0f2f5] px-3 py-2 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-7" />
                <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                </div>
              </div>
              {/* home indicator */}
              <div className="bg-gray-900 py-2 flex justify-center">
                <div className="w-20 h-1 rounded-full bg-gray-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="py-20 md:py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold text-[var(--wapa-green-600)] uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] tracking-tight">
              Everything you need, nothing you don't
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--wapa-green-50)] flex items-center justify-center mb-4 group-hover:bg-[var(--wapa-green-100)] transition-colors">
                  <f.icon className="w-5 h-5 text-[var(--wapa-green-600)]" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section id="how-it-works" className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold text-[var(--wapa-green-600)] uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] tracking-tight">
              Three steps. That's it.
            </h2>
          </FadeIn>

          <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
            {/* dashed connector */}
            <div className="hidden md:block absolute top-10 left-[16.7%] right-[16.7%] h-px border-t-2 border-dashed border-gray-300" />

            {[
              { num: '1', title: 'Text WAPA', desc: 'Add WAPA to your WhatsApp group. That is all the setup you need.' },
              { num: '2', title: 'Manage naturally', desc: 'Create tasks, assign work, and check status using plain language.' },
              { num: '3', title: 'Track progress', desc: 'View dashboards, burndowns, and velocity -- or just ask WAPA in chat.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15} className="text-center relative">
                <div className="relative z-10 w-14 h-14 rounded-full bg-[var(--wapa-green-500)] text-white text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/20">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PRICING ---- */}
      <section id="pricing" className="py-20 md:py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold text-[var(--wapa-green-600)] uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] tracking-tight">
              Simple, transparent pricing
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl border p-7 flex flex-col h-full transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-white border-[var(--wapa-green-500)] shadow-xl shadow-green-500/10 scale-[1.03] z-10'
                      : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--wapa-green-500)] text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold font-[var(--font-display)]">{tier.price}</span>
                    <span className="text-sm text-gray-400">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[var(--wapa-green-500)] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? 'bg-[var(--wapa-green-500)] text-white hover:bg-[var(--wapa-green-400)]'
                        : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FOOTER / CTA ---- */}
      <footer className="relative overflow-hidden py-20 md:py-28 px-6 bg-gradient-to-br from-[var(--wapa-green-600)] via-[var(--wapa-green-500)] to-emerald-400 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] tracking-tight mb-4">
              Stop managing projects.<br />Start texting about them.
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto">
              Join teams already using WAPA to get more done with less friction.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-white text-[var(--wapa-green-600)] font-semibold px-7 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-lg"
              >
                Try the Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="mt-16 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 text-sm text-green-100">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
          </div>
          <p className="mt-6 text-xs text-green-200/60">
            &copy; 2026 WAPA. Built with care in Lagos.
          </p>
        </div>
      </footer>
    </div>
  );
}
