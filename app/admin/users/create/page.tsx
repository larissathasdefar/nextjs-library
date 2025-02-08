"use client";

import { useTransition, useState } from "react";
import Typography from "@mui/material/Typography";
import UserForm from "@/app/admin/users/UserForm";
import { createUser } from "@/app/actions/user";

export default function CreateUser() {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const handleCreateUser = (formData: FormData) => {
    startTransition(async () => {
      const error = await createUser(formData);
      setError(error);
    });
  };
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
        onSubmit={handleCreateUser}
        isPending={isPending}
      />
    </div>
  );
}
