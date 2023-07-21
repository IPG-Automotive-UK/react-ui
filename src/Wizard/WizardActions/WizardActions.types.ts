export interface WizardActionsProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

export interface WizardActionButtonProps {
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * Callback function to handle click event
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
