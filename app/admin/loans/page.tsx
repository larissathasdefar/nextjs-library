import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchLoans } from "@/app/queries/loans";
import ListLoans from "./ListLoans";

export default async function Loans() {
  const loans = await fetchLoans();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          Loans
        </Typography>
        <Button href="/admin/loans/create">+ Create loan</Button>
      </Stack>
      <ListLoans loans={loans} />
    </div>
  );
}
