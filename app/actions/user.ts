"use server";

import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { FormSchema } from "@/app/types/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateUser = FormSchema.omit({ id: true });

export async function createUser(formData: FormData) {
  // console.log(Object.fromEntries(formData.entries()));

  const { name, email, type, password } = CreateUser.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    type: formData.get("type"),
    password: formData.get("password"),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO users (name, email, password, type)
      VALUES (${name}, ${email}, ${hashedPassword}, ${type});
    `;
    await client.sql`COMMIT`;
  } catch (error) {
    await client.sql`ROLLBACK`;
    return;
  }

  // TODO: do I need revalidatePath to update the users list?
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function editUser(formData: FormData) {
  // console.log(Object.fromEntries(formData.entries()));
  // TODO: check if old password match

  const { id, name, email, type, password } = FormSchema.parse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    type: formData.get("type"),
    password: formData.get("password"),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      UPDATE users SET
        name="${name}",
        email="${email}",
        password="${hashedPassword}",
        type="${type}"
      WHERE id="${id}";
    `;
    await client.sql`COMMIT`;
  } catch (error) {
    await client.sql`ROLLBACK`;
    return;
  }

  // TODO: do I need revalidatePath to update the users list?
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
