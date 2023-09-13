import ClientOnly from "../ClientOnly";
import LinePlot from ".";
import { LinePlotProps } from "./LinePlot.types";
import React from "react";

/**
 * LinePlot component wrapped in ClientOnly for use with server side rendering.
 */
export default function LinePlotClientOnly(props: LinePlotProps) {
  return (
    <ClientOnly>
      <LinePlot {...props} />
    </ClientOnly>
  );
}
