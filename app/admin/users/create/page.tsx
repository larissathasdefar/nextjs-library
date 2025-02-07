"use client";

import { useActionState } from "react";
import Typography from "@mui/material/Typography";
import UserForm from "@/app/admin/users/UserForm";

export default function CreateUser() {
  const [error, submitAction, isPending] = useActionState(() => {}, undefined);
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Create user
      </Typography>

      <UserForm
        user={{
          id: "",
          name: "",
          email: "",
          type: "customer",
          password: "",
        }}
        error={error}
        submitAction={submitAction}
        isPending={isPending}
      />
    </div>
  );
}
