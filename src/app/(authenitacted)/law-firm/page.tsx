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
import { useLawFirms } from "@/hooks/useFirms";

export default function LawFirmsPage() {
  const { data, isLoading, error } = useLawFirms();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span>Law Firms</span>
            </div>
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
                <div className="space-y-4">
                  <Input placeholder="Firm Name" />
                  <Input placeholder="Address" />
                  <Input placeholder="Contact Number" />
                  <Button>Create Law Firm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data || []} />
        </CardContent>
      </Card>
    </div>
  );
}

// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowRight,
  Building2,
  MapPin,
  Phone,
  Users,
  Briefcase,
  CircleDot,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { LawFirm } from "@/types/lawFirms";

export const columns: ColumnDef<LawFirm>[] = [
  {
    accessorKey: "lawFirmDetails.lawFirmName",
    header: "Firm Name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">
          {row.original.lawFirmDetails?.lawFirmName || "N/A"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "lawFirmDetails.contactInfo.address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.lawFirmDetails?.contactInfo?.address;
      if (!address) return "N/A";

      return (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {`${address.line1 || ""}, ${address.city || ""}, ${
              address.state || ""
            }, ${address.postalCode || ""}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "lawFirmDetails.contactInfo.mobile",
    header: "Contact",
    cell: ({ row }) => {
      const mobile = row.original.lawFirmDetails?.contactInfo?.mobile;
      if (!mobile) return "N/A";

      return (
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{mobile}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lawFirmDetails.specialization",
    header: "Specialization",
    cell: ({ row }) => {
      const specialization = row.original.lawFirmDetails?.specialization;
      if (!specialization) return "N/A";

      return (
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{specialization}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "professionalDetails.lawyerType",
    header: "Lawyer Type",
    cell: ({ row }) => {
      const lawyerType = row.original.professionalDetails?.lawyerType;
      if (!lawyerType) return "N/A";

      return (
        <div className="flex items-center space-x-2">
          <CircleDot className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{lawyerType}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "users",
    header: "Total Users",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.users?.length || 0}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      if (!status) return "N/A";

      return <Badge className="capitalize">{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/law-firm/${row.original._id}`}>
        <Button variant="ghost" className="h-8 px-2">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];
