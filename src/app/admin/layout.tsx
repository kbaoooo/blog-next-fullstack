

import { ThemeProvider } from "@/components/custom/theme-provider";
import SidebarAdmin from "./components/sidebar-admin"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex">
      <SidebarAdmin />
      <div >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </div>
    </div>
  );
}