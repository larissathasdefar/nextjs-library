"use server";

import { db } from "@vercel/postgres";
import { CreateBookSchema, BookSchema } from "@/app/types/book";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBook(formData: FormData) {
  const parsedData = CreateBookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publicationDate: formData.get("publicationDate"),
    location: formData.get("location"),
    genreId: formData.get("genreId"),
    typeId: formData.get("typeId"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { title, author, publicationDate, location, genreId, typeId } =
    parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO books (title, author, publication_date, location, genre_id, type_id)
      VALUES (${title}, ${author}, ${publicationDate}, ${location}, ${genreId}, ${typeId});
    `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/books");
}

export async function editBook(formData: FormData) {
  const parsedData = BookSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    author: formData.get("author"),
    publicationDate: formData.get("publicationDate"),
    location: formData.get("location"),
    genreId: formData.get("genreId"),
    typeId: formData.get("typeId"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { id, title, author, publicationDate, location, genreId, typeId } =
    parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
        UPDATE books SET
          title = ${title},
          author = ${author},
          publication_date = ${publicationDate},
          location = ${location},
          genre_id = ${genreId},
          type_id = ${typeId}
        WHERE id = ${id};
      `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/books");
}

export async function deleteBook(id: string) {
  if (!id) return "No id was passed.";

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      DELETE FROM books WHERE id = ${id}
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  revalidatePath("/admin/books");
}
