import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchUsers } from "@/app/queries/users";
import ListUsers from "./ListUsers";

export default async function Users() {
  const users = await fetchUsers();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          Users
        </Typography>
        <Button href="/admin/users/create">+ Create user</Button>
      </Stack>
      <ListUsers users={users} />
    </div>
  );
}
