"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import { Book } from "@/app/types/book";
import BookForm from "@/app/admin/books/BookForm";
import { editBook } from "@/app/actions/book";
import { Genre } from "@/app/types/genre";
import { BookType } from "@/app/types/bookType";

export default function Form({
  book,
  genres,
  types,
}: {
  book: Book;
  genres: Genre[];
  types: BookType[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleUpdateBook = (formData: FormData) => {
    startTransition(async () => {
      const error = await editBook(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update book
      </Typography>

      <BookForm
        book={book}
        genres={genres}
        types={types}
        error={error}
        onSubmit={handleUpdateBook}
        isPending={isPending}
      />
    </div>
  );
}
