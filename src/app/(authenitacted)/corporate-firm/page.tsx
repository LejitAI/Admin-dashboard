"use client";
import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Building, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LawFirmsPage() {
  const [lawFirms, setLawFirms] = useState<LawFirm[]>([
    {
      id: "1",
      name: "Smith & Associates",
      address: "123 Law St",
      contactNumber: "555-0123",
      users: [],
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Smith & Associates",
      address: "123 Law St",
      contactNumber: "555-0123",
      users: [],
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Smith & Associates",
      address: "123 Law St",
      contactNumber: "555-0123",
      users: [],
      createdAt: new Date(),
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Law Firms</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Law Firm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Law Firm</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Firm Name" />
              <Input placeholder="Address" />
              <Input placeholder="Contact Number" />
              <Button type="submit" className="w-full">
                Create Law Firm
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={lawFirms} />
    </div>
  );
}

// columns.tsx
import { ColumnDef } from "@tanstack/react-table";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LawFirm } from "@/types/firms";

const columns: ColumnDef<LawFirm>[] = [
  {
    accessorKey: "name",
    header: "Firm Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact",
  },
  {
    accessorKey: "users",
    header: "Total Users",
    cell: ({ row }) => row.original.users.length,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/law-firm/${row.original.id}`}>
        <Button variant="ghost" size="sm">
          <ArrowRight className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </Link>
    ),
  },
];
