import { z } from "zod";

export type Book = {
  id: string;
  title: string;
  author: string;
  publicationDate: string;
  location: string;
  genreId: string;
  genre?: string;
  typeId: string;
  type?: string;
};

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  publicationDate: z.string(),
  location: z.string(),
  genreId: z.string(),
  typeId: z.string(),
});

export const CreateBookSchema = BookSchema.omit({ id: true });
