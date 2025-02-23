import { db } from "@vercel/postgres";
import { User } from "@/app/types/user";

// TODO: add created_at and updated_at

export async function fetchUsers() {
  try {
    const client = await db.connect();
    const data =
      await client.sql<User>`SELECT id, name, email, type FROM users ORDER BY id`;

    await client.release();

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}

export async function fetchUser(id: string) {
  try {
    const client = await db.connect();
    const data =
      await client.sql<User>`SELECT id, name, email, type FROM users WHERE id=${id}`;

    await client.release();

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}
