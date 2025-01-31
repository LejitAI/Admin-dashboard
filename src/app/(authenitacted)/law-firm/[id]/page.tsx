"use client";
import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UserPlus } from "lucide-react";

export default function LawFirmDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [lawFirm, setLawFirm] = useState<LawFirm>({
    id: params.id,
    name: "Smith & Associates",
    address: "123 Law St",
    contactNumber: "555-0123",
    trialEndsAt: new Date("2025-02-27"),
    activePlanEndsAt: new Date("2025-02-27"),

    users: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        trialEndsAt: new Date("2025-02-27"),
        isActive: true,
      },
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        trialEndsAt: new Date("2025-02-27"),
        isActive: true,
      },
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        trialEndsAt: new Date("2025-02-27"),
        isActive: true,
      },
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        trialEndsAt: new Date("2025-02-27"),
        isActive: true,
      },
      // Add more mock users
    ],
    createdAt: new Date(),
  });

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{lawFirm.name}</CardTitle>
          <CardDescription>
            Address: {lawFirm.address}
            <br />
            Contact: {lawFirm.contactNumber}
            <br />
            Trial Ends:{" "}
            {lawFirm.trialEndsAt ? lawFirm.trialEndsAt.toDateString() : "N/A"}
            <br />
            Active Plan Ends:{" "}
            {lawFirm.activePlanEndsAt
              ? lawFirm.activePlanEndsAt.toDateString()
              : "N/A"}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email" type="email" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">
                Add User
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={userColumns} data={lawFirm.users} />
    </div>
  );
}

// user-columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { LawFirm } from "@/types/firms";
import { User } from "@/types/user";

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "trialEndsAt",
    header: "Trial Ends",
    cell: ({ row }) => {
      const daysLeft = Math.ceil(
        (row.original.trialEndsAt.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return (
        <Badge variant={daysLeft <= 5 ? "destructive" : "default"}>
          {daysLeft} days left
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "outline" : "destructive"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];
