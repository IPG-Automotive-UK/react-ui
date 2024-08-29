import type { IconButtonProps } from "@mui/material";

export type DialogTitleProps = {
  /**
   * Children of the component, i.e. the title to be displayed.
   */
  children?: React.ReactNode;
  /**
   * Callback fired when the user clicks on Close("X") button. If not provided, the close button will not be displayed.
   */
  onClose: IconButtonProps["onClick"];
};
