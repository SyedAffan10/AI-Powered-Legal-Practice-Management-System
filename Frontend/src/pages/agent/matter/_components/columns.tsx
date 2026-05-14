import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export type ICase = {
  id: string;
  caseName: string;
  startDate: string; // Format: YYYY-MM-DD
  email:string;
  clientName: string;
};

export const columns: ColumnDef<ICase>[] = [
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
    accessorKey: "caseName",
    header: "Matter Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("caseName")}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate: string = row.getValue("startDate");
      return <div>{format(new Date(startDate), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("clientName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Client Email",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("email")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const caseData = row.original;
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
              onClick={() => navigator.clipboard.writeText(caseData.id)}
            >
              Copy Case ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Agent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


