"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Trash2,
  TrendingUp,
  Bus,
  Plane,
  X,
  CheckCircle2,
  Users,
} from "lucide-react";

type Service = {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
  extendedDescription: string;
  image: string;
  imageAlt: string;
  tags: string[];
  benefits: string[];
  clients: string[];
  darkImage: boolean;
  accent: {
    from: string;
    to: string;
    text: string;
    bg: string;
    border: string;
    glow: string;
    dot: string;
  };
};

const services: Service[] = [
  {
    icon: Truck,
    number: "01",
    title: "Truck & Light Motor Vehicle Lease",
    description:
      "Flexible truck and light motor vehicle leasing for private, commercial, and project-based use.",
    extendedDescription:
      "Our vehicle leasing service gives you access to a reliable fleet without the heavy upfront cost of ownership. Whether you need a truck for a short project or a long-term logistics contract, we offer flexible terms tailored to your business requirements. All vehicles are well-maintained and ready for immediate deployment across NCD and surrounding areas.",
    image: "/trucklease.png",
    imageAlt: "Vehicle leasing illustration",
    tags: ["Private & Commercial", "Logistics", "Flexible Terms", "Site Work"],
    benefits: [
      "No large upfront capital required",
      "Short and long-term lease options",
      "Well-maintained, reliable vehicles",
      "Suitable for any project size",
      "Delivery and logistics support",
    ],
    clients: ["Contractors & builders", "Corporate businesses", "Event organizers", "Delivery services"],
    darkImage: false,
    accent: {
      from: "from-sky-400",
      to: "to-cyan-500",
      text: "text-sky-400",
      bg: "bg-sky-500/15",
      border: "border-sky-500/30",
      glow: "bg-sky-500/20",
      dot: "bg-sky-400",
    },
  },
  {
    icon: Trash2,
    number: "02",
    title: "Garbage Collection & Removals",
    description:
      "Reliable garbage collection and removal services for both private and corporate clients.",
    extendedDescription:
      "We provide professional, scheduled garbage collection and bulk waste removal to keep your environment clean and compliant. Our licensed waste handlers operate efficiently across residential, commercial, and institutional sites. From routine collections to one-off clean-ups, Anchorage ensures responsible and timely waste management.",
    image: "/garbagetruck.png",
    imageAlt: "Garbage collection truck illustration",
    tags: ["Residential", "Commercial", "Institutions", "Work Sites"],
    benefits: [
      "Scheduled and on-demand pickups",
      "Licensed waste handling team",
      "Competitive, transparent pricing",
      "Eco-conscious disposal methods",
      "Bulk removal available",
    ],
    clients: ["Homes & residences", "Offices & businesses", "Hospitality venues", "Construction sites"],
    darkImage: true,
    accent: {
      from: "from-emerald-400",
      to: "to-green-500",
      text: "text-emerald-400",
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      glow: "bg-emerald-500/20",
      dot: "bg-emerald-400",
    },
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Financial Business Advisory & Lending Referrals",
    description:
      "We assist individuals and businesses with financial advisory support and lending referral services.",
    extendedDescription:
      "Navigating business finance can be complex. Our advisory service helps you build a clear picture of your financial position, prepare documentation for lenders, and connect with suitable financial institutions. Whether you're starting a new venture or growing an existing one, we provide practical guidance every step of the way.",
    image: "/money.png",
    imageAlt: "Financial advisory illustration",
    tags: ["Business Advisory", "Lending Referrals", "Finance Planning", "SME Support"],
    benefits: [
      "Business plan and financial review",
      "Loan application preparation support",
      "Connections to suitable lenders",
      "Financial literacy guidance",
      "Ongoing advisory relationship",
    ],
    clients: ["Entrepreneurs & startups", "SMEs", "Project developers", "Community groups"],
    darkImage: true,
    accent: {
      from: "from-amber-400",
      to: "to-orange-500",
      text: "text-amber-400",
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      glow: "bg-amber-500/20",
      dot: "bg-amber-400",
    },
  },
  {
    icon: Bus,
    number: "04",
    title: "PMV Transport Services",
    description:
      "Public Motor Vehicle transport for daily passenger movement and community transport needs.",
    extendedDescription:
      "Our PMV transport service connects communities across the National Capital District with safe, affordable, and reliable passenger transport. We prioritize punctuality and passenger safety, operating well-maintained vehicles on established routes. Whether for daily commutes or special group transport, Anchorage keeps you moving.",
    image: "/bus.png",
    imageAlt: "PMV bus illustration",
    tags: ["Daily Commuters", "Community Routes", "Safe & Reliable", "Affordable"],
    benefits: [
      "Fixed, reliable route schedules",
      "Safe, insured vehicles",
      "Affordable community fares",
      "Group and charter options",
      "Operating across NCD routes",
    ],
    clients: ["Daily commuters", "School & market transport", "Corporate staff shuttles", "Community groups"],
    darkImage: false,
    accent: {
      from: "from-violet-400",
      to: "to-purple-500",
      text: "text-violet-400",
      bg: "bg-violet-500/15",
      border: "border-violet-500/30",
      glow: "bg-violet-500/20",
      dot: "bg-violet-400",
    },
  },
  {
    icon: Plane,
    number: "05",
    title: "Travel & Advisory Services",
    description:
      "Travel guidance, planning support, and practical advice for local and business-related travel.",
    extendedDescription:
      "Our travel advisory service provides end-to-end support for business and personal travel. From flight coordination and itinerary planning to local movement guidance and accommodation referrals, we leverage our local knowledge to make your travel experience smooth and stress-free. No trip is too small or too complex.",
    image: "/plane.png",
    imageAlt: "Travel and advisory illustration",
    tags: ["Travel Planning", "Business Travel", "Flight Support", "Local Advisory"],
    benefits: [
      "Domestic and regional travel planning",
      "Flight and transport coordination",
      "Accommodation referrals",
      "Custom itinerary advice",
      "Local knowledge and expertise",
    ],
    clients: ["Business travellers", "Corporate delegations", "Government staff", "Tourists & visitors"],
    darkImage: false,
    accent: {
      from: "from-rose-400",
      to: "to-pink-500",
      text: "text-rose-400",
      bg: "bg-rose-500/15",
      border: "border-rose-500/30",
      glow: "bg-rose-500/20",
      dot: "bg-rose-400",
    },
  },
];

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
};

const imageVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.88 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.88 }),
};

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const a = service.accent;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-900/85 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-navy-800 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Coloured header stripe */}
        <div className={`h-1.5 w-full rounded-t-3xl bg-linear-to-r ${a.from} ${a.to}`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all z-10"
        >
          <X size={16} />
        </button>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left — large image */}
          <div className={`relative flex items-center justify-center p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/8`}>
            {/* Colour glow */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
              <div className={`w-64 h-64 rounded-full ${a.glow} blur-3xl`} />
            </div>
            <div className="relative w-full max-w-xs aspect-square">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right — content */}
          <div className="p-8 lg:p-10 flex flex-col gap-5">
            {/* Icon + number */}
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center`}>
                <service.icon size={22} className={a.text} />
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                Service {service.number}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white leading-snug mb-3">
                {service.title}
              </h3>
              <div className={`h-0.5 w-10 rounded-full bg-linear-to-r ${a.from} ${a.to} mb-4`} />
              <p className="text-blue-100/65 text-sm leading-relaxed">
                {service.extendedDescription}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                Key Benefits
              </p>
              <ul className="space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className={`${a.text} mt-0.5 shrink-0`} />
                    <span className="text-blue-100/75 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clients */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users size={13} /> Who It&apos;s For
              </p>
              <div className="flex flex-wrap gap-2">
                {service.clients.map((c) => (
                  <span
                    key={c}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${a.bg} ${a.border} border ${a.text}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r ${a.from} ${a.to} text-white font-bold text-sm shadow-lg transition-opacity hover:opacity-90`}
            >
              Enquire About This Service
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const dragStartX = useRef(0);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const prev = () => go((index - 1 + services.length) % services.length);
  const next = () => go((index + 1) % services.length);

  const onPointerDown = (e: React.PointerEvent) => { dragStartX.current = e.clientX; };
  const onPointerUp   = (e: React.PointerEvent) => {
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const s = services[index];
  const a = s.accent;

  return (
    <>
      <section id="services" className="py-14 lg:py-28 bg-navy-900 relative overflow-hidden">
        {/* Hex grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-svc" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-svc)" />
        </svg>

        {/* Ambient glow — colour changes per slide */}
        <motion.div
          key={`glow-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 ${a.glow} rounded-full blur-3xl pointer-events-none`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <p className={`font-semibold text-sm uppercase tracking-widest mb-3 ${a.text}`}>
              What We Do
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
              Our Business Activities
            </h2>
            <p className="text-blue-100/60 text-base leading-relaxed">
              Five services, one business — everything you need to move forward.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div
              className={`overflow-hidden rounded-3xl border ${a.border} bg-white/4 backdrop-blur-sm transition-colors duration-500`}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  /* flex-col-reverse → image appears on TOP on mobile without re-ordering DOM */
                  className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:min-h-120"
                >
                  {/* Content — second in DOM = bottom on mobile, LEFT on desktop */}
                  <div className="p-5 sm:p-8 lg:p-14 flex flex-col justify-center relative">
                    {/* Coloured accent line — bottom on mobile, top-left on desktop */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 lg:bottom-auto lg:top-0 lg:right-auto lg:h-full lg:w-0.5 bg-linear-to-r ${a.from} ${a.to} opacity-40`} />

                    {/* Watermark — desktop only */}
                    <span className="hidden lg:block absolute top-6 right-8 text-[7rem] font-black text-white/4 leading-none select-none pointer-events-none">
                      {s.number}
                    </span>

                    {/* Icon + label row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`inline-flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl ${a.bg} border ${a.border}`}>
                        <s.icon size={20} className={a.text} />
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                        Service {s.number}
                      </p>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug mb-3">
                      {s.title}
                    </h3>

                    <div className={`h-0.5 w-10 rounded-full bg-linear-to-r ${a.from} ${a.to} mb-3`} />

                    <p className="text-blue-100/65 text-sm lg:text-base leading-relaxed mb-4">
                      {s.description}
                    </p>

                    {/* Tags — max 3 visible on mobile to save space */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {s.tags.slice(0, 4).map((tag, ti) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${a.bg} border ${a.border} ${a.text} ${ti >= 2 ? "hidden sm:inline-flex" : ""}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View more + mobile arrows on same row */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setModalOpen(true)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r ${a.from} ${a.to} text-white text-sm font-bold shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200`}
                      >
                        View More
                        <ChevronRight size={15} />
                      </button>

                      {/* Mobile-only inline arrows */}
                      <div className="flex gap-2 ml-auto lg:hidden">
                        <button
                          onClick={prev}
                          className="w-9 h-9 rounded-full bg-white/8 border border-white/15 text-white flex items-center justify-center active:scale-95"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={next}
                          className="w-9 h-9 rounded-full bg-white/8 border border-white/15 text-white flex items-center justify-center active:scale-95"
                          aria-label="Next"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image — first in DOM = TOP on mobile, RIGHT on desktop */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`img-${index}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.07 }}
                      className={`relative flex items-center justify-center p-4 sm:p-6 lg:p-12 h-48 sm:h-56 lg:h-auto border-b lg:border-b-0 lg:border-l ${a.border}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`w-48 h-48 lg:w-72 lg:h-72 rounded-full ${a.glow} blur-3xl`} />
                      </div>
                      <div className="relative h-full w-full max-w-50 sm:max-w-60 lg:max-w-sm">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop-only floating arrows */}
            <button
              onClick={prev}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-7 w-12 h-12 rounded-full bg-navy-800 border border-white/15 hover:border-white/40 text-white items-center justify-center transition-all duration-200 shadow-xl hover:scale-110"
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-7 w-12 h-12 rounded-full bg-navy-800 border border-white/15 hover:border-white/40 text-white items-center justify-center transition-all duration-200 shadow-xl hover:scale-110"
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots + counter */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-2.5">
              {services.map((svc, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? `w-8 h-2.5 ${svc.accent.dot}`
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-blue-400/50 text-xs font-medium tracking-widest">
              {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ServiceModal service={s} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
