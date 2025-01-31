"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Menu,
  LogOut,
  Building2,
  Users,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";
const menuItems = [
  { icon: Users, label: "User Management", href: "/user-management" },
  { icon: Building2, label: "Law Firms", href: "/law-firm" },
  { icon: Landmark, label: "Corporate Firms", href: "/corporate-firm" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-gray-200 text-gray-800 transition-all duration-300 ease-in-out flex flex-col",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {expanded && <h2 className="text-xl font-bold">Lejit AI </h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-800 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex-grow mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center py-2 px-4 transition-colors duration-200",
              pathname === item.href ? "bg-gray-100" : "hover:bg-gray-100",
              !expanded && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5" />
            {expanded && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-800 hover:bg-gray-100",
            !expanded && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {expanded && <span className="ml-4">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
