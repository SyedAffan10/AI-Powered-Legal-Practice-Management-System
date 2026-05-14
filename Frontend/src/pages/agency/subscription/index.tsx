import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns, ISubscription } from "./_components/columns";

const Subs: ISubscription[] = [
  {
    id: "1",
    duration: "1 month",
    activeStatus: true,
    noOfAgents: 20,
    noOfCasesPerAgent: 2.5,
  },
  {
    id: "2",
    duration: "3 months",
    activeStatus: true,
    noOfAgents: 40,
    noOfCasesPerAgent: 3,
  },
  {
    id: "3",
    duration: "6 months",
    activeStatus: false,
    noOfAgents: 60,
    noOfCasesPerAgent: 3.3,
  },
  {
    id: "4",
    duration: "9 months",
    activeStatus: true,
    noOfAgents: 80,
    noOfCasesPerAgent: 3.1,
  },
  {
    id: "5",
    duration: "12 months",
    activeStatus: false,
    noOfAgents: 100,
    noOfCasesPerAgent: 3,
  },
  {
    id: "6",
    duration: "18 months",
    activeStatus: true,
    noOfAgents: 120,
    noOfCasesPerAgent: 3.3,
  },
  {
    id: "7",
    duration: "24 months",
    activeStatus: false,
    noOfAgents: 150,
    noOfCasesPerAgent: 3.4,
  },
];


  
function Subscription() {
  return (
    <div>
        <BreadCrumbPage title="Subscription" />
        <DataTable columns={columns} data={Subs} />
    </div>
  )
}

export default Subscription