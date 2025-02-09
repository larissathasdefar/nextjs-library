import Typography from "@mui/material/Typography";
import { fetchUsers } from "@/app/queries/users";
import Form from "./Form";

export default async function CreateCustomer() {
  const users = await fetchUsers();
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create customer
      </Typography>

      <Form users={users} />
    </div>
  );
}
