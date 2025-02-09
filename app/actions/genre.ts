"use server";

import { db } from "@vercel/postgres";
import { CreateGenreSchema, GenreSchema } from "@/app/types/genre";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createGenre(formData: FormData) {
  const parsedData = CreateGenreSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { name } = parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO genres (name) VALUES (${name});
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/genres");
}

export async function editGenre(formData: FormData) {
  const parsedData = GenreSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { id, name } = parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
        UPDATE genres SET name = ${name} WHERE id = ${id};
      `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/genres");
}

export async function deleteGenre(id: string) {
  if (!id) return "No id was passed.";

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      DELETE FROM genres WHERE id = ${id}
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  revalidatePath("/admin/genres");
}
