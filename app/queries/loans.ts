import { db } from "@vercel/postgres";
import { Loan } from "@/app/types/loan";

export async function fetchLoans() {
  try {
    const client = await db.connect();
    const data = await client.sql<Loan>`SELECT
        loans.id,
        TO_CHAR(loans.loan_date, 'YYYY-MM-DD') AS "loanDate",
        TO_CHAR(loans.return_date, 'YYYY-MM-DD') AS "returnDate",
        loans.status,
        loans.book_id AS "bookId",
        books.title AS "book",
        loans.customer_id AS "customerId",
        customers.name AS "customer"
      FROM loans
      JOIN books ON loans.book_id = books.id
      JOIN customers ON loans.customer_id = customers.id
      ORDER BY loans.id`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch loans data.");
  }
}
