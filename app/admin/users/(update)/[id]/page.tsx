import { fetchUser } from "@/app/queries/users";
import Form from "./Form";

export default async function UpdateUser(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const user = await fetchUser(id);

  return <Form user={user} />;
}
