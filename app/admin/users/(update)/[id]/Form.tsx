"use client";

import { useActionState } from "react";
import Typography from "@mui/material/Typography";
import { User } from "@/app/types/user";
import UserForm from "@/app/admin/users/UserForm";

export default function Form({ user }: { user: User }) {
  const [error, submitAction, isPending] = useActionState(() => {}, undefined);
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update user
      </Typography>

      <UserForm
        user={user}
        error={error}
        submitAction={submitAction}
        isPending={isPending}
      />
    </div>
  );
}
