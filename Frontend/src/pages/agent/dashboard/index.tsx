import BreadCrumbPage from "@/components/ui/breadcrumb-app";
import DashboardCard from "@/components/ui/dashboard-card";
import { FileText, ScrollText, Users } from "lucide-react";

function AgentDashboard() {
  return (
    <div>
      <BreadCrumbPage title="Dashboard" />
      <div className="p-2 flex flex-wrap gap-4">
      <DashboardCard title="All Matters" total="20" icon={<ScrollText size={30} />} />
      <DashboardCard title="In Process Matters" total="34" icon={ <FileText size={30} />} />
      <DashboardCard title="Completed Matters" total="34" icon={ <FileText size={30} />} />
      <DashboardCard title="Clients" total="3320" icon={ <Users  size={30} />} />
      </div>
      {/* <DashboardCard title="Cases" total="200" icon={<ScrollText size={30} />}  /> */}
    </div>
  );
}

export default AgentDashboard;
