export type UserAvatarProps = {
  color?: string;
  img?: string;
  name?: string;
};

declare const UserAvatar: React.FC<UserAvatarProps>;

declare const useColorMap: (names: string[]) => (name: string) => string;

export { UserAvatar, useColorMap };
