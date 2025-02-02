"use client";

import { useState, MouseEvent, ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import MenuMUI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type Options = { label: string; onClick?: () => void }[];
type Menu = {
  options: Options;
  children: ReactNode;
};

export default function Menu({ options, children }: Menu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (callback?: () => void) => {
    callback && callback();
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>{children}</IconButton>
      <MenuMUI anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        {options.map(({ label, onClick }) => (
          <MenuItem key={label} onClick={() => handleClose(onClick)}>
            {label}
          </MenuItem>
        ))}
      </MenuMUI>
    </>
  );
}
