import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns, IDocs } from "./_components/columns";

const docs: IDocs[] = [
    {
      id: "1",
      matterName: "Estate Dispute",
    },
    {
      id: "2",
      matterName: "Contract Breach",
    },
    {
      id: "3",
      matterName: "Intellectual Property Dispute",
    },
    {
      id: "4",
      matterName: "Personal Injury Claim",
    },
    {
      id: "5",
      matterName: "Employment Discrimination",
    },
    {
      id: "6",
      matterName: "Real Estate Litigation",
    },
    {
      id: "7",
      matterName: "Divorce Settlement",
    },
  ];
  


  
function ClientDocs() {
  return (
    <div>
        <BreadCrumbPage title="Documents" />
        <DataTable columns={columns} data={docs} />
    </div>
  )
}

export default ClientDocs