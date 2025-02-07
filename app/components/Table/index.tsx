import TableMUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "./Pagination";
import Link from "@/app/components/Link";
import { ReactNode } from "react";

// PS: To define the type of the object, it's needed to do so using a mapped type
// PS2: I'm letting this note for studies purposes, until I no longer need them
// type Data<Objetinho extends object> = {
//   [Chavinha in keyof Objetinho]: ReactNode;
// } & { id: string; };
type Data<T extends object> = {
  [K in keyof T]: ReactNode;
} & {
  id: string;
}; // mapped type from T

type Header<T extends object> = { field: keyof T & string; header: string };

type Table<T extends object> = {
  header: Header<T>[];
  data: Data<T>[];
  hasActions?: boolean;
  page?: number;
  getEditUrl?: (item: Data<T>) => string;
  deleteUrl?: string;
};

export default function Table<T extends object>({
  header,
  data,
  hasActions = true,
  page = 0,
  getEditUrl,
  deleteUrl = "/",
}: Table<T>) {
  return (
    <TableContainer component={Paper}>
      <TableMUI sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {header.map(({ field, header }) => (
              <TableCell key={field}>{header}</TableCell>
            ))}
            {hasActions && (
              <TableCell sx={{ paddingLeft: 3, width: "110px" }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {header.map(({ field }) => (
                <TableCell key={`${item.id}-${field}`}>
                  <Link href={getEditUrl ? getEditUrl(item) : "/"}>
                    {item[field]}
                  </Link>
                </TableCell>
              ))}
              {hasActions && (
                <TableCell>
                  <IconButton
                    size="small"
                    href={getEditUrl ? getEditUrl(item) : "/"}
                    sx={{ marginTop: "-9px", marginBottom: "-9px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    href={deleteUrl}
                    sx={{ marginTop: "-9px", marginBottom: "-9px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
      <Pagination page={page} count={data.length} />
    </TableContainer>
  );
}
