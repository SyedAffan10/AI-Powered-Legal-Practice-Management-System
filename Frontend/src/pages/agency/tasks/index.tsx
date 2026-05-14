import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns, ITasks } from "./_components/columns";
// import { ITasks } from "../subscription/_components/columns";
const tasks: ITasks[] = [
    {
      id: "1",
      taskName: "Gather Evidence",
      agentName: "John Doe",
      caseName: "Cyber Fraud Investigation",
      status: "Active",
    },
    {
      id: "2",
      taskName: "Interview Witnesses",
      agentName: "Jane Smith",
      caseName: "Property Dispute",
      status: "Inactive",
    },
    {
      id: "3",
      taskName: "Analyze Bank Records",
      agentName: "Alice Johnson",
      caseName: "Financial Scam",
      status: "Active",
    },
    {
      id: "4",
      taskName: "Conduct Surveillance",
      agentName: "Robert Brown",
      caseName: "Corporate Espionage",
      status: "Active",
    },
    {
      id: "5",
      taskName: "Prepare Report",
      agentName: "Emily Davis",
      caseName: "Insurance Fraud",
      status: "Inactive",
    },
  ];
  
function AgencyTasks() {
  return (
    <div>
    <BreadCrumbPage title="Tasks" />
    <DataTable columns={columns} data={tasks} />
</div>
  )
}

export default AgencyTasks