"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import { User } from "@/app/types/user";
import UserForm from "@/app/admin/users/UserForm";
import { editUser } from "@/app/actions/user";

export default function Form({ user }: { user: User }) {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleUpdateUser = (formData: FormData) => {
    startTransition(async () => {
      const error = await editUser(formData);
      setError(error);
    });
  };
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Update user
      </Typography>

      <UserForm
        user={user}
        error={error}
        onSubmit={handleUpdateUser}
        isPending={isPending}
      />
    </div>
  );
}
