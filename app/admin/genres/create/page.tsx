"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import GenreForm from "@/app/admin/genres/GenreForm";
import { createGenre } from "@/app/actions/genre";

export default function CreateGenre() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateGenre = (formData: FormData) => {
    startTransition(async () => {
      const error = await createGenre(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create genre
      </Typography>

      <GenreForm
        genre={{
          id: "",
          name: "",
        }}
        error={error}
        onSubmit={handleCreateGenre}
        isPending={isPending}
      />
    </div>
  );
}
