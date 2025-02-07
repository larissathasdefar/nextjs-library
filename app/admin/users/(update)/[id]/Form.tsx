"use client";

import { useActionState } from "react";
import Typography from "@mui/material/Typography";
import { User } from "@/app/types/user";
import UserForm from "@/app/admin/users/UserForm";
import { editUser } from "@/app/actions/user";

export default function Form({ user }: { user: User }) {
  const [error, submitAction, isPending] = useActionState(editUser, undefined);
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
