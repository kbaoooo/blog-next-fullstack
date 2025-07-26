"use client";

import PrimaryLogo from "@/components/custom/primary-logo";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  PlusCircle, 
  BarChart3, 
  MessageSquare, 
  Image,
  UserCheck,
  ChevronDown,
  Home,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MenuItems {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  badge?: string | null;
  hasSubmenu?: boolean;
  submenu?: { href: string; label: string }[];
}

interface BottomMenuItems {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export default function SidebarAdmin() {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState({
    posts: false,
    users: false
  });

  const mainMenuItems: MenuItems[] = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
      badge: null
    },
    {
      href: "/admin/posts",
      icon: FileText,
      label: "Bài viết",
      badge: "12",
      hasSubmenu: true,
      submenu: [
        { href: "/admin/posts", label: "Tất cả bài viết" },
        { href: "/admin/posts/create", label: "Tạo bài viết mới" },
        { href: "/admin/posts/drafts", label: "Bản nháp" },
        { href: "/admin/posts/categories", label: "Danh mục" }
      ]
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "Người dùng",
      badge: "5",
      hasSubmenu: true,
      submenu: [
        { href: "/admin/users", label: "Tất cả người dùng" },
        { href: "/admin/users/admins", label: "Quản trị viên" },
        { href: "/admin/users/subscribers", label: "Người theo dõi" }
      ]
    },
    {
      href: "/admin/comments",
      icon: MessageSquare,
      label: "Bình luận",
      badge: "3"
    },
    {
      href: "/admin/categories",
      icon: Tag,
      label: "Categories & Tags",
      badge: null
    },
    {
      href: "/admin/media",
      icon: Image,
      label: "Thư viện ảnh",
      badge: null
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      label: "Thống kê",
      badge: null
    }
  ];

  const bottomMenuItems: BottomMenuItems[] = [
    {
      href: "/",
      icon: Home,
      label: "Về trang chủ"
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Cài đặt"
    },
    {
      href: "/logout",
      icon: LogOut,
      label: "Đăng xuất"
    }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black-200 to-black-400 text-white flex flex-col shadow-xl border-r border-primary/20">
      {/* Header with Logo */}
      <div className="p-6 border-b border-primary/30">
        <PrimaryLogo />
        <div className="mt-3">
          <h2 className="text-sm font-semibold text-gray-200">Admin Panel</h2>
          <p className="text-xs text-gray-400">Quản lý blog</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {mainMenuItems.map((item) => (
            <div key={item.href}>
              {item.hasSubmenu ? (
                <div
                  className="group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/20 cursor-pointer"
                  onClick={() => {
                    if (item.label === "Bài viết") setIsOpenSubMenu((prev) => ({ ...prev, posts: !prev.posts }));
                    if (item.label === "Người dùng") setIsOpenSubMenu((prev) => ({ ...prev, users: !prev.users }));
                  }}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="ml-3 text-gray-300 group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/30 text-primary border border-primary/40">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown 
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        (item.label === "Bài viết" && isOpenSubMenu.posts) ||
                        (item.label === "Người dùng" && isOpenSubMenu.users)
                          ? "rotate-180"
                          : ""
                      }`} 
                    />
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/20"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="ml-3 text-gray-300 group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/30 text-primary border border-primary/40">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {item.hasSubmenu && (
                <div className={`ml-8 mt-1 space-y-1 transition-all duration-200 ${
                  (item.label === "Bài viết" && isOpenSubMenu.posts) || 
                  (item.label === "Người dùng" && isOpenSubMenu.users)
                    ? "max-h-40 opacity-100" 
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}>
                  {item.submenu?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 px-3">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Thao tác nhanh
          </h3>
          <Link
            href="/admin/posts/create"
            className="flex items-center px-3 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-lg transition-all duration-200 group shadow-lg shadow-primary/25"
          >
            <PlusCircle className="h-4 w-4 mr-3" />
            Tạo bài viết mới
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-primary/30 p-3 space-y-1">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors group"
          >
            <item.icon className="h-4 w-4 mr-3 group-hover:text-primary" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-primary/30 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Khanh Bao</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}