export interface ActionDialogProps {
  /**
   * The text of the cancel button.
   * */
  cancelText?: string;
  /**
   * The content of the dialog. Valid react element can be used.
   */
  content: React.ReactNode;
  /**
   * Callback fired when cancel button clicked.
   */
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Callback fired when save button clicked.
   */
  onSaveClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * If true, the dialog is open.
   * */
  open?: boolean;
  /**
   * If true, save button will be disabled.
   */
  saveDisabled?: boolean;
  /**
   * The text of the save button.
   * @default "Save"
   * */
  saveText?: string;
  /**
   * If true, shows close icon in dialog title
   */
  showCloseIcon?: boolean;
  /**
   * The title of the dialog.
   * */
  title?: string;
  /**
   * The width of the dialog. Valid css width can be used.
   */
  width?: string;
}
