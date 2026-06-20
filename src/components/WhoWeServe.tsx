"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users, Store, Building2, HardHat, Landmark, School, PersonStanding,
  Zap, ShieldCheck, Heart, ArrowRight,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────── */
type Color = "blue" | "emerald" | "violet" | "amber" | "rose" | "sky" | "orange";

const colorMap: Record<Color, {
  tile: string; iconBg: string; icon: string; border: string;
  left: string; tag: string; glow: string;
}> = {
  blue:    { tile: "from-blue-50 to-white",    iconBg: "bg-blue-500/12",    icon: "text-blue-600",    border: "border-blue-200",    left: "bg-blue-500",    tag: "bg-blue-50 text-blue-600 border-blue-200",    glow: "shadow-blue-100"    },
  emerald: { tile: "from-emerald-50 to-white", iconBg: "bg-emerald-500/12", icon: "text-emerald-600", border: "border-emerald-200", left: "bg-emerald-500", tag: "bg-emerald-50 text-emerald-700 border-emerald-200", glow: "shadow-emerald-100" },
  violet:  { tile: "from-violet-50 to-white",  iconBg: "bg-violet-500/12",  icon: "text-violet-600",  border: "border-violet-200",  left: "bg-violet-500",  tag: "bg-violet-50 text-violet-700 border-violet-200",  glow: "shadow-violet-100"  },
  amber:   { tile: "from-amber-50 to-white",   iconBg: "bg-amber-500/12",   icon: "text-amber-600",   border: "border-amber-200",   left: "bg-amber-500",   tag: "bg-amber-50 text-amber-700 border-amber-200",   glow: "shadow-amber-100"   },
  rose:    { tile: "from-rose-50 to-white",    iconBg: "bg-rose-500/12",    icon: "text-rose-600",    border: "border-rose-200",    left: "bg-rose-500",    tag: "bg-rose-50 text-rose-700 border-rose-200",    glow: "shadow-rose-100"    },
  sky:     { tile: "from-sky-50 to-white",     iconBg: "bg-sky-500/12",     icon: "text-sky-600",     border: "border-sky-200",     left: "bg-sky-500",     tag: "bg-sky-50 text-sky-700 border-sky-200",     glow: "shadow-sky-100"     },
  orange:  { tile: "from-orange-50 to-white",  iconBg: "bg-orange-500/12",  icon: "text-orange-600",  border: "border-orange-200",  left: "bg-orange-500",  tag: "bg-orange-50 text-orange-700 border-orange-200",  glow: "shadow-orange-100"  },
};

/* ── Data ──────────────────────────────────────────────────────────────── */
const clients: { icon: React.ElementType; label: string; desc: string; color: Color }[] = [
  { icon: Users,          label: "Private Individuals", desc: "Families & everyday customers",  color: "blue"    },
  { icon: Store,          label: "Small Businesses",    desc: "SMEs & local operators",         color: "emerald" },
  { icon: Building2,      label: "Corporate Clients",   desc: "Offices & organizations",        color: "violet"  },
  { icon: HardHat,        label: "Contractors",         desc: "Project teams on the ground",    color: "amber"   },
  { icon: Landmark,       label: "Government Bodies",   desc: "Public sector & community",      color: "rose"    },
  { icon: School,         label: "Institutions",        desc: "Schools, churches & offices",    color: "sky"     },
  { icon: PersonStanding, label: "Daily Commuters",     desc: "Travellers & PMV bus riders",    color: "orange"  },
];

const benefits: { icon: React.ElementType; title: string; body: string; tag: string; color: Color }[] = [
  {
    icon: Zap,
    title: "One Business, All Your Needs",
    body: "Transport, leasing, waste removal, travel, and advisory — all handled under one roof, saving you time and effort.",
    tag: "5 Services",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Professional & Dependable",
    body: "Reliability and professionalism in every service we deliver, so you always know what to expect from Anchorage.",
    tag: "Trusted",
    color: "emerald",
  },
  {
    icon: Heart,
    title: "Built for Papua New Guinea",
    body: "100% locally operated — we understand the NCD landscape and are committed to serving our community with care.",
    tag: "100% Local",
    color: "amber",
  },
];

/* ── Client tile ───────────────────────────────────────────────────────── */
function ClientTile({
  icon: Icon, label, desc, color, inView, delay, span2,
}: { icon: React.ElementType; label: string; desc: string; color: Color; inView: boolean; delay: number; span2?: boolean }) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`group relative bg-linear-to-br ${c.tile} border ${c.border} rounded-2xl p-4 sm:p-5 hover:shadow-lg ${c.glow} transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${span2 ? "col-span-2" : ""}`}
    >
      {/* Decorative circle */}
      <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full ${c.iconBg} opacity-60`} />

      <div className={`relative w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
        <Icon size={19} className={c.icon} />
      </div>

      <p className="text-slate-800 font-bold text-sm leading-tight">{label}</p>
      <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
    </motion.div>
  );
}

/* ── Benefit card ──────────────────────────────────────────────────────── */
function BenefitCard({
  icon: Icon, title, body, tag, color, inView, delay,
}: { icon: React.ElementType; title: string; body: string; tag: string; color: Color; inView: boolean; delay: number }) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden group`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full ${c.left}`} />

      <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0 ml-2`}>
        <Icon size={20} className={c.icon} />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <p className="text-slate-800 font-bold text-sm">{title}</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.tag}`}>{tag}</span>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export default function WhoWeServe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="who-we-serve" className="py-14 lg:py-28 bg-slate-50 relative overflow-hidden" ref={ref}>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-wws" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-wws)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Reach</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-800 leading-tight max-w-xl">
              Who We Serve &amp;{" "}
              <span className="text-blue-600">Why We&apos;re Different</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Serving individuals, businesses, and institutions across the National Capital District.
            </p>
          </div>
          <div className="mt-4 h-0.5 bg-linear-to-r from-blue-500/40 to-transparent rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left: client tiles ─────────────────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4"
            >
              Client types we serve
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              {clients.map((c, i) => (
                <ClientTile
                  key={c.label}
                  {...c}
                  inView={inView}
                  delay={0.1 + i * 0.07}
                  span2={i === clients.length - 1 && clients.length % 2 !== 0}
                />
              ))}
            </div>
          </div>

          {/* ── Right: benefits + CTA ──────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0"
            >
              Why choose Anchorage
            </motion.p>

            {benefits.map((b, i) => (
              <BenefitCard
                key={b.title}
                {...b}
                inView={inView}
                delay={0.2 + i * 0.12}
              />
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative bg-navy-800 rounded-2xl p-6 overflow-hidden"
            >
              {/* Decorative glows */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-500/25 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-600/20 blur-xl pointer-events-none" />
              {/* Hex pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hex-cta" width="40" height="34" patternUnits="userSpaceOnUse">
                    <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hex-cta)" />
              </svg>

              <div className="relative z-10">
                <p className="text-white font-extrabold text-lg mb-1">Ready to work with us?</p>
                <p className="text-blue-100/70 text-sm mb-5 leading-relaxed">
                  Reach out today and let us help with your transport, leasing,
                  waste removal, or business needs.
                </p>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-900/40"
                >
                  Get in Touch
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
