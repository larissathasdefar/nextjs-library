"use client";

import { ReactNode } from "react";
import LinkNext from "next/link";
import { styled } from "@mui/material/styles";

type Link = {
  href: string;
  children: ReactNode;
};

const StyledLink = styled(LinkNext)`
  color: inherit;
  text-decoration: none;
`;

export default function Link({ href, children }: Link) {
  return <StyledLink href={href}>{children}</StyledLink>;
}
