"use client";

import { startTransition } from "react";
import Table from "@/app/components/Table";
import { Genre } from "@/app/types/genre";
import { deleteGenre } from "@/app/actions/genre";

export default function ListGenres({ genres }: { genres: Genre[] }) {
  const deleteItem = (id: string) => {
    startTransition(async () => {
      const error = await deleteGenre(id);
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
      data={genres}
      getEditUrl={({ id }) => `/admin/genres/${id}`}
      onDelete={({ id }) =>
        confirm("Are you sure you want to delete this?") && deleteItem(id)
      }
    />
  );
}
