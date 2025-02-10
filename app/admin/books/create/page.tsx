import Typography from "@mui/material/Typography";
import { fetchGenres } from "@/app/queries/genres";
import { fetchBookTypes } from "@/app/queries/bookTypes";
import Form from "./Form";

export default async function CreateBook() {
  const genres = await fetchGenres();
  const types = await fetchBookTypes();
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create book
      </Typography>

      <Form genres={genres} types={types} />
    </div>
  );
}
