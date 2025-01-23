"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart2, Settings } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-black text-white" suppressHydrationWarning>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-black border-r border-neutral-800">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/dashboard" className="flex items-center">
              <img src="/icon.png" alt="Prospectr" className="h-8 w-auto" />
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
                    isActive ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-neutral-800">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-400">
              <div className="w-8 h-8 rounded-full bg-neutral-800" />
              <div className="flex-1 truncate">user@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="flex items-center justify-between h-16 px-6 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-2 py-1 text-sm text-neutral-400 hover:text-white">Feedback</button>
            <button className="px-2 py-1 text-sm text-neutral-400 hover:text-white">Help</button>
            <button className="px-2 py-1 text-sm text-neutral-400 hover:text-white">Docs</button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
