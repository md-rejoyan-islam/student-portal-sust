"use client";

import { logoutAction } from "@/app/actions/auth-actions";
import logo from "@/public/logo.png";
import { StudentProfile } from "@/types";
import {
    Bell,
    BookOpen,
    ChevronDown,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    User,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
    user: StudentProfile;
}

export const Header = ({ user }: HeaderProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  const menuItems = [
    { name: "Home", icon: LayoutDashboard, path: "/" },
    { name: "My Courses", icon: BookOpen, path: "/courses" },
    { name: "Enrollment", icon: GraduationCap, path: "/enrollment" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = () => {
    setIsMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link
              href="/"
              className="flex items-center gap-2.5 md:gap-3 cursor-pointer group"
            >
              <div className="">
                <Image
                  src={logo}
                  alt="SUST EEE Logo"
                  width={120}
                  height={120}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </div>
              <div className="block">
                <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900">
                  SUST EEE
                </span>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-medium -mt-0.5">
                  Student Portal
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive(item.path)
                      ? "bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-500/25"
                      : "text-slate-600 bg-slate-50/90 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon
                    size={16}
                    className={
                      isActive(item.path)
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                <Bell size={18} />
              </button>
              <div className="h-8 w-px bg-slate-200"></div>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  className="flex items-center gap-2.5 group focus:outline-none p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-transform group-hover:scale-105">
                    {user?.first_name?.[0] || "U"}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-slate-800">
                      {user?.first_name || "User"}
                    </p>
                    <p className="text-[10px] text-slate-400">Student</p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-4 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="mb-3 pb-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-800">
                        {user?.first_name || ""} {user?.last_name || ""}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail size={11} className="text-slate-400" />
                        <p className="text-[10px] font-medium text-slate-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <User size={15} />
                        <span className="text-xs font-semibold">
                          My Profile
                        </span>
                      </Link>
                      <button
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={15} />
                        <span className="text-xs font-semibold">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-slate-950 bg-slate-100 rounded-lg relative z-70"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 border-t  top-16 bg-white z-60 transition-all duration-300 md:hidden ${
          isMobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="p-6 h-full bg-white overflow-y-auto">
          <div className="pb-5 mb-5 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
              Navigation
            </p>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNav}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1.5 ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-800 hover:bg-slate-50 border border-slate-100 font-medium"
                }`}
              >
                <item.icon size={16} />
                <span className="text-[11px] uppercase tracking-wide font-semibold">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
              Account
            </p>
            <button
              onClick={async () => {
                handleNav();
                await handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold rounded-xl bg-red-50/50 hover:bg-red-50 transition-all text-[11px] uppercase tracking-wide"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
