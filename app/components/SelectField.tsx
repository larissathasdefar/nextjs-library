"use client";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Placeholder = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  opacity: "0.7",
}));

type Options = { id: string; label: string }[];

type CustomProps = { placeholder: string; options: Options };

export default function SelectField<K>(props: SelectProps<K> & CustomProps) {
  const { options, placeholder } = props;
  if (options.length === 0) {
    console.error("Suply an option array.");
    return null;
  }
  return (
    <Select
      displayEmpty
      renderValue={(value: K) => {
        if (!value) {
          return <Placeholder>{placeholder}</Placeholder>;
        }

        return options.find(({ id }) => id === value)?.label || "";
      }}
      {...props}
    >
      {options.map(({ id, label }) => (
        <MenuItem key={id} value={id}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}
