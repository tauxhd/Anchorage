"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Anchor, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "#about",        label: "About"        },
  { href: "#services",     label: "Services"     },
  { href: "#values",       label: "Our Values"   },
  { href: "#who-we-serve", label: "Who We Serve" },
  { href: "#contact",      label: "Contact"      },
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

  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        /* ── mobile: always dark ── */
        bg-navy-900/95 backdrop-blur-md
        /* ── desktop: transparent → white ── */
        ${scrolled
          ? "lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-lg lg:shadow-slate-900/8 lg:border-b lg:border-slate-200/60"
          : "lg:bg-transparent lg:backdrop-blur-sm lg:border-b lg:border-transparent"
        }
      `}
    >
      {/* Top accent line — only visible when scrolled on desktop */}
      <div
        className={`hidden lg:block absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/60 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 h-16 ${scrolled ? "lg:h-16" : "lg:h-20"}`}
        >

          {/* ── Logo ─────────────────────────────────────────────── */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div
              className={`relative shrink-0 transition-all duration-500 ${scrolled ? "lg:w-9 lg:h-9" : "lg:w-11 lg:h-11"} w-9 h-9`}
            >
              <Image
                src="/logo.png"
                alt="Anchorage BTS"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p
                className={`font-extrabold transition-all duration-500 ${scrolled ? "lg:text-navy-800 lg:text-sm" : "lg:text-white lg:text-base"} text-white text-sm`}
              >
                Anchorage
              </p>
              <p
                className={`text-xs transition-all duration-500 font-medium ${scrolled ? "lg:text-blue-600" : "lg:text-blue-300"} text-blue-300`}
              >
                Business &amp; Transport Services
              </p>
            </div>
          </a>

          {/* ── Desktop nav ──────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group
                  ${scrolled
                    ? "text-slate-600 hover:text-navy-800 hover:bg-slate-100"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.label}
                {/* Underline indicator */}
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left`}
                />
              </a>
            ))}

            <a
              href="#contact"
              className={`ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5
                ${scrolled
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/25 shadow-none backdrop-blur-sm"
                }
              `}
            >
              <Anchor size={14} />
              Get in Touch
            </a>
          </nav>

          {/* ── Mobile hamburger ─────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-navy-900"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-blue-100 hover:text-white hover:bg-white/8 rounded-xl transition-colors"
                >
                  {link.label}
                  <ChevronDown size={14} className="opacity-40 -rotate-90" />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={close}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
              >
                <Anchor size={15} />
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
