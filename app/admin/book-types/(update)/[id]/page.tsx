import { fetchBookType } from "@/app/queries/bookTypes";
import Form from "./Form";

export default async function UpdateBookType(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const bookType = await fetchBookType(id);

  return <Form bookType={bookType} />;
}
