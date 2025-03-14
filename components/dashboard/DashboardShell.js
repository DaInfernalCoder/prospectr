"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart2, Settings } from "lucide-react";
import ButtonLinkedin from "@/components/ButtonLinkedin";
import { useLinkedIn } from "@/components/contexts/LinkedInContext";

const navigationLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/campaigns",
    label: "Campaigns",
    icon: Users,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart2,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const { linkedInStatus } = useLinkedIn();

  return (
    <div className="min-h-screen bg-black text-white" suppressHydrationWarning>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#0F0F0F] border-r border-[#1A1A1A]">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-white text-lg font-medium tracking-tight">Prospectr</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navigationLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive ? "bg-[#1A1A1A] text-white" : "text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]" />
              <div className="flex-1 truncate">user@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="flex items-center justify-between h-16 px-6 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium tracking-tight">{getPageTitle(pathname)}</h1>
          </div>
          <div className="flex items-center gap-3">
            {!linkedInStatus.connected && pathname !== "/dashboard/settings" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-amber-400">LinkedIn not connected</span>
                <ButtonLinkedin variant="outline" text="Connect" className="btn-sm rounded-md" />
              </div>
            )}
          </div>
        </header>
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

// Helper function to get page title based on pathname
function getPageTitle(pathname) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname === "/dashboard/campaigns") return "Campaigns";
  if (pathname === "/dashboard/analytics") return "Analytics";
  if (pathname === "/dashboard/settings") return "Settings";
  
  // Extract the last part of the pathname as a fallback
  const segments = pathname.split("/");
  return segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1);
}
