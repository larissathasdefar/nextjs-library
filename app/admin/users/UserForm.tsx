"use client";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import FormHelperText from "@mui/material/FormHelperText";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { User } from "@/app/types/user";
import PasswordInput from "@/app/components/PasswordInput";

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const userTypes = [
  {
    value: "customer",
    label: "Customer",
  },
  {
    value: "employee",
    label: "Employee",
  },
];

type UserForm = {
  user: User;
  error?: string | undefined;
  onSubmit: (payload: FormData) => void;
  isPending: boolean;
};

export default function UserForm({
  user,
  error,
  onSubmit,
  isPending,
}: UserForm) {
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                defaultValue={user.name}
                placeholder="Name"
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <FormLabel>User type</FormLabel>
              <TextField
                required
                fullWidth
                select
                id="type"
                name="type"
                defaultValue={user.type || "customer"}
              >
                {userTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="your@email.com"
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <FormControl sx={{ marginBottom: 1 }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput
                fullWidth
                name="password"
                defaultValue={user?.password || ""}
                placeholder="••••••"
                id="password"
              />
              {user.id !== "" && (
                <FormHelperText>
                  This is an optional field. Fill this field to change the
                  password.
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <input type="hidden" name="id" value={user.id} />
          </Grid>
          <Grid size={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href="/admin/users"
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
