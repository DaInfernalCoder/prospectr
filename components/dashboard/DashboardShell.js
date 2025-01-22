"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, BarChart2, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const navigationLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4 text-neutral-500" />,
  },
  {
    href: "/dashboard/campaigns",
    label: "Campaigns",
    icon: <Users className="w-4 h-4 text-neutral-500" />,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: <BarChart2 className="w-4 h-4 text-neutral-500" />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4 text-neutral-500" />,
  },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-neutral-800 dark:text-white px-2">
                Prospectr
              </h1>
            </div>
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <SidebarLink 
                  key={link.href} 
                  link={{
                    ...link,
                    icon: React.cloneElement(link.icon, {
                      className: `w-4 h-4 ${pathname === link.href ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'}`
                    })
                  }}
                  className={pathname === link.href ? 'text-neutral-900 dark:text-white' : ''}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
