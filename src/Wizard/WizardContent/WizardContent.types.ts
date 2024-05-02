import { PropsWithChildren } from "react";

export type WizardContentProps = PropsWithChildren & {
  ref?: React.Ref<HTMLDivElement>;
};
