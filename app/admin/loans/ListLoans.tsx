"use client";

import { startTransition } from "react";
import Button from "@mui/material/Button";
import Table from "@/app/components/Table";
import { Loan } from "@/app/types/loan";
import { returnBook } from "@/app/actions/loan";

const loanStatus = {
  borrowed: "Borrowed",
  returned: "Returned",
};

export default function ListLoans({ loans }: { loans: Loan[] }) {
  const returnItem = (id: string) => {
    startTransition(async () => {
      const error = await returnBook(id);
      if (error) {
        console.log(error);
        alert("Something went wrong!");
        return;
      }
    });
  };

  return (
    <Table
      header={[
        { field: "customer", header: "Customer" },
        { field: "loanDate", header: "Loan date" },
        { field: "returnDate", header: "Return date" },
        { field: "book", header: "Book" },
        { field: "status", header: "Status" },
      ]}
      data={loans.map(({ status, ...others }) => ({
        ...others,
        status: loanStatus[status],
      }))}
      renderActions={(item) => (
        <Button
          size="small"
          variant="contained"
          disabled={item.status !== "Borrowed"}
          onClick={() => returnItem(item.id)}
        >
          {item.status === "Borrowed" ? "Return book" : "No actions"}
        </Button>
      )}
      actionsWidth="125px"
    />
  );
}
