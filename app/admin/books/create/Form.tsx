"use client";

import { useTransition, useState } from "react";
import BookForm from "@/app/admin/books/BookForm";
import { createBook } from "@/app/actions/book";
import { Genre } from "@/app/types/genre";
import { BookType } from "@/app/types/bookType";

export default function Form({
  genres,
  types,
}: {
  genres: Genre[];
  types: BookType[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateBook = (formData: FormData) => {
    startTransition(async () => {
      const error = await createBook(formData);
      setError(error);
    });
  };
  return (
    <BookForm
      book={{
        id: "",
        title: "",
        author: "",
        publicationDate: "",
        location: "",
        genreId: "",
        typeId: "",
      }}
      genres={genres}
      types={types}
      error={error}
      onSubmit={handleCreateBook}
      isPending={isPending}
    />
  );
}
