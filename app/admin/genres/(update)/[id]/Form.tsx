"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import { Genre } from "@/app/types/genre";
import GenreForm from "@/app/admin/genres/GenreForm";
import { editGenre } from "@/app/actions/genre";

export default function Form({ genre }: { genre: Genre }) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleUpdateGenre = (formData: FormData) => {
    startTransition(async () => {
      const error = await editGenre(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update genre
      </Typography>

      <GenreForm
        genre={genre}
        error={error}
        onSubmit={handleUpdateGenre}
        isPending={isPending}
      />
    </div>
  );
}
