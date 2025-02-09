"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import { Customer } from "@/app/types/customer";
import CustomerForm from "@/app/admin/customers/CustomerForm";
import { editCustomer } from "@/app/actions/customer";
import { User } from "@/app/types/user";

export default function Form({
  customer,
  users,
}: {
  customer: Customer;
  users: User[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleUpdateCustomer = (formData: FormData) => {
    startTransition(async () => {
      const error = await editCustomer(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update customer
      </Typography>

      <CustomerForm
        customer={customer}
        users={users}
        error={error}
        onSubmit={handleUpdateCustomer}
        isPending={isPending}
      />
    </div>
  );
}
