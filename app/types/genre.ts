import { z } from "zod";

export type Genre = {
  id: string;
  name: string;
};

export const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CreateGenreSchema = GenreSchema.omit({ id: true });
