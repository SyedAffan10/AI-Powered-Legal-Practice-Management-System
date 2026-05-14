"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, ChevronDown, CirclePlus } from "lucide-react";
import { format } from "date-fns";
// import { DateRange } from "react-day-picker";
// import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
// import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  // FormDescription,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// import { Agency } from "./columns";
// import { useLocation } from "react-router";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setAgenciesData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      fullname: string;
      agencyName: string;
      email: string;
      NoOfAgents: number;
      active: boolean;
      matterPerAgent: number;
    }[]>
  >;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  agencyName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  agents: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Must have at least 1 agent")
  ),
  mattersPerAgent: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Must have at least 1 matter per agent")
  ),
  baseCostPerAgent: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Base cost must be positive")
  ),
  baseCostPerMatter: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, "Base cost must be positive")
  ),

  startDate: z.date().refine((date) => date instanceof Date, {
    message: "Start Date is required",
  }),
  endDate: z.date().refine((date) => date instanceof Date, {
    message: "End Date is required",
  }),
});

export function DataTable<TData, TValue  >({
  columns,
  data,
  setAgenciesData
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [open, setOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 7),
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Filter Data based on Date Range
  // const filteredData = data.filter((task) => {
  //   const dueDate = new Date(task.dueDate);
  //   if (dateRange?.from && dateRange?.to) {
  //     return isWithinInterval(dueDate, {
  //       start: dateRange.from,
  //       end: dateRange.to,
  //     });
  //   }
  //   return true;
  // });

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
   
    const newData = {
      id: String(data.length+1),
      fullname: values.firstName + values.lastName,
      agencyName: values.agencyName,
      email: values.email,
      NoOfAgents: values.agents,
      active: true,
      matterPerAgent: values.mattersPerAgent,
    };

    setAgenciesData((prevData) => [...prevData, newData]);

    setOpen(false);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-wrap  justify-between py-4 gap-y-4">
        <div className="flex  items-center gap-4 w-full sm:w-auto">
          {/* Date Range Picker */}
          {/* <DatePickerWithRange
            className="w-full sm:w-[300px]"
            onDateChange={setDateRange}
            date={dateRange}
          /> */}

          {/* Search Filter */}
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full "
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="dark">
                <CirclePlus />
                Add Agency
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] overflow-auto ">
              <DialogHeader>
                <DialogTitle>Agency</DialogTitle>
                {/* <DialogDescription>
                  Make changes to your task here. Click save when you're done.
                </DialogDescription> */}
              </DialogHeader>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Agency Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. of Agents</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number of Agents"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mattersPerAgent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. of Matters per Agent</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Matters per Agent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="baseCostPerAgent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Cost per Agent</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Base Cost per Agent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="baseCostPerMatter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Cost per Matter</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Base Cost per Matter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </Form>
              {/* <Button type="submit">Save changes</Button> */}
              {/* </DialogFooter> */}
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="dark" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border border-sidebar-border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between space-y-2 sm:space-y-0 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-center sm:text-left">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
