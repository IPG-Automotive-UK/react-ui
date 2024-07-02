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
   * The helper text to display.
   */
  helperText?: string;
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
