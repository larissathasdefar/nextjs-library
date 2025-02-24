import { db } from "@vercel/postgres";
import { Book } from "@/app/types/book";

export const dynamic = "force-dynamic";

export async function fetchBooks() {
  try {
    const client = await db.connect();
    const data = await client.sql<Book>`SELECT
        books.id,
        books.title,
        books.author,
        TO_CHAR(books.publication_date, 'YYYY-MM-DD') AS "publicationDate",
        books.location,
        books.genre_id AS "genreId",
        genres.name AS "genre",
        books.type_id AS "typeId",
        book_types.name AS "type"
      FROM books
      JOIN genres ON books.genre_id = genres.id
      JOIN book_types ON books.type_id = book_types.id
      ORDER BY books.id`;

    await client.release();

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch books data.");
  }
}

export async function fetchBooksForSelect() {
  try {
    const client = await db.connect();
    const data = await client.sql<Book>`SELECT
        books.id,
        books.title
      FROM books
      ORDER BY books.title`;

    await client.release();

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch books data.");
  }
}

export async function fetchBook(id: string) {
  try {
    const client = await db.connect();
    const data = await client.sql<Book>`SELECT
        id, title, author, TO_CHAR(publication_date, 'YYYY-MM-DD') AS "publicationDate", location,
        genre_id AS "genreId", type_id AS "typeId"
      FROM books WHERE id=${id}`;

    await client.release();

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch book data.");
  }
}
