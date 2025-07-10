'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { ModeToggle } from "./toggle-theme"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import PrimaryLogo from "./primary-logo"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/lien-he", label: "Liên hệ" }
  ]

  const authLinks = [
    { href: "/dang-nhap", label: "Đăng nhập" },
    { href: "/dang-ky", label: "Đăng ký" }
  ]

  return (
    <nav className={cn(
      "sticky top-0 z-50 bg-background shadow-lg shadow-black/10 dark:shadow-white/10 border-b transition-all duration-300",
      scrolled 
        ? "py-2 px-4 sm:px-6 md:px-10 lg:px-20" 
        : "py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10"
    )}>
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
        </div>

        {/* Mobile/Tablet Right Section */}
        <div className="flex lg:hidden items-center gap-3">
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

      {/* Mobile/Tablet Menu Overlay */}
      {mobileMenuOpen && (
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
                  Tài khoản
                </h3>
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Variable for navbar height */}
      <style jsx>{`
        :global(:root) {
          --navbar-height: ${scrolled ? '60px' : '70px'};
        }
      `}</style>
    </nav>
  )
}