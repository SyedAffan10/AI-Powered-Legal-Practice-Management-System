import * as React from "react";
import {
  AudioWaveform,
  Command,
  FolderOpen,
  GalleryVerticalEnd,
  Package,
  ScrollText,
  User,
  Users,
} from "lucide-react";

// import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { Calendar, ChartColumnBig, Home, Logs, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
// This is sample data.

const teams = [
  {
    name: "Firm Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Firm Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

const items = [
  {
    title: "Dashboard",
    url: "/super-admin",
    icon: Home,
  },
  // {
  //   title: "Tasks",
  //   url: "/super-admin/tasks",
  //   icon: Logs,
  // },
  {
    title: "Agencies",
    url: "/super-admin/agencies",
    icon: Calendar,
  },
  // {
  //   title: "Payments",
  //   url: "/super-admin/Payments",
  //   icon: Banknote,
  // },
  {
    title: "Analytics",
    url: "/super-admin/analytics",
    icon: ChartColumnBig,
  },
  {
    title: "Packages",
    url: "/super-admin/packages",  
    icon: Package ,
  },
  {
    title: "Settings",
    url: "/super-admin/settings",
    icon: Settings,
  },
];

const agencyItems = [
  {
    title: "Dashboard",
    url: "/agency",
    icon: Home,
  },
  {
    title: "Subscription",
    url: "/agency/subscription",
    icon: Logs,
  },
  {
    title: "Agents",
    url: "/agency/agents",
    icon: User,
  },
  {
    title: "Matters",
    url: "/agency/matters",
    icon: FolderOpen,
  },
  {
    title: "Tasks",
    url: "/agency/tasks",
    icon: Logs,
  },
  {
    title: "Clients",
    url: "/agency/clients",
    icon: Users,
  },
];
const clientItems = [
  {
    title: "Dashboard",
    url: "/client",
    icon: Home,
  },

  {
    title: "Matters",
    url: "/client/matters",
    icon: FolderOpen,
  },
  {
    title: "Documents",
    url: "/client/documents",
    icon: ScrollText,
  },
  {
    title: "Logs",
    url: "/client/logs",
    icon: Logs,
  },
];
const agentItems = [
  {
    title: "Dashboard",
    url: "/agent",
    icon: Home,
  },

  {
    title: "Matters",
    url: "/agent/matters",
    icon: FolderOpen,
  },
  {
    title: "Documents",
    url: "/agent/documents",
    icon: ScrollText,
  },
  {
    title: "Tasks",
    url: "/agent/logs",
    icon: Logs,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = localStorage.getItem("role");
  const { pathname } = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="h-full border-r-sidebar-border"
    >
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {role == "super-admin" &&
                items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className={cn(
                        pathname === item.url ? "bg-white text-black" : ""
                      )}
                    >
                      <Link to={item.url.toLocaleLowerCase()}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {role == "agency" &&
                agencyItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className={cn(
                        pathname === item.url ? "bg-white text-black" : ""
                      )}
                    >
                      <Link to={item.url.toLocaleLowerCase()}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {role == "client" &&
                clientItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className={cn(
                        pathname === item.url ? "bg-white text-black" : ""
                      )}
                    >
                      <Link to={item.url.toLocaleLowerCase()}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {role == "agent" &&
                agentItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className={cn(
                        pathname === item.url ? "bg-white text-black" : ""
                      )}
                    >
                      <Link to={item.url.toLocaleLowerCase()}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter> 
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
