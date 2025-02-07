"use server";

import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { CreateUserSchema, UpdateUserSchema } from "@/app/types/user";
import { redirect } from "next/navigation";

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
  const parsedData = CreateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    type: formData.get("type"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { name, email, type, password } = parsedData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO users (name, email, password, type)
      VALUES (${name}, ${email}, ${hashedPassword}, ${type});
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }
  // TODO: move queries to its own folder?

  redirect("/admin/users");
}

export async function editUser(
  prevState: string | undefined,
  formData: FormData
) {
  // TODO: check if old password match

  const parsedData = UpdateUserSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
    type: formData.get("type"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { id, name, email, type, password } = parsedData.data;

  const hashedPassword =
    password === "" ? "" : await bcrypt.hash(password || "", 10);

  const client = await db.connect();
  try {
    // TODO: for some reason when I try to interpolate password to use only one query it does not work
    //       I need to check why is behaving like that
    if (password === "") {
      await client.sql`BEGIN`;
      await client.sql`
        UPDATE users SET
          name = ${name},
          email = ${email},
          type = ${type}
        WHERE id = ${id};
      `;
      await client.sql`COMMIT`;
    } else {
      await client.sql`BEGIN`;
      await client.sql`
      UPDATE users SET
        name = ${name},
        email = ${email},
        type = ${type},
        password = ${hashedPassword}
      WHERE id = ${id};
    `;
      await client.sql`COMMIT`;
    }
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/users");
}
