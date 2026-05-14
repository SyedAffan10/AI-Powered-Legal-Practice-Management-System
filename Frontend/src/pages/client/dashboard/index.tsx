// import Breadcrumb from "@/components/ui/breadcrumb"
import BreadCrumbPage from "@/components/ui/breadcrumb-app"

import DashboardCard from "@/components/ui/dashboard-card"
import { FileText, ScrollText } from "lucide-react"

function ClientDashboard() {
  return (
    <div>
     <BreadCrumbPage title="Dashboard" />
    <div className="p-2 flex flex-wrap gap-4" >
      <DashboardCard title="All Matters" total="20" icon={<ScrollText size={30} />} />
      <DashboardCard title="In Process Matters" total="34" icon={ <FileText size={30} />} />
      <DashboardCard title="Completed Matters" total="34" icon={ <FileText size={30} />} />
    </div>
   </div>
  )
}

export default ClientDashboard