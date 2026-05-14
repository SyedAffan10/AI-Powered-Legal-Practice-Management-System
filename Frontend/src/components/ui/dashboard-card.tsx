// import { FileText } from "lucide-react";
import { ReactNode } from "react";

function DashboardCard({ title, total , icon }: { title: string; total: string; icon:ReactNode }) {
  return (
    <div className="w-[300px] h-[120px] shadow p-5 bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm mb-2">{title}</h1>
          <h4 className="text-3xl font-bold">{total}</h4>
        </div>
       {icon}
      </div>
      {/* <h6 className="text-xs ">+19% from last month</h6> */}
    </div>
  );
}

export default DashboardCard;
