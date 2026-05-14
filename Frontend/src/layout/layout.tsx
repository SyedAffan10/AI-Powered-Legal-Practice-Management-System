// import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProtectedRoute from "@/hooks/protected-route";

// import { AppSidebar } from "@/components/app-sidebar"

export default function Layout() {
  return (
    <div className="bg-sidebar text-foreground">
      <Header />
      <SidebarProvider className="">
        <AppSidebar />
        <SidebarTrigger />
        <main className="grow mt-16 px-2 bg-sidebar overflow-x-hidden text-foreground">
          <ProtectedRoute />
        </main>
      </SidebarProvider>
    </div>
  );
}
