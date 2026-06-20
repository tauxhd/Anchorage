"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import toast, { Toaster } from "react-hot-toast";
import {
  MapPin, Mail, Phone, Building2, Home,
  Clock, ShieldCheck, ArrowRight, CheckCircle2,
  Send, Sparkles,
} from "lucide-react";

/* ── Data ────────────────────────────────────────────────────────────── */
const contactDetails = [
  { icon: Mail,      label: "Email",    value: "info@anchoragebts.com.pg",                     href: "mailto:info@anchoragebts.com.pg" },
  { icon: Phone,     label: "Phone",    value: "+675 XXX XXXX",                                 href: "tel:+675XXXXXXXX"                },
  { icon: Building2, label: "Business", value: "Anchorage Business and Transport Services",      href: "#"                               },
  { icon: Home,      label: "Postal",   value: "P.O. Box 505, Waterfront, NCD",                 href: "#"                               },
  { icon: MapPin,    label: "Office",   value: "Section 231, Lot 7, Iarogaha St, Tokarara, NCD",href: "#"                               },
];

const services = [
  "Truck & Vehicle Leasing",
  "Garbage Collection & Removals",
  "Financial & Business Advisory",
  "PMV Transport Services",
  "Travel & Advisory Services",
  "General Enquiry",
];

const trustBadges = [
  { icon: Clock,        label: "Available 24 / 7"  },
  { icon: ShieldCheck,  label: "Local PNG Business" },
  { icon: CheckCircle2, label: "Fast Response"      },
];

/* ── Input styling ───────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inp =
  "w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 hover:border-blue-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200";

/* ── Component ───────────────────────────────────────────────────────── */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll be in touch within 24 hours.", {
        duration: 4000,
        style: {
          background: "#0b2461",
          color: "#fff",
          border: "1px solid rgba(75,143,212,0.3)",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "600",
        },
        iconTheme: { primary: "#4b8fd4", secondary: "#fff" },
      });
      (e.target as HTMLFormElement).reset();
    }, 1200);
  }

  return (
    <section id="contact" className="relative py-12 lg:py-28 bg-white overflow-hidden" ref={ref}>
      <Toaster position="top-center" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-contact" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-contact)" />
        </svg>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-14 text-center"
        >
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Contact Us</p>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-navy-800 leading-tight">
            Let&apos;s Work{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">
              Together
            </span>
          </h2>
          <p className="text-slate-500 text-sm lg:text-base mt-2 lg:mt-3 max-w-xl mx-auto">
            Reach out for transport, leasing, waste removal, or business advisory enquiries.
          </p>
        </motion.div>

        {/* ── Mobile-only: compact contact pills ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:hidden grid grid-cols-2 gap-3 mb-6"
        >
          {[
            { icon: Mail,  label: "Email Us",  value: "info@anchoragebts.com.pg", href: "mailto:info@anchoragebts.com.pg" },
            { icon: Phone, label: "Call Us",   value: "+675 XXX XXXX",             href: "tel:+675XXXXXXXX"                },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 group-hover:bg-blue-600/20 flex items-center justify-center shrink-0 transition-colors">
                <item.icon size={16} className="text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                <p className="text-slate-700 text-xs font-semibold truncate">{item.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Info card — desktop only ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:block lg:col-span-2"
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.07} glareColor="#4b8fd4" className="w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/20">
                <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-blue-700" />
                <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hex-ci" width="40" height="34" patternUnits="userSpaceOnUse">
                      <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hex-ci)" />
                </svg>
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-600/20 blur-xl pointer-events-none" />

                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Anchorage BTS</span>
                  </div>
                  <h3 className="text-white font-extrabold text-2xl leading-snug mb-1">Get in Touch</h3>
                  <p className="text-blue-200/60 text-sm mb-7">Based in Port Moresby and here to help.</p>

                  <ul className="space-y-4 mb-7">
                    {contactDetails.map((item, i) => (
                      <motion.li key={item.label} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}>
                        <a href={item.href} className="flex items-start gap-3 group">
                          <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-blue-500/30 flex items-center justify-center shrink-0 transition-colors duration-200">
                            <item.icon size={14} className="text-blue-300" />
                          </div>
                          <div>
                            <p className="text-blue-300/60 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                            <p className="text-white/90 text-sm font-medium leading-snug group-hover:text-blue-200 transition-colors">{item.value}</p>
                          </div>
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="h-px bg-white/10 mb-5" />

                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-emerald-300 text-xs font-bold">We&apos;re Available Now</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {trustBadges.map(({ icon: Icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3 py-1 text-xs text-blue-200/80 font-medium">
                        <Icon size={11} className="text-blue-400" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Form — full width on mobile, 3 cols on desktop ─────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 col-span-full"
          >
            <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">

              {/* Form header */}
              <div className="px-5 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <Send size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-navy-800 font-extrabold text-base sm:text-lg">Send Us a Message</h3>
                    <p className="text-slate-400 text-xs">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <form className="px-5 sm:px-8 py-5 sm:py-7 space-y-4" onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Field label="First Name">
                    <input type="text" placeholder="John" required className={inp} />
                  </Field>
                  <Field label="Last Name">
                    <input type="text" placeholder="Doe" required className={inp} />
                  </Field>
                </div>

                <Field label="Email">
                  <input type="email" placeholder="you@example.com" required className={inp} />
                </Field>

                {/* Phone field — desktop only to save mobile space */}
                <div className="hidden sm:block">
                  <Field label="Phone (optional)">
                    <input type="tel" placeholder="+675 XXX XXXX" className={inp} />
                  </Field>
                </div>

                <Field label="Service of Interest">
                  <select required className={`${inp} cursor-pointer`} defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="Message">
                  <textarea rows={3} placeholder="Tell us how we can help…" required className={`${inp} resize-none`} />
                </Field>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 text-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-slate-400 text-xs text-center">
                    Your details are kept private and never shared.
                  </p>
                </div>
              </form>
            </div>

            {/* Quick contact strip — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden sm:grid grid-cols-2 gap-3 mt-4"
            >
              {[
                { icon: Mail,  label: "Email directly",  value: "info@anchoragebts.com.pg", href: "mailto:info@anchoragebts.com.pg" },
                { icon: Phone, label: "Call us directly", value: "+675 XXX XXXX",             href: "tel:+675XXXXXXXX"                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 group-hover:bg-blue-600/20 flex items-center justify-center shrink-0 transition-colors">
                    <item.icon size={16} className="text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-slate-700 text-xs font-semibold truncate">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Map ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 lg:mt-14"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-slate-100 shadow-xl shadow-slate-200/60">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-4 bg-white border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-navy-800 font-extrabold text-sm">Our Location</p>
                  <p className="text-slate-400 text-xs">Section 231, Lot 7, Iarogaha Street, Tokarara, NCD</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=-9.463,147.174"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors shrink-0"
              >
                Open in Google Maps
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Map iframe */}
            <div className="h-64 sm:h-80 lg:h-96 w-full">
              <iframe
                src="https://maps.google.com/maps?q=-9.463,147.174&z=16&t=m&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Anchorage BTS office location"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
