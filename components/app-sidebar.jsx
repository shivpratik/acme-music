"use client";
import {
  Command,
  GalleryVerticalEnd,
  Grip,
  LayoutGridIcon,
  ListMusic,
  Mic2,
  Music2,
  PlayCircle,
  Radio,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

// Menu items.
const main = [
  {
    title: "Listen Now",
    url: "/listen-now",
    icon: PlayCircle,
  },
  {
    title: "Browse",
    url: "/browse",
    icon: LayoutGridIcon,
  },
  {
    title: "Radio",
    url: "#",
    icon: Radio,
  },
];

const library = [
  {
    title: "Artists",
    url: "#",
    icon: Mic2,
  },
  {
    title: "Albums",
    url: "#",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Songs",
    url: "#",
    icon: Music2,
  },
];

const playlists = [
  {
    title: "All Playlists",
    url: "#",
    icon: Grip,
  },
  {
    title: "90's Music",
    url: "#",
    icon: ListMusic,
  },
  {
    title: "Classical Music",
    url: "#",
    icon: ListMusic,
  },
];

export function AppSidebar() {
  const segment = useSelectedLayoutSegment();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Music</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            Apple Music
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === `/${segment}`}
                  >
                    <Link prefetch={true} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {library.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            Playlists
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {playlists.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
