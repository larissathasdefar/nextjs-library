"use client";

import { useActionState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";

import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

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

export default function UpdateUser() {
  const [error, submitAction, isPending] = useActionState(() => {}, undefined);
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update user
      </Typography>

      <Box
        component="form"
        action={submitAction}
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
                  type="name"
                  name="name"
                  placeholder="Name"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid size={4}>
              <FormControl>
                <FormLabel htmlFor="type">User type</FormLabel>
                <TextField
                  required
                  fullWidth
                  select
                  id="type"
                  defaultValue="customer"
                  name="type"
                  variant="outlined"
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
                  placeholder="your@email.com"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid size={4} />
            <Grid size={8}>
              <FormControl sx={{ marginBottom: 1 }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid size={4} />
            <Grid size={8} />
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
                Save
              </Button>
            </Grid>
            {/* {error && <p>{error}</p>} */}
          </Grid>
        </Card>
      </Box>
    </div>
  );
}
