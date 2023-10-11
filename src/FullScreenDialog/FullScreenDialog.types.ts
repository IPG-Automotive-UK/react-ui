export type FullScreenDialogProps = {
  condition: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
};
