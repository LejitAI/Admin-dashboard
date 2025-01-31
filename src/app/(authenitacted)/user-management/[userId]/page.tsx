"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCog, UserMinus, UserX, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/data-table";

import { ColumnDef } from "@tanstack/react-table";

// Mock user data
const userData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  status: "active",
  lastLogin: "2023-04-23 14:32",
  signUpDate: "2023-01-15",
  totalLogins: 47,
  lastIPAddress: "192.168.1.1",
};

// Mock payment history data
const paymentHistory: Payment[] = [
  {
    id: "1",
    date: "2023-10-01",
    amount: "$49.99",
    plan: "Premium",
    paymentMethod: "Credit Card",
    status: "Success",
  },
  {
    id: "2",
    date: "2023-07-01",
    amount: "$49.99",
    plan: "Premium",
    paymentMethod: "Credit Card",
    status: "Success",
  },
  {
    id: "3",
    date: "2023-04-01",
    amount: "$49.99",
    plan: "Premium",
    paymentMethod: "Credit Card",
    status: "Success",
  },
];

export default function UserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSuspendUser = () => {
    // Implement suspend user logic here
    setShowSuspendModal(false);
  };

  const handleRemoveUser = () => {
    // Implement remove user logic here
    setShowRemoveModal(false);
    router.push("/user-management");
  };

  const handleEditUser = () => {
    // Implement edit user logic here
    setShowEditModal(false);
  };

  return (
    <div className="w-full h-full bg-white py-10 p-4 border-2 rounded border-dashed border-gray-200">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to User Management
      </Button>

      {/* User Details Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{userData.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{userData.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{userData.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Last Login</h3>
              <p>{userData.lastLogin}</p>
            </div>
            <div>
              <h3 className="font-semibold">Sign Up Date</h3>
              <p>{userData.signUpDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Logins</h3>
              <p>{userData.totalLogins}</p>
            </div>
            <div>
              <h3 className="font-semibold">Last IP Address</h3>
              <p>{userData.lastIPAddress}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded">
                <UserCog className="mr-2 h-4 w-4" />
                Edit User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update the user details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={userData.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue={userData.email}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="secondary" onClick={handleEditUser}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={showSuspendModal} onOpenChange={setShowSuspendModal}>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <UserMinus className="mr-2 h-4 w-4" />
                Suspend User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suspend User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to suspend this user? They will not be
                  able to access the system until reactivated.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowSuspendModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleSuspendUser}>
                  Suspend User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={showRemoveModal} onOpenChange={setShowRemoveModal}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <UserX className="mr-2 h-4 w-4" />
                Remove User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to remove this user? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowRemoveModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleRemoveUser}>
                  Remove User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Payment History Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5" />
          Payment History
        </h2>
        <DataTable
          columns={columns}
          data={paymentHistory}
          searchKey="plan"
          searchPlaceholder="Search payments..."
        />
      </div>
    </div>
  );
}
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
type Payment = {
  id: string;
  date: string;
  amount: string;
  plan: string;
  paymentMethod: string;
  status: string;
};
