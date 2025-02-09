import { fetchCustomer } from "@/app/queries/customers";
import { fetchUsers } from "@/app/queries/users";
import Form from "./Form";

export default async function UpdateCustomer(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const customer = await fetchCustomer(id);
  const users = await fetchUsers();

  return <Form customer={customer} users={users} />;
}
