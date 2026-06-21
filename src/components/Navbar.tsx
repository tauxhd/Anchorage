"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Anchor, ArrowRight,
  Building2, Layers, Star, Users, Phone, Mail,
} from "lucide-react";

const navLinks = [
  { href: "#about",        label: "About",        icon: Building2, desc: "Our story & team"   },
  { href: "#services",     label: "Services",     icon: Layers,    desc: "What we offer"      },
  { href: "#values",       label: "Our Values",   icon: Star,      desc: "What drives us"     },
  { href: "#who-we-serve", label: "Who We Serve", icon: Users,     desc: "Our clients"        },
  { href: "#contact",      label: "Contact",      icon: Phone,     desc: "Reach out to us"    },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fix: prevent default so AnimatePresence exit doesn't race with
     the browser's anchor scroll. Scroll manually after close animation. */
  function handleNav(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280); // slightly longer than the 250ms exit animation
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        bg-navy-900/95 backdrop-blur-md
        ${scrolled
          ? "lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-lg lg:shadow-slate-900/8 lg:border-b lg:border-slate-200/60"
          : "lg:bg-transparent lg:backdrop-blur-sm lg:border-b lg:border-transparent"
        }
      `}
    >
      {/* Desktop scroll accent line */}
      <div className={`hidden lg:block absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/60 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 h-16 ${scrolled ? "lg:h-16" : "lg:h-20"}`}>

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className={`relative shrink-0 transition-all duration-500 ${scrolled ? "lg:w-9 lg:h-9" : "lg:w-11 lg:h-11"} w-9 h-9`}>
              <Image src="/logo.png" alt="Anchorage BTS" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className={`font-extrabold transition-all duration-500 ${scrolled ? "lg:text-navy-800 lg:text-sm" : "lg:text-white lg:text-base"} text-white text-sm`}>
                Anchorage
              </p>
              <p className={`text-xs transition-all duration-500 font-medium ${scrolled ? "lg:text-blue-600" : "lg:text-blue-300"} text-blue-300`}>
                Business &amp; Transport Services
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group
                  ${scrolled ? "text-slate-600 hover:text-navy-800 hover:bg-slate-100" : "text-white/85 hover:text-white hover:bg-white/10"}`}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
            <a
              href="#contact"
              className={`ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5
                ${scrolled ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25" : "bg-white/15 hover:bg-white/25 text-white border border-white/25 shadow-none backdrop-blur-sm"}`}
            >
              <Anchor size={14} />
              Get in Touch
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            {/* Menu panel */}
            <div className="relative bg-navy-900 border-t border-white/10">
              {/* Subtle hex bg */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hex-nav" width="40" height="34" patternUnits="userSpaceOnUse">
                    <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hex-nav)" />
              </svg>

              <div className="relative px-4 py-4 space-y-1">

                {/* Nav links */}
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.2 }}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/8 active:bg-white/12 transition-colors group"
                  >
                    {/* Icon bubble */}
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/25 transition-colors">
                      <link.icon size={16} className="text-blue-400" />
                    </div>
                    {/* Label + desc */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm leading-tight">{link.label}</p>
                      <p className="text-blue-300/50 text-xs mt-0.5">{link.desc}</p>
                    </div>
                    <ArrowRight size={15} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200" />
                  </motion.a>
                ))}

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="h-px bg-white/8 my-3"
                />

                {/* Quick contact pills */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.2 }}
                  className="grid grid-cols-2 gap-2 pb-1"
                >
                  <a
                    href="mailto:info@anchoragebts.com.pg"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/6 border border-white/10 hover:bg-white/12 transition-colors"
                  >
                    <Mail size={13} className="text-blue-400 shrink-0" />
                    <span className="text-blue-200/80 text-xs font-medium truncate">Email Us</span>
                  </a>
                  <a
                    href="tel:+675XXXXXXXX"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/6 border border-white/10 hover:bg-white/12 transition-colors"
                  >
                    <Phone size={13} className="text-blue-400 shrink-0" />
                    <span className="text-blue-200/80 text-xs font-medium truncate">Call Us</span>
                  </a>
                </motion.div>

                {/* CTA button */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNav(e, "#contact")}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.2 }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-blue-900/40"
                >
                  <Anchor size={15} />
                  Get in Touch
                </motion.a>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
