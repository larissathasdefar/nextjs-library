"use client";

import TablePagination from "@mui/material/TablePagination";

export default function Pagination({
  count,
  page = 0,
}: {
  count: number;
  page?: number;
}) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={25}
      rowsPerPageOptions={[25]}
      onPageChange={() => {
        console.log("changed page, change url?");
      }}
    />
  );
}
