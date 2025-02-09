import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { fetchBookTypes } from "@/app/queries/bookTypes";
import ListBookTypes from "./ListBookTypes";

export default async function BookTypes() {
  const bookTypes = await fetchBookTypes();
  // TODO: add skeleton on the data table with suspense
  // TODO: add search and pagination
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography gutterBottom variant="h4">
          BookTypes
        </Typography>
        <Button href="/admin/book-types/create">+ Create book-type</Button>
      </Stack>
      <ListBookTypes bookTypes={bookTypes} />
    </div>
  );
}
