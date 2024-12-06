import { LinkProps } from "@mui/material";

/**
 * Type of the props of `LinkWithPreview`
 */
export type LinkWithPreviewProps = Pick<
  LinkProps,
  "href" | "sx" | "variant"
> & {
  /**
   * The type of the content to be displayed on hover in the popper
   */
  content: React.ReactNode;
  /**
   * The type of the child
   */
  children: React.ReactNode;
};
