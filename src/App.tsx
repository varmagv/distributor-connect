import { Routes, Route, Link } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "@/pages/dashboard";
import Planner from "@/pages/planner";
import DistributorsIndex from "@/pages/distributors-index";
import Distributor360 from "@/pages/distributor-detail";
import Mapping from "@/pages/mapping";
import VRM from "@/pages/vrm";
import Notifications from "@/pages/notifications";

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar />
          <main className="flex-1 p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/distributors" element={<DistributorsIndex />} />
              <Route path="/distributors/:id" element={<Distributor360 />} />
              <Route path="/mapping" element={<Mapping />} />
              <Route path="/vrm" element={<VRM />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-right" />
    </>
  );
}
