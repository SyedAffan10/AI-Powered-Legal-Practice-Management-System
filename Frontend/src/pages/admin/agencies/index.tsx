
import BreadCrumbPage from "@/components/ui/breadcrumb-app";
import {   Agency } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

function Agencies() {
  const [agenciesData, setAgenciesData] = useState<Agency[]>([
    {
      id: "1",
      fullname: "Website Redesign",
      agencyName: "Agency 1",
      email: "contact@agency1.com",
      NoOfAgents: 4,
      active: true,
      matterPerAgent: 1,
    },
    {
      id: "2",
      fullname: "Bug Fixing",
      agencyName: "Agency 2",
      email: "contact@agency2.com",
      NoOfAgents: 11,
      active: true,
      matterPerAgent: 1,
    },
    {
      id: "3",
      fullname: "API Documentation",
      agencyName: "Agency 3",
      email: "contact@agency3.com",
      NoOfAgents: 13,
      active: true,
      matterPerAgent: 1,
    },
    {
      id: "4",
      fullname: "Marketing",
      agencyName: "Agency 4",
      email: "contact@agency4.com",
      NoOfAgents: 15,
      active: true,
      matterPerAgent: 1,
    },
    {
      id: "5",
      fullname: "Infrastructure",
      agencyName: "Agency 5",
      email: "contact@agency5.com",
      NoOfAgents: 21,
      active: true,
      matterPerAgent: 1,
    },
  ]);

  // ✅ Columns Definition with Toggle Switch
  const columns: ColumnDef<Agency>[] = [
    {
      accessorKey: "fullname",
      header: "Full Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("fullname")}</div>,
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
      accessorKey: "active",
      header: "Active/Deactive",
      cell: ({ row }) => {
        return (
          <Switch
          className="transition-all ease-linear border-sidebar-border"
            checked={row.getValue("active")}  
            onClick={() => {
              // ✅ Update `active` status
              const updatedAgencies = agenciesData.map((agency, idx) =>
                idx === row.index ? { ...agency, active: !agency.active } : agency
              );

              setAgenciesData(updatedAgencies); // ✅ Update state
            }}
          />
        );
      },
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
              <DropdownMenuItem>View Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <BreadCrumbPage title="Agencies" />
      <DataTable columns={columns} data={agenciesData} setAgenciesData={setAgenciesData} />
    </div>
  );
}

export default Agencies;
