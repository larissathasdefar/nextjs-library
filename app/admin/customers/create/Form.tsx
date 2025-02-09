"use client";

import { useTransition, useState } from "react";
import CustomerForm from "@/app/admin/customers/CustomerForm";
import { createCustomer } from "@/app/actions/customer";
import { User } from "@/app/types/user";

export default function Form({ users }: { users: User[] }) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateCustomer = (formData: FormData) => {
    startTransition(async () => {
      const error = await createCustomer(formData);
      setError(error);
    });
  };
  return (
    <CustomerForm
      customer={{
        id: "",
        name: "",
        phone: "",
        address: "",
        userId: "",
      }}
      users={users}
      error={error}
      onSubmit={handleCreateCustomer}
      isPending={isPending}
    />
  );
}
