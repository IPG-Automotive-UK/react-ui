declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
// Array.isArray does not handle readonly arrays out of the box.
// https://github.com/microsoft/TypeScript/issues/17002
// eslint-disable-next-line no-unused-vars
interface ArrayConstructor {
  isArray(arg: unknown): arg is unknown[] | readonly unknown[];
}
