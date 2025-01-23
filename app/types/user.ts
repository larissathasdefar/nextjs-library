export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: "employee" | "customer";
};
