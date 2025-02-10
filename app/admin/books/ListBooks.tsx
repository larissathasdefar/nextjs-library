"use client";

import { startTransition } from "react";
import Table from "@/app/components/Table";
import { Book } from "@/app/types/book";
import { deleteBook } from "@/app/actions/book";

export default function ListBooks({ books }: { books: Book[] }) {
  const deleteItem = (id: string) => {
    startTransition(async () => {
      const error = await deleteBook(id);
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
        { field: "title", header: "Title" },
        { field: "author", header: "Author" },
        { field: "genre", header: "Genre" },
        { field: "location", header: "Location" },
      ]}
      data={books}
      getEditUrl={({ id }) => `/admin/books/${id}`}
      onDelete={({ id }) =>
        confirm("Are you sure you want to delete this?") && deleteItem(id)
      }
    />
  );
}
