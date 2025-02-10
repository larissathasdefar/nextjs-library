"use client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { Book } from "@/app/types/book";
import { Genre } from "@/app/types/genre";
import { BookType } from "@/app/types/bookType";
import SelectField from "@/app/components/SelectField";

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

type BookForm = {
  book: Book;
  genres: Genre[];
  types: BookType[];
  error?: string | undefined;
  onSubmit: (payload: FormData) => void;
  isPending: boolean;
};

export default function BookForm({
  book,
  genres,
  types,
  error,
  onSubmit,
  isPending,
}: BookForm) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "700px",
      }}
    >
      <Card variant="outlined">
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormControl>
              <FormLabel htmlFor="title">Title *</FormLabel>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                defaultValue={book.title}
                placeholder="Title"
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl>
              <FormLabel htmlFor="author">Author *</FormLabel>
              <TextField
                required
                fullWidth
                id="author"
                name="author"
                defaultValue={book.author}
                placeholder="Author"
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl>
              <FormLabel htmlFor="genre">Genre *</FormLabel>
              <SelectField
                fullWidth
                id="genreId"
                name="genreId"
                defaultValue={book.genreId}
                placeholder="Genre"
                options={genres.map(({ id, name }) => ({ id, label: name }))}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl>
              <FormLabel htmlFor="typeId">Type *</FormLabel>
              <SelectField
                fullWidth
                id="typeId"
                name="typeId"
                defaultValue={book.typeId}
                placeholder="Select a publication type"
                options={types.map(({ id, name }) => ({ id, label: name }))}
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <FormLabel htmlFor="publicationDate">
                Publication date *
              </FormLabel>
              <TextField
                required
                fullWidth
                id="publicationDate"
                name="publicationDate"
                type="date"
                defaultValue={book.publicationDate}
                placeholder="Publication date"
              />
            </FormControl>
          </Grid>
          <Grid size={8} />
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="location">Location *</FormLabel>
              <TextField
                required
                fullWidth
                id="location"
                name="location"
                defaultValue={book.location}
                placeholder="Corridor 5, top shelf"
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <input type="hidden" name="id" value={book.id} />
          </Grid>
          <Grid size={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href="/admin/books"
              variant="contained"
              disabled={isPending}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </Grid>
          {error && <Typography>{error}</Typography>}
        </Grid>
      </Card>
    </Box>
  );
}
