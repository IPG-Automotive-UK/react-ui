/**
 * Type of user
 */
export type User = {
  /**
   * The name of the user
   */
  name: string;
  /**
   * The email of the user
   */
  email: string;
};

export type UserMenuProps = {
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * The user details.
   */
  user: User;
};
// type definitions for UserAvatar
export type UserAvatarProps = {
  username: string;
};
