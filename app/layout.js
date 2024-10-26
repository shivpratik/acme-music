import localFont from "next/font/local";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PlayerBar } from "@/components/player-bar";
import { Footer } from "@/components/footer";
import { PlaybackProvider } from "./playback-context";
import { Command, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Acme Music",
  description: "New Generation Music Player built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0">
            <PlaybackProvider>
              <div className="relative flex flex-1 flex-col">
                <div className="flex lg:hidden flex-row justify-between items-center p-1 bg-secondary">
                  <SidebarTrigger className="lg:hidden" />
                  <a className="flex flex-row items-center space-x-2" href="#">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Command className="size-3" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Acme Music</span>
                    </div>
                  </a>
                  <Button className="h-7 w-7" variant="ghost" size="icon">
                    <List className="size-4" />
                  </Button>
                </div>
                <PlayerBar />
                {children}
                <Footer />
              </div>
            </PlaybackProvider>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
