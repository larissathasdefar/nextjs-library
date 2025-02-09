"use server";

import { db } from "@vercel/postgres";
import { CreateBookTypeSchema, BookTypeSchema } from "@/app/types/bookType";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBookType(formData: FormData) {
  const parsedData = CreateBookTypeSchema.safeParse({
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
      INSERT INTO book_types (name) VALUES (${name});
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/book-types");
}

export async function editBookType(formData: FormData) {
  const parsedData = BookTypeSchema.safeParse({
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
        UPDATE book_types SET name = ${name} WHERE id = ${id};
      `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/book-types");
}

export async function deleteBookType(id: string) {
  if (!id) return "No id was passed.";

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      DELETE FROM book_types WHERE id = ${id}
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  revalidatePath("/admin/book-types");
}
