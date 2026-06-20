import Image from "next/image";
import { MapPin, Mail, Phone, Anchor } from "lucide-react";

const navLinks = [
  { href: "#about",        label: "About Us"      },
  { href: "#services",     label: "Services"      },
  { href: "#values",       label: "Core Values"   },
  { href: "#who-we-serve", label: "Who We Serve"  },
  { href: "#contact",      label: "Contact"       },
];

const services = [
  { href: "#services", label: "Vehicle Leasing"    },
  { href: "#services", label: "Waste Removal"      },
  { href: "#services", label: "Business Advisory"  },
  { href: "#services", label: "PMV Transport"      },
  { href: "#services", label: "Travel Services"    },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">

      {/* ── Main grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 lg:w-11 lg:h-11 shrink-0">
                <Image src="/logo.png" alt="Anchorage BTS" fill className="object-contain" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Anchorage</p>
                <p className="text-blue-300 text-xs leading-tight">Business &amp; Transport Services</p>
              </div>
            </div>

            {/* Long tagline — desktop only */}
            <p className="hidden lg:block text-blue-100/55 text-sm leading-relaxed">
              Reliable Solutions in Transport, Leasing, Waste Removal and Business Support.
              Port Moresby, Papua New Guinea.
            </p>

            {/* Short tagline — mobile only */}
            <p className="lg:hidden text-blue-100/50 text-xs">
              Port Moresby, Papua New Guinea.
            </p>

            <div className="flex items-center gap-2 text-blue-100/40 text-xs">
              <Anchor size={12} className="text-blue-400 shrink-0" />
              <span>Anchored in service excellence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 lg:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 lg:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-blue-100/55 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 lg:mb-4">
              Services
            </h4>
            <ul className="space-y-2 lg:space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-blue-100/55 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 lg:mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {/* Office address — always show */}
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-blue-100/55 text-xs sm:text-sm leading-snug">
                  Section 231, Lot 7, Iarogaha Street, Tokarara, NCD
                </span>
              </li>
              {/* Postal — desktop only */}
              <li className="hidden lg:flex items-start gap-2.5">
                <MapPin size={13} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-blue-100/55 text-sm leading-snug">
                  P.O. Box 505, Waterfront, NCD
                </span>
              </li>
              {/* Email */}
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <a
                  href="mailto:info@anchoragebts.com.pg"
                  className="text-blue-100/55 hover:text-white text-xs sm:text-sm transition-colors truncate"
                >
                  info@anchoragebts.com.pg
                </a>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-blue-400 shrink-0" />
                <a
                  href="tel:+675XXXXXXXX"
                  className="text-blue-100/55 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  +675 XXX XXXX
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3">
          <p className="text-blue-100/35 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Anchorage Business &amp; Transport Services. All rights reserved.
          </p>
          <p className="hidden sm:block text-blue-100/25 text-xs">
            Port Moresby, National Capital District, Papua New Guinea
          </p>
        </div>
      </div>

    </footer>
  );
}
