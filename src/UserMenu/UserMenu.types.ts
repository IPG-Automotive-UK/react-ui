export type UserMenuProps = {
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Name of currently logged in user.
   */
  username: string;
};
// type definitions for UserAvatar
export type UserAvatarProps = {
  username: string;
};
