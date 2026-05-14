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


export type ICase = {
  id: string;
  matterName: string;
  agencyName: string;
  agencyContact: string;
  agentName: string;
  agentContact: string;
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
    accessorKey: "matterName",
    header: "Matter Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("matterName")}</div>
    ),
  },
  {
    accessorKey: "agencyName",
    header: "Agency Name",
    cell: ({ row }) => (
      <div className="">{row.getValue("agencyName")}</div>
    ),
  },
  {
    accessorKey: "agencyContact",
    header: "Agency Contact",
    cell: ({ row }) => (
      <div className="">{row.getValue("agencyContact")}</div>
    ),
  },
  {
    accessorKey: "agentName",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="">{row.getValue("agentName")}</div>
    ),
  },
  {
    accessorKey: "agentContact",
    header: "Agent Contact",
    cell: ({ row }) => (
      <div className="">{row.getValue("agentContact")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
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
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {/* <DropdownMenuItem>View Agent</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


