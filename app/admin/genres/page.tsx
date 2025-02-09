import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchGenres } from "@/app/queries/genres";
import ListGenres from "./ListGenres";

export default async function Genres() {
  const genres = await fetchGenres();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          Genres
        </Typography>
        <Button href="/admin/genres/create">+ Create genre</Button>
      </Stack>
      <ListGenres genres={genres} />
    </div>
  );
}
