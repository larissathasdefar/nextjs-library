import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchBooks } from "@/app/queries/books";
import ListBooks from "./ListBooks";

export default async function Books() {
  const books = await fetchBooks();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          Books
        </Typography>
        <Button href="/admin/books/create">+ Create book</Button>
      </Stack>
      <ListBooks books={books} />
    </div>
  );
}
