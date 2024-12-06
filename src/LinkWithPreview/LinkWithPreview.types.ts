import { LinkProps } from "@mui/material";

export type LinkWithPreviewProps = Pick<
  LinkProps,
  "href" | "sx" | "variant"
> & {
  content: React.ReactNode;
  children: React.ReactNode;
};
