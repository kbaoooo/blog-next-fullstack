import Navbar from "@/components/custom/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "@/components/custom/theme-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background">
      <Navbar />
      <div >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </div>
      <Footer />
    </div>
  );
}