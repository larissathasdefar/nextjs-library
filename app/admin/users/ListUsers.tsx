"use client";

import { startTransition } from "react";
import Table from "@/app/components/Table";
import { User } from "@/app/types/user";
import { deleteUser } from "@/app/actions/user";

const userTypes = {
  employee: "Employee",
  customer: "Customer",
};

export default function ListUsers({ users }: { users: User[] }) {
  const deleteItem = (id: string) => {
    startTransition(async () => {
      const error = await deleteUser(id);
      if (error) {
        console.log(error);
        alert("Something went wrong!");
        return;
      }
    });
  };
  return (
    <Table
      header={[
        { field: "name", header: "Name" },
        { field: "email", header: "Email" },
        { field: "type", header: "Type" },
      ]}
      data={users.map(({ type, ...others }) => ({
        ...others,
        type: userTypes[type],
      }))}
      getEditUrl={({ id }) => `/admin/users/${id}`}
      onDelete={({ id }) =>
        confirm("Are you sure you want to delete this?") && deleteItem(id)
      }
    />
  );
}
