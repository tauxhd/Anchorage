"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Award, Users, Scale, Zap, Star, Layers } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ─── Data ─────────────────────────────────────────────── */

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Services clients can depend on, every time.",
    score: 98,
    color: "#38bdf8",
    textClass: "text-sky-400",
    bgClass: "bg-sky-500/15",
    borderClass: "border-sky-500/30",
    barClass: "bg-sky-400",
  },
  {
    icon: Award,
    title: "Professionalism",
    description: "Respectful, organised, and responsible in all dealings.",
    score: 95,
    color: "#a78bfa",
    textClass: "text-violet-400",
    bgClass: "bg-violet-500/15",
    borderClass: "border-violet-500/30",
    barClass: "bg-violet-400",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Practical solutions built around your goals.",
    score: 97,
    color: "#fbbf24",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/15",
    borderClass: "border-amber-500/30",
    barClass: "bg-amber-400",
  },
  {
    icon: Scale,
    title: "Integrity",
    description: "Honest, transparent, and accountable — always.",
    score: 99,
    color: "#34d399",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/15",
    borderClass: "border-emerald-500/30",
    barClass: "bg-emerald-400",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Fast, practical service that saves time and adds value.",
    score: 94,
    color: "#fb7185",
    textClass: "text-rose-400",
    bgClass: "bg-rose-500/15",
    borderClass: "border-rose-500/30",
    barClass: "bg-rose-400",
  },
];

const radialData = [...values].reverse().map((v) => ({
  name: v.title,
  value: v.score,
  fill: v.color,
}));

const monthlyData = [
  { month: "Jan", clients: 28, satisfaction: 93 },
  { month: "Feb", clients: 35, satisfaction: 94 },
  { month: "Mar", clients: 42, satisfaction: 95 },
  { month: "Apr", clients: 38, satisfaction: 95 },
  { month: "May", clients: 55, satisfaction: 96 },
  { month: "Jun", clients: 62, satisfaction: 96 },
  { month: "Jul", clients: 70, satisfaction: 97 },
  { month: "Aug", clients: 65, satisfaction: 97 },
  { month: "Sep", clients: 78, satisfaction: 98 },
  { month: "Oct", clients: 85, satisfaction: 98 },
  { month: "Nov", clients: 90, satisfaction: 99 },
  { month: "Dec", clients: 95, satisfaction: 99 },
];

const stats = [
  { value: 500, suffix: "+", label: "Clients Served",     sublabel: "across NCD",            icon: Users  },
  { value: 98,  suffix: "%", label: "Avg. Satisfaction",  sublabel: "client-rated",           icon: Star   },
  { value: 5,   suffix: "",  label: "Core Services",      sublabel: "all under one roof",     icon: Layers },
];

/* ─── Colour helpers ─────────────────────────────────────── */

function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${((rr << 16) | (rg << 8) | rb).toString(16).padStart(6, "0")}`;
}

// rose → amber → emerald as progress 0→1
function successColor(p: number): string {
  if (p < 0.5) return lerpColor("#fb7185", "#fbbf24", p * 2);
  return lerpColor("#fbbf24", "#34d399", (p - 0.5) * 2);
}

/* ─── StatCard ───────────────────────────────────────────── */

const RADIUS = 52;
const CIRC   = 2 * Math.PI * RADIUS;

type StatDef = { value: number; suffix: string; label: string; sublabel: string; icon: React.ElementType };

function StatCard({ value: target, suffix, label, sublabel, icon: Icon, active, delay }: StatDef & { active: boolean; delay: number }) {
  const [count,    setCount]    = useState(0);
  const [progress, setProgress] = useState(0);

  const animate = useCallback(() => {
    if (!active) return;
    const duration = 1800;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(now - startTime, duration);
      const p = elapsed / duration;
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setCount(Math.round(eased * target));
      setProgress(eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    // small delay per card
    const t = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => { clearTimeout(t); cancelAnimationFrame(rafId); };
  }, [active, target, delay]);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  const color   = successColor(progress);
  const offset  = CIRC * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="relative flex flex-col items-center gap-3 bg-white/4 border border-white/8 rounded-3xl px-4 py-7 overflow-hidden"
      style={{ boxShadow: `0 0 40px ${color}22` }}
    >
      {/* Subtle radial bg glow that shifts colour */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${color}18 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center border"
        style={{ backgroundColor: `${color}20`, borderColor: `${color}40` }}
      >
        <Icon size={17} style={{ color }} />
      </div>

      {/* SVG ring */}
      <div className="relative z-10">
        <svg width="140" height="140" className="-rotate-90">
          {/* Track */}
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          {/* Progress arc */}
          <circle
            cx="70" cy="70" r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.1s ease" }}
          />
        </svg>

        {/* Number in centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span
            className="text-3xl font-black leading-none tabular-nums"
            style={{ color }}
          >
            {count}{suffix}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div className="relative z-10 text-center">
        <p className="text-white font-bold text-sm leading-tight">{label}</p>
        <p className="text-blue-300/50 text-xs mt-0.5">{sublabel}</p>
      </div>
    </motion.div>
  );
}

/* ─── Custom tooltip ─────────────────────────────────────── */

type TooltipEntry = { name?: string; value?: number | string; color?: string };
type ChartTooltipProps = { active?: boolean; payload?: TooltipEntry[]; label?: string };

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy-800 border border-white/10 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}{p.name === "Satisfaction" ? "%" : ""}
        </p>
      ))}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────── */

export default function Values() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="values"
      className="py-12 lg:py-28 bg-navy-900 relative overflow-hidden"
      ref={ref}
    >
      {/* Hex grid bg */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-val" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-val)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-14">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">What Drives Us</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
            Our Core Values
          </h2>
          <p className="text-blue-100/60 text-base leading-relaxed">
            Every decision, every service, every interaction is guided by five principles we never compromise on.
          </p>
        </motion.div>

        {/* ── Stat cards — compact strip on mobile, full rings on sm+ ── */}
        <div className="sm:hidden grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-white/4 border border-white/8 rounded-2xl py-4 px-2 text-center">
              <s.icon size={16} className="text-blue-400 mb-1" />
              <p className="text-xl font-black text-white leading-none">{s.value}{s.suffix}</p>
              <p className="text-[10px] text-blue-300/60 font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} active={inView} delay={i * 180} />
          ))}
        </div>

        {/* ── Middle: radial chart + value cards ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Radial bar chart — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block bg-white/4 border border-white/8 rounded-3xl p-6 lg:p-8"
          >
            <p className="text-white font-bold text-base mb-1">Value Performance Scores</p>
            <p className="text-blue-100/50 text-xs mb-6">Measured across client interactions &amp; internal audits</p>

            <div className="h-64 sm:h-72">
              {inView && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="25%"
                    outerRadius="90%"
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={6}
                      background={{ fill: "rgba(255,255,255,0.04)" }}
                      isAnimationActive
                      animationDuration={1200}
                    />
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
                            <p style={{ color: payload[0].payload.fill }} className="font-bold">
                              {payload[0].payload.name}: {payload[0].value}%
                            </p>
                          </div>
                        ) : null
                      }
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-4">
              {values.map((v) => (
                <div key={v.title} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
                  <span className="text-xs text-blue-100/60">{v.title} — {v.score}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Value cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 bg-white/4 border ${v.borderClass} rounded-2xl px-4 py-3 lg:px-5 lg:py-4 hover:bg-white/8 transition-colors group`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${v.bgClass} border ${v.borderClass} flex items-center justify-center shrink-0`}>
                  <v.icon size={18} className={v.textClass} />
                </div>

                {/* Text + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-white font-bold text-sm">{v.title}</p>
                    <span className={`text-xs font-black ${v.textClass}`}>{v.score}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${v.barClass}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${v.score}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="hidden sm:block text-blue-100/50 text-xs mt-1.5 leading-tight">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom: area chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="bg-white/4 border border-white/8 rounded-3xl p-4 sm:p-6 lg:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <p className="text-white font-bold text-base">Business Growth — 2025</p>
              <p className="text-blue-100/50 text-xs">Monthly clients served &amp; average satisfaction score</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-sky-400 inline-block" />
                <span className="text-blue-100/60">Clients</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-emerald-400 inline-block" />
                <span className="text-blue-100/60">Satisfaction %</span>
              </span>
            </div>
          </div>

          <div className="h-40 sm:h-52 lg:h-64">
            {inView && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradClients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradSatisfaction" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(147,197,253,0.5)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(147,197,253,0.5)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="clients"
                    name="Clients"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fill="url(#gradClients)"
                    dot={false}
                    isAnimationActive
                    animationDuration={1400}
                  />
                  <Area
                    type="monotone"
                    dataKey="satisfaction"
                    name="Satisfaction"
                    stroke="#34d399"
                    strokeWidth={2}
                    fill="url(#gradSatisfaction)"
                    dot={false}
                    isAnimationActive
                    animationDuration={1600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
