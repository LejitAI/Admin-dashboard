"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useSingleLawFirm } from "@/hooks/useFirms";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
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
import { use } from "react";

export default function LawFirmDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const {
    data: lawFirm,
    isLoading,
    error,
  } = useSingleLawFirm(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-8 w-[200px] mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading law firm details: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!lawFirm) return null;

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{lawFirm.lawFirmDetails.lawFirmName}</CardTitle>
          <CardDescription className="space-y-2">
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {`${lawFirm.lawFirmDetails.contactInfo.address.line1}, 
                ${lawFirm.lawFirmDetails.contactInfo.address.city}, 
                ${lawFirm.lawFirmDetails.contactInfo.address.state}`}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {lawFirm.lawFirmDetails.contactInfo.mobile}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {lawFirm.lawFirmDetails.contactInfo.email}
            </p>
            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {lawFirm.lawFirmDetails.specialization}
            </p>
            <p>
              <span className="font-semibold">Operating Since:</span>{" "}
              {lawFirm.lawFirmDetails.operatingSince}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Users ({lawFirm.users?.length || 0})
        </h2>
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

      {/* <DataTable columns={userColumns} data={lawFirm.users} /> */}
    </div>
  );
}
