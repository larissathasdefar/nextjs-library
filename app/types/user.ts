import { z } from "zod";

export type User = {
  id: string;
  name: string;
  email: string;
  type: "employee" | "customer";
};

export const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  type: z.enum(["employee", "customer"]),
  password: z.string(),
});
