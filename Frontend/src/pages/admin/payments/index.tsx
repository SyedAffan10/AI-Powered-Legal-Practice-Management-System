// import Breadcrumb from "@/components/ui/breadcrumb"
import { DataTable } from "./_components/data-table"
import { columns, Payment } from "./_components/columns"
import BreadCrumbPage from "@/components/ui/breadcrumb-app"

const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
  ]
function Payments() {
  return (
    <div>
     <BreadCrumbPage title="Payments" />
    <DataTable columns={columns} data={ data} />
   </div>
  )
}

export default Payments