export interface UserMenuProps {
  /**
   * Callback fired when the user clicks on "Change password".
   */
  onChangePassword: (event: object) => void;
  /**
   * Callback fired when the user clicks on "Logout".
   */
  onLogout: (event: object) => void;
  /**
   * Name of currently logged in user.
   */
  username: string;
}

export interface UserAvatarProps {
  username: string;
}
