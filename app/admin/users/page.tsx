import Typography from "@mui/material/Typography";
import { fetchUsers } from "@/app/queries/users";
import Table from "@/app/components/Table";

export default async function Users() {
  const users = await fetchUsers();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Typography gutterBottom variant="h4">
        Users
      </Typography>
      <Table
        header={[
          { field: "name", header: "Name" },
          { field: "email", header: "Email" },
          { field: "type", header: "Type" },
        ]}
        data={users}
      />
    </div>
  );
}
