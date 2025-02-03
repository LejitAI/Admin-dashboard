"use client";

import { useState } from "react";
import Link from "next/link";
import { useUsers } from "@/hooks/useUsers";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { UserPlus, MoreHorizontal, LucideIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateUser } from "@/hooks/useUsers";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { DeleteUserDialog } from "@/components/users/DeleteUserConfirmation";
import { AddUserDialog } from "@/components/users/AddUserModal";
import { ChangeUserStatusDialog } from "@/components/users/SuspendUserModal";
import { User } from "@/types/user";
import { Shield, Briefcase, UserCheck } from "lucide-react";

const getStatusClasses = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    case "inactive":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as User["role"];
      let label = "";
      let Icon: LucideIcon | null = null;
      let bgColor = "";
      let borderColor = "";

      switch (role) {
        case "law_firm":
          label = "Law Firm";
          Icon = Briefcase;
          bgColor = "bg-blue-200";
          borderColor = "border-blue-600";
          break;
        case "corporate":
          label = "Corporate";
          Icon = Shield;
          bgColor = "bg-green-200";
          borderColor = "border-green-600";
          break;
        case "admin":
          label = "Admin";
          Icon = UserCheck;
          bgColor = "bg-red-200";
          borderColor = "border-red-600";
          break;
        case "citizen":
          label = "Citizen";
          Icon = Users;
          bgColor = "bg-gray-200";
          borderColor = "border-gray-600";
          break;
        default:
          label = "Unknown";
          Icon = Users;
          bgColor = "bg-gray-300";
          borderColor = "border-gray-700";
      }

      return (
        <Badge
          className={`flex items-center justify-center w-28 rounded-full border ${bgColor} ${borderColor} text-black px-3 py-1`}
        >
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"];
      return (
        <Badge
          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string; // Ensure it's a string
      const date = new Date(createdAt);
      const isValidDate = !isNaN(date.getTime());

      if (!isValidDate) {
        return <>Not Available</>;
      }

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <span className="font-semibold">{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/user-management/${user._id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>
              <ChangeUserStatusDialog
                userId={user._id}
                currentStatus={user.status}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteUserDialog userId={row.original._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserManagementPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [page, setPage] = useState(1);
  const createUserMutation = useCreateUser();
  // Fetch users from API
  const { data, isLoading, error } = useUsers(page);

  const users = data?.users || [];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const handleAddUser = (userData: {
    role: User["role"];
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    law_firm_name?: string;
  }) => {
    console.log("Adding user:", userData);

    createUserMutation.mutate(userData, {
      onSuccess: () => {
        console.log("User added successfully");
        // Perform any additional actions on success, e.g., close a modal
      },
      onError: (error) => {
        console.error("Error adding user:", error.message);
      },
    });
  };
  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <AddUserDialog onAddUser={handleAddUser} />
      </div>

      {isLoading ? (
        // Skeleton Loading State
        <div className="space-y-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-500">
          Error fetching users: {error.message}
        </p>
      ) : (
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-gray-50">
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
                  <TableRow key={row.id}>
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
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={data?.currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={(data?.currentPage ?? 1) >= (data?.totalPages ?? 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
