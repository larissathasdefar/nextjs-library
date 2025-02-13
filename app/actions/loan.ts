"use server";

import { db } from "@vercel/postgres";
import { format, addDays } from "date-fns";
import { CreateLoanSchema } from "@/app/types/loan";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createLoan(formData: FormData) {
  const parsedData = CreateLoanSchema.safeParse({
    bookId: formData.get("bookId"),
    customerId: formData.get("customerId"),
  });

  if (!parsedData.success) {
    return parsedData.error?.errors[0].message;
  }

  const { bookId, customerId } = parsedData.data;

  const today = new Date();
  const loanDate = format(today, "y-MM-dd");
  const returnDate = format(addDays(today, 7), "y-MM-dd");

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      INSERT INTO loans (loan_date, return_date, book_id, customer_id, status)
      VALUES (${loanDate}, ${returnDate}, ${bookId}, ${customerId}, 'borrowed');
    `;
    await client.sql`COMMIT`;
  } catch (e) {
    console.log(e);
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  redirect("/admin/loans");
}

export async function returnBook(id: string) {
  if (!id) return "No id was passed.";

  const today = new Date();
  const returnDate = format(addDays(today, 7), "y-MM-dd");

  const client = await db.connect();
  try {
    await client.sql`BEGIN`;
    await client.sql`
      UPDATE loans SET return_date = ${returnDate}, status = 'returned' WHERE id = ${id};
    `;
    await client.sql`COMMIT`;
  } catch {
    await client.sql`ROLLBACK`;
    return "Something went wrong!";
  }

  revalidatePath("/admin/loans");
}
