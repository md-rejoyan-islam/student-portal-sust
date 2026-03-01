import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";

import logo from "@/public/logo.png";
import Image from "next/image";

const quickLinks = [
  { name: "Home", icon: LayoutDashboard, path: "/" },
  { name: "My Courses", icon: BookOpen, path: "/courses" },
  { name: "Enrollment", icon: GraduationCap, path: "/enrollment" },
  { name: "Profile", icon: User, path: "/profile" },
];

export const Footer = () => (
  <footer className="bg-linear-to-b from-slate-900 to-slate-950 text-white">
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="">
              <Image
                src={logo}
                alt="SUST EEE Logo"
                width={120}
                height={120}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">SUST EEE</span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Student Portal
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md mb-4">
            Official academic management system for the Department of Electrical
            and Electronic Engineering, Shahjalal University of Science and
            Technology.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center gap-2.5 text-xs md:text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <item.icon
                    size={14}
                    className="text-slate-500 group-hover:text-blue-400 transition-colors"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
            Contact
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-slate-500 mt-0.5 shrink-0" />
              <span className="text-xs md:text-sm text-slate-400">
                SUST, Sylhet-3114, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-slate-500 shrink-0" />
              <span className="text-xs md:text-sm text-slate-400">
                +880 xxxx xxxxxx
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-slate-500 shrink-0" />
              <span className="text-xs md:text-sm text-slate-400">
                eee@sust.edu
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-5 text-center">
        <p className="text-[10px] md:text-xs text-slate-500">
          © 2026 SUST EEE. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
