export type DialogTitleProps = {
  children?: React.ReactNode;
  onClose?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

declare const DialogTitle: React.FC<DialogTitleProps>;

export { DialogTitle };
