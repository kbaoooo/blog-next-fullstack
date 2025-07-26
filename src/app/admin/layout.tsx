

import { ThemeProvider } from "@/components/custom/theme-provider";
import SidebarAdmin from "./components/sidebar-admin"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="bg-black-900 flex min-h-screen">
        <SidebarAdmin />
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-card border-b border-primary/20 h-16 flex items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400">
                Quản lý nội dung blog
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Chào mừng, <span className="font-medium text-primary">Khanh Bao</span>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-black-500/50 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}