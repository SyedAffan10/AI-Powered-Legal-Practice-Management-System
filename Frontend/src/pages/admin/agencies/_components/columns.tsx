import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Switch } from "@/components/ui/switch";

export type Agency = {
  id: string;
  fullname: string;
  agencyName: string;
  email: string;
  NoOfAgents: number;
  active: boolean;
  matterPerAgent: number;
  // Format: YYYY-MM-DD
};

// export const [agenciesData , setAgenciesData] = useState<Agency[]>([
//   {
//     id: "1",
//     fullname: "Website Redesign",
//     agencyName: "Agency 1",
//     email: "contact@agency1.com",
//     NoOfAgents: 4,
//     active: true,
//     matterPerAgent: 1,
//   },
//   {
//     id: "2",
//     fullname: "Bug Fixing",
//     agencyName: "Agency 2",
//     email: "contact@agency2.com",
//     NoOfAgents: 11,
//     active: true,
//     matterPerAgent: 1,
//   },
//   {
//     id: "3",
//     fullname: "API Documentation",
//     agencyName: "Agency 3",
//     email: "contact@agency3.com",
//     NoOfAgents: 13,
//     active: true,
//     matterPerAgent: 1,
//   },
//   {
//     id: "4",
//     fullname: "Marketing",
//     agencyName: "Agency 4",
//     email: "contact@agency4.com",
//     NoOfAgents: 15,
//     active: true,
//     matterPerAgent: 1,
//   },
//   {
//     id: "5",
//     fullname: "Infrastructure",
//     agencyName: "Agency 5",
//     email: "contact@agency5.com",
//     NoOfAgents: 21,
//     active: true,
//     matterPerAgent: 1,
//   },
// ])


export const columns: ColumnDef<Agency>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("fullname")}</div>
    ),
  },

  {
    accessorKey: "agencyName",
    header: "Agency Name",
    cell: ({ row }) => <div className="">{row.getValue("agencyName")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "NoOfAgents",
    header: "No Of Agents",
    cell: ({ row }) => <div className="">{row.getValue("NoOfAgents")}</div>,
  },
  {
    accessorKey: "matterPerAgent",
    header: "Matter Per Agent",
    cell: ({ row }) => <div className="">{row.getValue("matterPerAgent")}</div>,
  },


  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Edit Task</DropdownMenuItem> */}
            <DropdownMenuItem>View Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
