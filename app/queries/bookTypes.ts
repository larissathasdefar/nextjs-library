import { db } from "@vercel/postgres";
import { BookType } from "@/app/types/bookType";

export async function fetchBookTypes() {
  try {
    const client = await db.connect();
    const data =
      await client.sql<BookType>`SELECT id, name FROM book_types ORDER BY id`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch book types data.");
  }
}

export async function fetchBookType(id: string) {
  try {
    const client = await db.connect();
    const data =
      await client.sql<BookType>`SELECT id, name FROM book_types WHERE id=${id}`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch book type data.");
  }
}
