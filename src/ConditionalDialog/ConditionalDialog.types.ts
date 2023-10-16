import { DialogTitleProps } from "../DialogTitle";

export type ConditionalDialogProps = {
  condition: boolean;
  onClose: DialogTitleProps["onClose"];
  children: React.ReactNode;
  title?: React.ReactNode;
};
