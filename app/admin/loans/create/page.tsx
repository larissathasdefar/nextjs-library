import Typography from "@mui/material/Typography";
import { fetchCustomers } from "@/app/queries/customers";
import { fetchBooksForSelect } from "@/app/queries/books";
import Form from "./Form";

export default async function CreateLoan() {
  const [customers, books] = await Promise.all([
    fetchCustomers(),
    fetchBooksForSelect(),
  ]);
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create loan
      </Typography>

      <Form customers={customers} books={books} />
    </div>
  );
}
