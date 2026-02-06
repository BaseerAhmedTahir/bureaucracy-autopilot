import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter directly
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";

// Create the font instance
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bureaucracy Autopilot",
  description: "Automate your applications with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background min-h-screen antialiased")}>
        <div className="flex min-h-screen bg-background text-foreground">
          <AppSidebar />
          <div className="flex-1 flex flex-col ml-64 transition-all duration-300 ease-in-out">
            <AppHeader />
            <main className="p-6 flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
