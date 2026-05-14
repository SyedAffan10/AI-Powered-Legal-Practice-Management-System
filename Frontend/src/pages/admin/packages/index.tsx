import BreadCrumbPage from "@/components/ui/breadcrumb-app"
import { DataTable } from "./_components/data-table"
import { columns, IPackages } from "./_components/columns";
const packages: IPackages[] = [
    {
      id: "1",
      packageName: "Basic Plan",
      Duration: "1 Month",
      Price: 99,
      Agent: 5,
      matterPerAgent: 10,
    },
    {
      id: "2",
      packageName: "Standard Plan",
      Duration: "3 Months",
      Price: 249,
      Agent: 8,
      matterPerAgent: 12,
    },
    {
      id: "3",
      packageName: "Pro Plan",
      Duration: "6 Months",
      Price: 499,
      Agent: 3,
      matterPerAgent: 15,
    },
    {
      id: "4",
      packageName: "Enterprise Plan",
      Duration: "1 Year",
      Price: 999,
      Agent: 6,
      matterPerAgent: 20,
    },
    {
      id: "5",
      packageName: "Ultimate Plan",
      Duration: "2 Years",
      Price: 1799,
      Agent: 7,
      matterPerAgent: 25,
    },
    {
      id: "6",
      packageName: "Starter Plan",
      Duration: "1 Month",
      Price: 79,
      Agent: 4,
      matterPerAgent: 8,
    },
    {
      id: "7",
      packageName: "Premium Plan",
      Duration: "6 Months",
      Price: 699,
      Agent: 9,
      matterPerAgent: 30,
    },
  ];
function Packages() {
  return (
    <div>
        <BreadCrumbPage title="Packages" />
        <DataTable data={packages} columns={columns} />
    </div>
  )
}

export default Packages