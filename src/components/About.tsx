"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import { MapPin, Shield, Layers, Users, CheckCircle2 } from "lucide-react";

/* ── Service portfolio data (donut chart) ───────────────────────────── */
const portfolio = [
  { name: "Vehicle Leasing",   value: 25, color: "#2165ae" },
  { name: "PMV Transport",     value: 20, color: "#4b8fd4" },
  { name: "Waste Removal",     value: 22, color: "#0d2d74" },
  { name: "Travel Services",   value: 18, color: "#7ab3e0" },
  { name: "Business Advisory", value: 15, color: "#1a5bb7" },
];

/* ── Highlight cards ─────────────────────────────────────────────────── */
const highlights = [
  { icon: MapPin,   label: "NCD-Wide Coverage",    desc: "All across Port Moresby"   },
  { icon: Users,    label: "Community Focused",    desc: "Serving people first"       },
  { icon: Layers,   label: "Multi-Service",        desc: "One provider, 5 solutions"  },
  { icon: Shield,   label: "Professional Team",    desc: "Reliable & experienced"     },
];

const checklist = [
  "Locally established and community-focused",
  "Multiple services under one roof",
  "Serving individuals, businesses & government",
  "Committed to reliability and professionalism",
];

/* ── Custom donut tooltip ────────────────────────────────────────────── */
type TooltipEntry = { name: string; value: number; payload: { color: string } };
function DonutTip({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-white border border-slate-200 shadow-xl rounded-lg px-3 py-2 text-xs">
      <span className="font-bold text-slate-700">{p.name}</span>
      <span className="ml-2 text-slate-400">{p.value}%</span>
    </div>
  );
}

/* ── About ───────────────────────────────────────────────────────────── */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-14 lg:py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left column ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            {/* Photo card with 3D tilt */}
            <Tilt
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              glareEnable
              glareMaxOpacity={0.08}
              glareColor="#4b8fd4"
              glarePosition="all"
              className="w-full"
            >
              <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/20 select-none">
                {/* Main photo */}
                <Image
                  src="/working3.png"
                  alt="Anchorage team at work in Port Moresby"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-navy-900/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

                {/* Hex pattern overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hex-about-photo" width="40" height="34" patternUnits="userSpaceOnUse">
                      <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hex-about-photo)" />
                </svg>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-blue-300 font-semibold text-xs uppercase tracking-widest mb-1">Who We Are</p>
                  <blockquote className="text-white font-bold text-lg sm:text-xl leading-snug">
                    &ldquo;Reliable Solutions in Transport, Leasing &amp; Business Support.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <p className="text-blue-200/70 text-xs font-medium">
                      Anchorage Business &amp; Transport Services — Port Moresby, NCD
                    </p>
                  </div>
                </div>

                {/* Small inset photo */}
                <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                  <Image src="/working1.png" alt="Anchorage truck" fill className="object-cover" />
                  <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
                </div>
              </div>
            </Tilt>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "5+",   label: "Services"     },
                { value: "NCD",  label: "Coverage"     },
                { value: "100%", label: "PNG-Owned"    },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:border-blue-200 hover:shadow-md transition-all duration-200"
                >
                  <p className="text-2xl font-extrabold text-navy-800">{s.value}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Service portfolio donut chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Service Portfolio
              </p>
              <div className="flex items-center gap-4">
                {/* Donut */}
                <div className="w-28 h-28 shrink-0">
                  {inView && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolio}
                          cx="50%"
                          cy="50%"
                          innerRadius={32}
                          outerRadius={52}
                          dataKey="value"
                          strokeWidth={0}
                          animationBegin={200}
                          animationDuration={900}
                        >
                          {portfolio.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<DonutTip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                {/* Legend */}
                <ul className="flex flex-col gap-1.5 min-w-0">
                  {portfolio.map((p) => (
                    <li key={p.name} className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="text-xs text-slate-600 truncate">{p.name}</span>
                      <span className="text-xs text-slate-400 ml-auto pl-2 shrink-0">{p.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Company Overview
            </p>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-800 leading-tight mb-3">
              A Trusted Partner for
            </h2>

            {/* Typewriter cycling tagline */}
            {inView && (
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-600 mb-6 h-10">
                <TypeAnimation
                  sequence={[
                    "Business & Transport", 2000,
                    "Vehicle Leasing",       1600,
                    "Waste Management",      1600,
                    "Travel & Advisory",     1600,
                    "PMV Services",          1600,
                  ]}
                  wrapper="span"
                  speed={55}
                  deletionSpeed={70}
                  repeat={Infinity}
                  cursor
                />
              </div>
            )}

            <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-4">
              Anchorage Business and Transport Services is a locally established
              service provider offering reliable transport, vehicle leasing,
              waste removal, travel support, and business advisory solutions.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Committed to delivering practical, dependable, and customer-focused
              services to individuals, private businesses, corporate clients, and
              community-based organizations across the National Capital District.
            </p>

            {/* 2×2 highlight cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.09 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-colors">
                    <h.icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-xs leading-tight">{h.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checklist */}
            <ul className="space-y-2.5">
              {checklist.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
