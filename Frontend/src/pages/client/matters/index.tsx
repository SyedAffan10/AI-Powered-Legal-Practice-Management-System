import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns,ICase } from "./_components/columns";

const cases: ICase[] = [
    {
        id: "1",
        matterName: "Estate Dispute",
        agencyName: "Legal Solutions Ltd.",
        agencyContact: "+1-555-1234",
        agentName: "David Thompson",
        agentContact: "+1-555-5678"
    },
    {
        id: "2",
        matterName: "Contract Breach",
        agencyName: "Contract Law Associates",
        agencyContact: "+1-555-2233",
        agentName: "Sophia Martinez",
        agentContact: "+1-555-7789"
    },
    {
        id: "3",
        matterName: "Intellectual Property Dispute",
        agencyName: "IP Protection Firm",
        agencyContact: "+1-555-3344",
        agentName: "Ethan Williams",
        agentContact: "+1-555-8899"
    },
    {
        id: "4",
        matterName: "Personal Injury Claim",
        agencyName: "Injury Law Experts",
        agencyContact: "+1-555-4455",
        agentName: "Olivia Brown",
        agentContact: "+1-555-9900"
    },
    {
        id: "5",
        matterName: "Employment Discrimination",
        agencyName: "Workplace Justice Lawyers",
        agencyContact: "+1-555-5566",
        agentName: "Noah Anderson",
        agentContact: "+1-555-1112"
    },
    {
        id: "6",
        matterName: "Real Estate Litigation",
        agencyName: "Property Legal Advisors",
        agencyContact: "+1-555-6677",
        agentName: "Liam Wilson",
        agentContact: "+1-555-2223"
    },
    {
        id: "7",
        matterName: "Divorce Settlement",
        agencyName: "Family Law Counselors",
        agencyContact: "+1-555-7788",
        agentName: "Emma Carter",
        agentContact: "+1-555-3334"
    }
];

function ClientMatter() {
  return (
    <div>
        <BreadCrumbPage title="Matters" />
        <DataTable  columns={columns} data={cases} />
    </div>
  )
}

export default ClientMatter