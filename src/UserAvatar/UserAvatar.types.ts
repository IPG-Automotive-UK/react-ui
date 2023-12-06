import { SxProps, Theme } from "@mui/material";

export type UserAvatarProps = {
  /**
   * Icon background color
   */
  color?: string;
  /**
   * Display Image
   */
  img?: string;
  /**
   * Display Name
   */
  name?: string;
  /**
   * Styling
   */
  sx?: SxProps<Theme>;
};
