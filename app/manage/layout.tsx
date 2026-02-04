"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  Users,
  LogOut,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { useAdmin } from "@/lib/hooks/use-admin";
import { useAuth } from "@/lib/hooks/use-auth";

const navItems = [
  { href: "/manage", label: "Dashboard", icon: LayoutDashboard },
  { href: "/manage/products", label: "Products", icon: Package },
  { href: "/manage/orders", label: "Orders", icon: ShoppingCart },
  { href: "/manage/categories", label: "Categories", icon: FolderTree },
  { href: "/manage/customers", label: "Customers", icon: Users },
];

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only redirect after both auth and admin checks are complete
    if (!authLoading && !adminLoading) {
      if (!user || !isAdmin) {
        router.replace("/");
      } else {
        setChecked(true);
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, router]);

  // Show loading while checking auth/admin status
  if (authLoading || adminLoading || !checked) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
      </div>
    );
  }

  // Don't render if not authorized
  if (!user || !isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <Link href="/manage" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Doll Wigs" width={120} height={32} className="h-8 w-auto" />
            </Link>
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="text-sm text-gray-500 mb-2 truncate">{user.email}</div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu className="w-6 h-6 text-gray-400" />
          </button>
          <span className="text-white font-medium">Management</span>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
