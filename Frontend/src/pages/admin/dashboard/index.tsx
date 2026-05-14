// import Breadcrumb from "@/components/ui/breadcrumb"
import BreadCrumbPage from "@/components/ui/breadcrumb-app";
import DashboardCard from "@/components/ui/dashboard-card";
import { useGetUserQuery } from "@/services/auth/auth-api";
import { Users } from "lucide-react";
// import { useEffect } from "react";

function Dashboard() {
  const { data } = useGetUserQuery();
  // useEffect(() => {
  //   fetch();
  // }, []);
  console.log(data);
  return (
    <div>
      <BreadCrumbPage title="Dashboard" />
      <div className="p-2 flex flex-wrap gap-4">
        <DashboardCard
          title="Total Agencies"
          total="34"
          icon={<Users size={30} />}
        />
        <DashboardCard title="Agents" total="346" icon={<Users size={30} />} />
      </div>
    </div>
  );
}

export default Dashboard;
