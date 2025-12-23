"use client";

import { FileText, Calendar, Send, FileBarChart, Settings, Users, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Cases", href: "/icj/cases", icon: FileText },
  { label: "Calendar", href: "/icj/calendar", icon: Calendar },
  { label: "Distributions", href: "/icj/distributions", icon: Send },
  { label: "Administrative and Judicial Meetings", href: "/icj/meetings", icon: Users },
  { label: "Reports", href: "/icj/reports", icon: FileBarChart },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-[#006FB7] text-white">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icj-logo.png"
                  alt="International Court of Justice"
                  height={34}
                  width={34}
                  priority
                />
                <span className="sr-only">International Court of Justice</span>
              </Link>
              <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                International Court of Justice
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-xs">
              <div className="font-medium">Registry Department</div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              {getInitials("User Admin")}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1800px] p-6">{children}</main>
    </div>
  );
}
