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

type Data<T extends object> = { [k in keyof T & string]: string | number } & {
  id: string;
}; // mapped type from T

type Header<T extends object> = { field: keyof T & string; header: string };

type Table<T extends object> = {
  header: Header<T>[];
  data: Data<T>[];
  hasActions?: boolean;
  page?: number;
  editUrl?: string;
  deleteUrl?: string;
};

export default function Table<T extends object>({
  header,
  data,
  hasActions = true,
  page = 0,
  editUrl = "/",
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
              <TableCell sx={{ paddingLeft: 3 }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {header.map(({ field }) => (
                <TableCell
                  key={`${item.id}-${field}`}
                  sx={{ textTransform: "capitalize" }}
                >
                  <Link href={editUrl}>{item[field]}</Link>
                </TableCell>
              ))}
              {hasActions && (
                <TableCell>
                  <IconButton
                    size="small"
                    href={editUrl}
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
