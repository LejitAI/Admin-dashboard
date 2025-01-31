import React from "react";
import UserManagementTable from "@/components/users/UserManagementTable";

const UsersPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserManagementTable />
    </div>
  );
};

export default UsersPage;
