"use client";

import { useTransition, useState } from "react";
import LoanForm from "@/app/admin/loans/LoanForm";
import { createLoan } from "@/app/actions/loan";
import { Customer } from "@/app/types/customer";
import { Book } from "@/app/types/book";

export default function Form({
  customers,
  books,
}: {
  customers: Customer[];
  books: Book[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateLoan = (formData: FormData) => {
    startTransition(async () => {
      const error = await createLoan(formData);
      setError(error);
    });
  };
  return (
    <LoanForm
      customers={customers}
      books={books}
      error={error}
      onSubmit={handleCreateLoan}
      isPending={isPending}
    />
  );
}
