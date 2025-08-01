"use client";

import { cn } from "@/lib/utils";
import { Menu, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationBell from "./notification-bell";
import PrimaryLogo from "./primary-logo";
import { ModeToggle } from "./toggle-theme";
import UserSettingsModal from "./user-settings-modal";
import Avatar from "./avatar";

interface LinkType {
  href: string;
  label: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock authentication state
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Mock user data
  const mockUser = {
    name: "Khánh Bảo",
    email: "kbaooo@example.com",
    avatar: "",
    role: "ADMIN" as const,
  };

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks: LinkType[] = [
    { href: "/", label: "Trang chủ" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/lien-he", label: "Liên hệ" },
    { href: "/admin", label: "Admin" }, // Only show if user is admin through auth middleware
  ];

  const authLinks: LinkType[] = [
    { href: "/dang-nhap", label: "Đăng nhập" },
    { href: "/dang-ky", label: "Đăng ký" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-background shadow-lg shadow-black/10 dark:shadow-white/10 border-b transition-all duration-300",
        scrolled
          ? "py-2 px-4 sm:px-6 md:px-10 lg:px-20"
          : "py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10"
      )}
    >
      <div className="flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <PrimaryLogo />

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm xl:text-base hover:text-primary transition-colors",
                pathname === link.href && "text-primary font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {pathname !== "/portfolio" && <ModeToggle />}

          {/* Notification Bell và User Controls (chỉ hiện khi đã đăng nhập) */}
          {isMounted && isLoggedIn ? (
            <div className="flex items-center gap-3">
              <NotificationBell />

              {/* User Avatar & Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowUserSettings(true)}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Avatar
                      name={mockUser.name}
                      avatarUrl={mockUser.avatar}
                      size="sm"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {mockUser.name}
                  </span>
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ) : isMounted && !isLoggedIn ? (
            /* Auth Links khi chưa đăng nhập */
            <div className="flex xl:gap-3">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center justify-center px-4 py-2 rounded-md border transition-colors text-sm font-medium",
                    link.href === "/dang-nhap"
                      ? "border-input hover:bg-accent hover:text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* Mobile/Tablet Right Section */}
        <div className="flex lg:hidden items-center gap-3">
          {isMounted && isLoggedIn && <NotificationBell />}
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* User Settings Modal */}
      {isMounted && (
        <UserSettingsModal
          isOpen={showUserSettings}
          onClose={() => setShowUserSettings(false)}
          user={mockUser}
        />
      )}

      {/* Mobile/Tablet Menu Overlay */}
      {isMounted && mobileMenuOpen && (
        <div className="fixed inset-0 top-[var(--navbar-height,70px)] bg-background/95 backdrop-blur-sm lg:hidden z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Menu
                </h3>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium hover:text-primary transition-colors py-2",
                      pathname === link.href && "text-primary font-bold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth Links */}
              <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {isLoggedIn ? "Tài khoản" : "Đăng nhập"}
                </h3>

                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {mockUser.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {mockUser.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowUserSettings(true)}
                      className="w-full flex items-center space-x-2 p-3 hover:bg-accent rounded-lg transition-colors text-left"
                    >
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <span>Cài đặt tài khoản</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {authLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "inline-flex items-center justify-center px-4 py-2 rounded-md border transition-colors text-sm font-medium",
                          link.href === "/dang-nhap"
                            ? "border-input hover:bg-accent hover:text-accent-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Variable for navbar height */}
      <style jsx>{`
        :global(:root) {
          --navbar-height: ${scrolled ? "60px" : "70px"};
        }
      `}</style>
    </nav>
  );
}
