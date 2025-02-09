import { fetchGenre } from "@/app/queries/genres";
import Form from "./Form";

export default async function UpdateGenre(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const genre = await fetchGenre(id);

  return <Form genre={genre} />;
}
