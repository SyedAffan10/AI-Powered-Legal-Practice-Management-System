import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns, IAgents } from "./_components/columns";

const agents: IAgents[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    noOfActiveCases: 5,
    contact: "123-456-7890",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    noOfActiveCases: 8,
    contact: "234-567-8901",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    noOfActiveCases: 3,
    contact: "345-678-9012",
  },
  {
    id: "4",
    name: "Robert Brown",
    email: "robertbrown@example.com",
    noOfActiveCases: 6,
    contact: "456-789-0123",
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    noOfActiveCases: 7,
    contact: "567-890-1234",
  },
  {
    id: "6",
    name: "Michael Wilson",
    email: "michaelwilson@example.com",
    noOfActiveCases: 4,
    contact: "678-901-2345",
  },
  {
    id: "7",
    name: "Sarah Miller",
    email: "sarahmiller@example.com",
    noOfActiveCases: 9,
    contact: "789-012-3456",
  },
];




  
//   console.log(Subscription);
  
function Agents() {
  return (
    <div>
        <BreadCrumbPage title="Agents" />
        <DataTable columns={columns} data={agents} />
    </div>
  )
}

export default Agents