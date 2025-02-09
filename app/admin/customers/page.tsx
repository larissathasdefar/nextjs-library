import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchCustomers } from "@/app/queries/customers";
import ListCustomers from "./ListCustomers";

export default async function Customers() {
  const customers = await fetchCustomers();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          Customers
        </Typography>
        <Button href="/admin/customers/create">+ Create customer</Button>
      </Stack>
      <ListCustomers customers={customers} />
    </div>
  );
}
