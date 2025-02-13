"use client";

import { useRef } from "react";
import TextField from "@mui/material/TextField";
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
import SelectField from "@/app/components/SelectField";
import { Customer } from "@/app/types/customer";
import { User } from "@/app/types/user";
import { SelectChangeEvent } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

type CustomerForm = {
  customer: Customer;
  users: User[];
  error?: string | undefined;
  onSubmit: (payload: FormData) => void;
  isPending: boolean;
};

export default function CustomerForm({
  customer,
  users,
  error,
  onSubmit,
  isPending,
}: CustomerForm) {
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const handleChangeUser = (e: SelectChangeEvent) => {
    const userId = e.target.value;
    const name = users.find(({ id }) => id === userId)?.name;
    if (nameFieldRef.current) {
      nameFieldRef.current.value = name || "";
    }
  };
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
            <FormControl sx={{ marginBottom: 1 }}>
              <FormLabel>User</FormLabel>
              <SelectField
                fullWidth
                id="userId"
                name="userId"
                placeholder="User"
                options={users.map(({ id, name }) => ({ id, label: name }))}
                defaultValue={customer.userId || ""}
                disabled={customer.id !== "" && customer.userId !== null}
                onChange={handleChangeUser}
              />
              <FormHelperText>
                If the customer doesn&apos;t have an user, you may leave this
                field blank, but once it&apos;s set, it can&apos;t be changed.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="name">Name *</FormLabel>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                defaultValue={customer.name}
                placeholder="Name"
                inputRef={nameFieldRef}
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <FormLabel htmlFor="phone">Phone *</FormLabel>
              <TextField
                required
                fullWidth
                id="phone"
                name="phone"
                defaultValue={customer.phone}
                placeholder="Phone"
              />
            </FormControl>
          </Grid>
          <Grid size={8}>
            <FormControl>
              <FormLabel htmlFor="address">Address *</FormLabel>
              <TextField
                required
                fullWidth
                id="address"
                name="address"
                defaultValue={customer.address}
                placeholder="1st Street, 985"
              />
            </FormControl>
          </Grid>
          <Grid size={4} />
          <Grid size={8}>
            <input type="hidden" name="id" value={customer.id} />
          </Grid>
          <Grid size={4} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href="/admin/customers"
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
