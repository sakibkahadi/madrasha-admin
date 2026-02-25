// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  School,
  Settings,
  Users,
  FileText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Madrasa Subscriptions",
    href: "/dashboard/madrasa-subscriptions",
    icon: School,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();
  
  // Determine width class based on collapse state
  const sidebarWidthClass = isCollapsed ? "w-16" : "w-64";
  
  return (
    <div className={`${sidebarWidthClass} border-r bg-background flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300`}>
      <div className="py-4 space-y-2">
        <div className="px-3 pb-2">
          {!isCollapsed && (
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
          )}
          <div className="space-y-1">
            <TooltipProvider>
              {mainNavItems.map((item) => (
                isCollapsed ? (
                  <Tooltip key={item.href} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex justify-center items-center py-2 rounded-md",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.title}
                  </Link>
                )
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}