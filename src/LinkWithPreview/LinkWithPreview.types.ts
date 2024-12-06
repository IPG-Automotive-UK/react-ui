import { LinkProps } from "@mui/material";

export type LinkWithPreviewProps = LinkProps & {
  content: React.ReactNode;
  children: React.ReactNode;
};
