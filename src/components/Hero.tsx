"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Truck, Trash2, Briefcase, Bus, Map,
  Layers, MapPin, ShieldCheck, Clock,
} from "lucide-react";

/* ── Service tag pills ─────────────────────────────────────────────────── */
const serviceTags = [
  { icon: Truck,     label: "Vehicle Leasing"   },
  { icon: Trash2,    label: "Waste Removal"     },
  { icon: Bus,       label: "PMV Transport"     },
  { icon: Briefcase, label: "Business Advisory" },
  { icon: Map,       label: "Travel Services"   },
];

/* ── Stats config ──────────────────────────────────────────────────────── */
type StatColor = "blue" | "sky" | "emerald" | "amber";

const heroStats: {
  num: number | null;
  text?: string;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: StatColor;
}[] = [
  { num: 5,    suffix: "+",  label: "Services",  icon: Layers,     color: "blue"    },
  { num: null, text: "NCD",  suffix: "",  label: "Coverage",  icon: MapPin,     color: "sky"     },
  { num: 100,  suffix: "%",  label: "Local",     icon: ShieldCheck,color: "emerald" },
  { num: 24,   suffix: "/7", label: "Support",   icon: Clock,      color: "amber"   },
];

const colorMap: Record<StatColor, { icon: string; bar: string; glow: string; val: string }> = {
  blue:    { icon: "text-blue-400",    bar: "bg-blue-400",    glow: "from-blue-500/10",    val: "text-blue-50"    },
  sky:     { icon: "text-sky-400",     bar: "bg-sky-400",     glow: "from-sky-500/10",     val: "text-sky-50"     },
  emerald: { icon: "text-emerald-400", bar: "bg-emerald-400", glow: "from-emerald-500/10", val: "text-emerald-50" },
  amber:   { icon: "text-amber-400",   bar: "bg-amber-400",   glow: "from-amber-500/10",   val: "text-amber-50"   },
};

/* ── Animated stat cell ────────────────────────────────────────────────── */
function HeroStat({
  num, text, suffix, label, icon: Icon, color, borders,
}: (typeof heroStats)[0] & { borders: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const c = colorMap[color];

  useEffect(() => {
    if (!inView || num === null) return;
    const dur = 1400;
    const start = performance.now();
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(Math.round(ease(p) * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num]);

  return (
    <div ref={ref} className={`relative py-5 sm:py-6 px-3 sm:px-6 text-center group overflow-hidden ${borders}`}>
      {/* Top accent bar */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${c.bar} opacity-70`} />
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-linear-to-b ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Icon size={15} className={`${c.icon} mx-auto mb-1.5 opacity-90`} />

        {text ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-xl sm:text-2xl lg:text-3xl font-black ${c.val} mb-1 leading-none`}
          >
            {text}
          </motion.p>
        ) : (
          <p className={`text-xl sm:text-2xl lg:text-3xl font-black ${c.val} mb-1 leading-none tabular-nums`}>
            {display}{suffix}
          </p>
        )}

        <p className="text-blue-300/60 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
          {label}
        </p>
      </motion.div>
    </div>
  );
}

/* ── Hex image (desktop stack) ─────────────────────────────────────────── */
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function HexImage({ src, alt, size, delay = 0 }: {
  src: string; alt: string; size: "lg" | "md"; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`relative shrink-0 ${size === "lg" ? "w-64 h-72" : "w-52 h-60"}`}
      style={{ clipPath: HEX }}
    >
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-blue-800/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-b from-navy-900/30 via-transparent to-navy-900/60" />
    </motion.div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative flex flex-col lg:min-h-screen overflow-hidden bg-navy-900">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-blue-600/30" />
        <div className="absolute -top-20 right-0 w-3/5 h-full bg-linear-to-bl from-blue-600/20 via-blue-700/10 to-transparent" />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-bg" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-bg)" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-navy-900 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full lg:flex-1 lg:flex lg:items-center pt-24 sm:pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-16 flex flex-col lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-center">

          {/* Text column */}
          <div className="max-w-xl">

            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1.5 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs sm:text-sm font-medium">
                <span className="sm:hidden">Port Moresby, PNG</span>
                <span className="hidden sm:inline">Port Moresby · National Capital District · PNG</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4"
            >
              Moving PNG
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-300">
                Forward.
              </span>
            </motion.h1>

            {/* Accent bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="origin-left h-1 w-16 rounded-full bg-linear-to-r from-blue-500 to-blue-300 mb-4"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-blue-100/75 text-base lg:text-lg leading-relaxed mb-6"
            >
              Dependable transport, vehicle leasing, waste removal, travel, and
              business advisory — all under one roof.
            </motion.p>

            {/* Mobile featured image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:hidden relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-blue-500/20 shadow-2xl"
            >
              <Image src="/working1.png" alt="Anchorage truck and worker on site" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-white/80 text-xs font-semibold tracking-wide">
                  Anchorage Business &amp; Transport Services
                </span>
              </div>
              <div className="absolute top-3 right-3 flex gap-1.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/20">
                  <Image src="/working2.png" alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-blue-800/50 mix-blend-multiply" />
                </div>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/20">
                  <Image src="/working3.png" alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-blue-800/50 mix-blend-multiply" />
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-10"
            >
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg shadow-blue-900/50 hover:-translate-y-0.5"
              >
                Explore Our Services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-bold rounded-xl transition-all duration-200 text-sm sm:text-base hover:-translate-y-0.5"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Service tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:flex-wrap lg:overflow-visible"
            >
              {serviceTags.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap bg-white/6 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-blue-200/80 font-medium"
                >
                  <Icon size={12} className="text-blue-400" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Desktop hex stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden lg:flex flex-col items-center relative"
          >
            <div className="absolute inset-0 bg-blue-600/15 blur-3xl rounded-full scale-150 pointer-events-none" />
            <HexImage src="/working1.png" alt="Anchorage waste truck and worker" size="lg" delay={0.3} />
            <div className="flex gap-3 -mt-8">
              <HexImage src="/working2.png" alt="Anchorage team loading truck" size="md" delay={0.45} />
              <HexImage src="/working3.png" alt="Anchorage worker at market" size="md" delay={0.55} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {heroStats.map((s, i) => {
              const borders = [
                "border-r border-b border-white/10 sm:border-b-0",
                "border-b border-white/10 sm:border-b-0 sm:border-l sm:border-white/10",
                "border-r border-white/10 sm:border-r-0 sm:border-l sm:border-white/10",
                "sm:border-l sm:border-white/10",
              ][i];
              return <HeroStat key={s.label} {...s} borders={borders} />;
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
