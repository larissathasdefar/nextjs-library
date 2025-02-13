"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import SelectField from "@/app/components/SelectField";
import { Book } from "@/app/types/book";
import { Customer } from "@/app/types/customer";

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

type LoanForm = {
  customers: Customer[];
  books: Book[];
  error?: string | undefined;
  onSubmit: (payload: FormData) => void;
  isPending: boolean;
};

export default function LoanForm({
  customers,
  books,
  error,
  onSubmit,
  isPending,
}: LoanForm) {
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
              <FormLabel htmlFor="customerId">Customer *</FormLabel>
              <SelectField
                fullWidth
                required
                id="customerId"
                name="customerId"
                placeholder="Customer"
                defaultValue=""
                options={customers.map(({ id, name }) => ({ id, label: name }))}
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="bookId">Book *</FormLabel>
              <SelectField
                fullWidth
                required
                id="bookId"
                name="bookId"
                placeholder="Book"
                options={books.map(({ id, title }) => ({ id, label: title }))}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8} />
          <Grid size={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href="/admin/loans"
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
