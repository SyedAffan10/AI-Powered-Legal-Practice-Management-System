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

export type IPackages = {
  id: string;
  packageName: string;
  Duration: string;
  Price: number;
  Agent: number;
  matterPerAgent: number;
}

export const columns: ColumnDef<IPackages>[] = [
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
    accessorKey: "packageName",
    header: "Package Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("packageName")}</div>
    ),
  },
  {
    accessorKey: "Duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-sidebar-foreground">{row.getValue("Duration")}</div>
    ),
  },
  {
    accessorKey: "Price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-sidebar-foreground">${row.getValue("Price")}</div>
    ),
  },
  {
    accessorKey: "Agent",
    header: "No. of Agents",
    cell: ({ row }) => (
      <div className="text-sidebar-foreground">{row.getValue("Agent")}</div>
    ),
  },
  {
    accessorKey: "matterPerAgent",
    header: "Matters per Agent",
    cell: ({ row }) => (
      <div className="text-sidebar-foreground">
        {row.getValue("matterPerAgent")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const packageData = row.original;
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
            <DropdownMenuItem>Upgrade Package</DropdownMenuItem>
            <DropdownMenuItem>Delete Package</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
