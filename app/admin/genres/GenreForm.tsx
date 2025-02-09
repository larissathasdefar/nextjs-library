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
import { Genre } from "@/app/types/genre";

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

type GenreForm = {
  genre: Genre;
  error?: string | undefined;
  onSubmit: (payload: FormData) => void;
  isPending: boolean;
};

export default function GenreForm({
  genre,
  error,
  onSubmit,
  isPending,
}: GenreForm) {
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
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="name">Name *</FormLabel>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                defaultValue={genre.name}
                placeholder="Name"
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <input type="hidden" name="id" value={genre.id} />
          </Grid>
          <Grid size={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href="/admin/genres"
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
