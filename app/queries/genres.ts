import { db } from "@vercel/postgres";
import { Genre } from "@/app/types/genre";

export async function fetchGenres() {
  try {
    const client = await db.connect();
    const data =
      await client.sql<Genre>`SELECT id, name FROM genres ORDER BY id`;

    await client.release();

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch genres data.");
  }
}

export async function fetchGenre(id: string) {
  try {
    const client = await db.connect();
    const data =
      await client.sql<Genre>`SELECT id, name FROM genres WHERE id=${id}`;

    await client.release();

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch genre data.");
  }
}
