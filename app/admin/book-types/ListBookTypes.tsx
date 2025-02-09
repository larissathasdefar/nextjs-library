"use client";

import { startTransition } from "react";
import Table from "@/app/components/Table";
import { BookType } from "@/app/types/bookType";
import { deleteBookType } from "@/app/actions/bookType";

export default function ListBookTypes({
  bookTypes,
}: {
  bookTypes: BookType[];
}) {
  const deleteItem = (id: string) => {
    startTransition(async () => {
      const error = await deleteBookType(id);
      if (error) {
        console.log(error);
        alert("Something went wrong!");
        return;
      }
    });
  };
  return (
    <Table
      header={[{ field: "name", header: "Name" }]}
      data={bookTypes}
      getEditUrl={({ id }) => `/admin/book-types/${id}`}
      onDelete={({ id }) =>
        confirm("Are you sure you want to delete this?") && deleteItem(id)
      }
    />
  );
}
