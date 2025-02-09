"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import BookTypeForm from "@/app/admin/book-types/BookTypeForm";
import { createBookType } from "@/app/actions/bookType";

export default function CreateBookType() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateBookType = (formData: FormData) => {
    startTransition(async () => {
      const error = await createBookType(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create Book Type
      </Typography>

      <BookTypeForm
        bookType={{
          id: "",
          name: "",
        }}
        error={error}
        onSubmit={handleCreateBookType}
        isPending={isPending}
      />
    </div>
  );
}
