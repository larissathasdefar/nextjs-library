"use server";

import { db } from "@vercel/postgres";
import { CreateCustomerSchema, CustomerSchema } from "@/app/types/customer";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData: FormData) {
  const parsedData = CreateCustomerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    userId: formData.get("userId"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { name, phone, address, userId } = parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO customers (name, phone, address, user_id)
      VALUES (${name}, ${phone}, ${address}, ${userId === "" ? null : userId});
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/customers");
}

export async function editCustomer(formData: FormData) {
  const parsedData = CustomerSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    userId: formData.get("userId"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { id, name, phone, address, userId } = parsedData.data;

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
        UPDATE customers SET
          name = ${name},
          phone = ${phone},
          address = ${address},
          user_id = ${userId === "" ? null : userId}
        WHERE id = ${id};
      `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/customers");
}

export async function deleteCustomer(id: string) {
  if (!id) return "No id was passed.";

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      DELETE FROM customers WHERE id = ${id}
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  revalidatePath("/admin/customers");
}
