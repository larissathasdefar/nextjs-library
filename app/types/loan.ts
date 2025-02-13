import { z } from "zod";

export type Loan = {
  id: string;
  loanDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
  bookId: string;
  book?: string;
  customerId: string;
  customer?: string;
};

export const CreateLoanSchema = z.object({
  bookId: z.string().min(1, "Choose a book."),
  customerId: z.string().min(1, "Choose a customer."),
});

export const ReturnLoanSchema = z.object({
  id: z.string(),
});
