// components/dashboard/SchoolSubscriptionsTable.jsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import RegisterDialog from "../Dialogs/RegisterDialog";
import useMadrashaDelete from "@/hooks/public/madrasha/useMadrashaDelete";
import StatusChangeDialog from "../Dialogs/StatusChangeDialog";


export default function SchoolSubscriptionsTable({ data }) {
   const [registerOpen, setRegisterOpen] = useState(false);
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMadrasha,setSelectedMadrasha] = useState(null);
  const [statusOpen,setStatusOpen] = useState(null);
  const {mutate:DeleteMadrasha} = useMadrashaDelete()

  const filteredData = useMemo(() => {
    return data?.filter((school) => {
      if (statusFilter === "All") return true;
      return school.status === statusFilter;
    });
  }, [data, statusFilter]);

  // Define column sizes
  const columns = [
    {
      accessorKey: "id",
      header: "Sl",
      size: 60,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Madrasa Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 180,
    },
    {
      accessorKey: "planName",
      header: "Plan Name",
      size: 60,
     
    },
    {
      accessorKey: "domain_name",
      header: "Domain Name",
      size: 60,
     
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 80,
      cell: ({ row }) => <div className="whitespace-nowrap">${row.getValue("price")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 180,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile No",
      size: 120,
    },
    {
      accessorKey: "address",
      header: "Address",
      size: 120,
     
    },
    // {
    //   accessorKey: "dates",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         className="whitespace-nowrap"
    //       >
    //         Dates
    //         {column.getIsSorted() === "asc" ? (
    //           <ChevronUp className="ml-2 h-4 w-4" />
    //         ) : column.getIsSorted() === "desc" ? (
    //           <ChevronDown className="ml-2 h-4 w-4" />
    //         ) : (
    //           <ChevronsUpDown className="ml-2 h-4 w-4" />
    //         )}
    //       </Button>
    //     );
    //   },
    //   size: 140,
    //   cell: ({ row }) => {
    //     const dates = row.getValue("dates");
    //     return (
    //       <div className="text-xs whitespace-nowrap">
    //         <div>Start: {dates.startDate}</div>
    //         <div>Expiry: {dates.expiryDate}</div>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Last Upgrade
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 120,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("created_at").split("T")[0]}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        let badgeClass = "bg-gray-500";

        if (status === "Active") {
          badgeClass = "bg-green-500";
        } else if (status === "Expired") {
          badgeClass = "bg-red-500";
        } else if (status === "Pending") {
          badgeClass = "bg-yellow-500";
        }

        return (
          <Badge variant="outline" className={`${badgeClass} text-white whitespace-nowrap`}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const school = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => handleView(school)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => {setRegisterOpen(true); setSelectedMadrasha(school.uuid)}}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {setStatusOpen(true); setSelectedMadrasha(school.uuid)}}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Status</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteClick(school)}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

   // Set up table with column sizes and filters
  const table = useReactTable({
    data: filteredData, // Use the memoized filtered data
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    defaultColumn: {
      minSize: 50,
      size: 100,
    },
  });

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleView = (school) => {
    toast.info(`Viewing ${school.name}`);
    // Implementation for view action
  };

  const handleEdit = (school) => {
    // Navigate to edit page with the school ID
    router.push(`/dashboard/madrasa-subscriptions/edit/${school.id}`);
  };

  const handleCreateNew = () => {
    // if somehow prev madrasha id exist then make it null before open register dialog
    setSelectedMadrasha(null);
    setRegisterOpen(true);
  };

  const handleDeleteClick = (school) => {
    setSelectedSchool(school);
    setSelectedMadrasha(school.uuid)
    setDeleteDialogOpen(true);
    
  };

  const handleDelete = () => {
    console.log(selectedMadrasha,'checking se')
    DeleteMadrasha({
      uuid:selectedMadrasha
    })
  };
 

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-col sm:flex-row  gap-4">
        <Input
          placeholder="Filter madrasa..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Filter Status <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleStatusFilterChange("All")}
              className={statusFilter === "All" ? "bg-gray-200" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusFilterChange("Active")}
              className={statusFilter === "Active" ? "bg-gray-200" : ""}
            >
              Active
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusFilterChange("Expired")}
              className={statusFilter === "Expired" ? "bg-gray-200" : ""}
            >
              Expired
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusFilterChange("Pending")}
              className={statusFilter === "Pending" ? "bg-gray-200" : ""}
            >
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleCreateNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Madrasa
        </Button>

        </div>
      </div>
       <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} setSelectedMadrasha={setSelectedMadrasha}  uuid={selectedMadrasha} />
       <StatusChangeDialog open={statusOpen} onOpenChange={setStatusOpen}  uuid={selectedMadrasha}  />

           {/* Add an outer container with overflow auto to create scrollbar */}
           <div className="rounded-md border">
        <div className="overflow-x-auto" style={{ width: '100%' }}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id} 
                        style={{ width: header.getSize(), minWidth: header.getSize() }}
                        className="whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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
                      <TableCell 
                        key={cell.id}
                        style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }}
                      >
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
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <strong>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </strong>{" "}
          of <strong>{table.getFilteredRowModel().rows.length}</strong> schools
        </div>
        <div className="flex items-center space-x-2">
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{selectedSchool?.name}</span>&apos;s
              subscription and remove all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}