import { db } from "@vercel/postgres";
import { User } from "@/app/types/user";

// TODO: should I use a single types file or should I bring it to its fetch file?
//          what about the zod validation?

export async function fetchUsers() {
  try {
    const client = await db.connect();
    const data =
      await client.sql<User>`SELECT id, name, email, type FROM users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}
