import { ReactNode } from "react";

export type WizardStepProps = {
  /**
   * If true, the step is marked as completed. Is normally set by the WizardSteps parent component.
   */
  completed?: boolean;
  /**
   * If true, the step is marked as errored.
   */
  error?: boolean;
  /**
   * The error text to display.
   * If this prop is set, the helperText prop is ignored.
   */
  errorText?: ReactNode;
  /**
   * The helper text to display.
   * If the errorText prop is set, this prop is ignored.
   */
  helperText?: ReactNode;
  /**
   * The index of the step. Normally set by the WizardSteps parent component.
   */
  index?: number;
  /**
   * The label displayed in the step icon.
   */
  label: string;
  /**
   * If true, the step is marked as last. Normally set by the WizardSteps parent component.
   */
  last?: boolean;
};
