import DialogTitle from "./DialogTitle";

export type DialogTitleProps = {
  children?: React.ReactNode;
  onClose?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export default DialogTitle as React.FC<DialogTitleProps>;
