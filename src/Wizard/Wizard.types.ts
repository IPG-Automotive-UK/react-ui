import { ReactNode } from "react";

export type WizardProps = {
  /**
   * Children. Should be WizardSteps, WizardContent, and WizardActions components in that order.
   */
  children?: ReactNode;
  /**
   * Maximum width of the content. This includes the title, steps, and content, but not the actions. Default is taken from the parent theme (layout.content.maxWidth).
   */
  maxWidth?: string | number;
  /**
   * Wizard title
   */
  title?: string | JSX.Element;
};

export type WizardThemeOverrideProps = {
  /**
   * Children
   */
  children: ReactNode;
  /**
   * Maximum width of the content. This includes the title, steps, and content, but not the actions. Default is taken from the parent theme (layout.content.maxWidth).
   */
  maxWidth?: string | number;
};
