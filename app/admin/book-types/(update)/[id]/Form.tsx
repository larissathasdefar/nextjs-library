"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import { BookType } from "@/app/types/bookType";
import BookTypeForm from "@/app/admin/book-types/BookTypeForm";
import { editBookType } from "@/app/actions/bookType";

export default function Form({ bookType }: { bookType: BookType }) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleUpdateBookType = (formData: FormData) => {
    startTransition(async () => {
      const error = await editBookType(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update Book Type
      </Typography>

      <BookTypeForm
        bookType={bookType}
        error={error}
        onSubmit={handleUpdateBookType}
        isPending={isPending}
      />
    </div>
  );
}
