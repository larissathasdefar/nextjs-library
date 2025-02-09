import { z } from "zod";

export type BookType = {
  id: string;
  name: string;
};

export const BookTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CreateBookTypeSchema = BookTypeSchema.omit({ id: true });
