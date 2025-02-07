import { z } from "zod";

export type User = {
  id: string;
  name: string;
  email: string;
  type: "employee" | "customer";
  password?: string;
};

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  type: z.enum(["employee", "customer"]),
  password: z.string().min(6, "The password must have at least 6 characters."),
});

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  type: z.enum(["employee", "customer"]),
  password: z
    .string()
    .min(6, "The password must have at least 6 characters.")
    .optional()
    .or(z.literal("")),
});
