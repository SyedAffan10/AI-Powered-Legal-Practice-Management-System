import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns,ICase } from "./_components/columns";

const cases: ICase[] = [
  {
      id: "1",
      caseName: "Estate Dispute",
      startDate: "2024-01-15",
      clientName: "John Doe",
      email: "john.doe@example.com"
  },
  {
      id: "2",
      caseName: "Contract Breach",
      startDate: "2024-02-20",
      clientName: "Jane Smith",
      email: "jane.smith@example.com"
  },
  {
      id: "3",
      caseName: "Intellectual Property Dispute",
      startDate: "2024-03-10",
      clientName: "Alice Johnson",
      email: "alice.johnson@example.com"
  },
  {
      id: "4",
      caseName: "Personal Injury Claim",
      startDate: "2024-04-05",
      clientName: "Robert Brown",
      email: "robert.brown@example.com"
  },
  {
      id: "5",
      caseName: "Employment Discrimination",
      startDate: "2024-05-12",
      clientName: "Emily Davis",
      email: "emily.davis@example.com"
  },
  {
      id: "6",
      caseName: "Real Estate Litigation",
      startDate: "2024-06-18",
      clientName: "Michael Wilson",
      email: "michael.wilson@example.com"
  },
  {
      id: "7",
      caseName: "Divorce Settlement",
      startDate: "2024-07-22",
      clientName: "Sarah Miller",
      email: "sarah.miller@example.com"
  }
];

function Cases() {
  return (
    <div>
        <BreadCrumbPage title="Matters" />
        <DataTable  columns={columns} data={cases} />
    </div>
  )
}

export default Cases