"use client";

import { startTransition } from "react";
import Table from "@/app/components/Table";
import { Customer } from "@/app/types/customer";
import { deleteCustomer } from "@/app/actions/customer";

export default function ListCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  const deleteItem = (id: string) => {
    startTransition(async () => {
      const error = await deleteCustomer(id);
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
        { field: "phone", header: "Phone" },
        { field: "address", header: "Address" },
      ]}
      data={customers}
      getEditUrl={({ id }) => `/admin/customers/${id}`}
      onDelete={({ id }) =>
        confirm("Are you sure you want to delete this?") && deleteItem(id)
      }
    />
  );
}
