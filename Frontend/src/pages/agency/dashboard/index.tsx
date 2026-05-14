// import Breadcrumb from "@/components/ui/breadcrumb"
import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import DashboardCard from "@/components/ui/dashboard-card"
import { ScrollText, Users } from "lucide-react"

function AgencyDashboard() {
  return (
    <div>
     <BreadCrumbPage title="Dashboard" />
    <div className="p-2 flex flex-wrap gap-4" >
    <DashboardCard title="Total Agents" total="20" icon={<Users size={30} />} />
    <DashboardCard title="Matters" total="4" icon={<ScrollText size={30} />} />
    </div>
   </div>
  )
}

export default AgencyDashboard