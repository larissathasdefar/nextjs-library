import { db } from "@vercel/postgres";
import { Customer } from "@/app/types/customer";

export async function fetchCustomers() {
  try {
    const client = await db.connect();
    const data =
      await client.sql<Customer>`SELECT id, name, phone, address, user_id AS "userId" FROM customers ORDER BY id`;

    await client.release();

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers data.");
  }
}

export async function fetchCustomer(id: string) {
  try {
    const client = await db.connect();
    const data =
      await client.sql<Customer>`SELECT id, name, phone, address, user_id AS "userId" FROM customers WHERE id=${id}`;

    await client.release();

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer data.");
  }
}
