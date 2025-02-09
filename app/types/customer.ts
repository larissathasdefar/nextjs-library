import { z } from "zod";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  userId?: string;
};

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  userId: z.string().optional(),
});

export const CreateCustomerSchema = CustomerSchema.omit({ id: true });
