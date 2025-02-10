import { fetchBook } from "@/app/queries/books";
import { fetchGenres } from "@/app/queries/genres";
import { fetchBookTypes } from "@/app/queries/bookTypes";
import Form from "./Form";

export default async function UpdateBook(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const book = await fetchBook(id);
  const genres = await fetchGenres();
  const types = await fetchBookTypes();

  return <Form book={book} genres={genres} types={types} />;
}
