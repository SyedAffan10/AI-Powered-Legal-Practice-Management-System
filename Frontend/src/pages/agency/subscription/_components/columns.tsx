import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {  CircleCheck, CircleX, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ISubscription = {
  id: string;
  duration: string;
  activeStatus: boolean;

  noOfAgents: number;
  noOfCasesPerAgent: number;
};

export const columns: ColumnDef<ISubscription>[] = [
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
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("duration")}</div>
    ),
  },
 

  {
    accessorKey: "noOfAgents",
    header: "Total Agents",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("noOfAgents")}</div>
    ),
  },
  {
    accessorKey: "noOfCasesPerAgent",
    header: "Cases per Agent",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("noOfCasesPerAgent")}</div>
    ),
  },
  {
    accessorKey: "activeStatus",
    header: "Active/InActive",
    cell: ({ row }) => (
      <div className="text-green-600 text-center">{row.getValue("activeStatus") == true ? <CircleCheck className="text-green-600" /> :<CircleX className="text-red-600" /> }</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const subscription = row.original;
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
              onClick={() => navigator.clipboard.writeText(subscription.id)}
            >
              Copy Subscription ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
