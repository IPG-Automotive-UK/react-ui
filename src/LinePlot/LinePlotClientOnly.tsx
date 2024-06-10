import React, { Suspense, lazy } from "react";

import ClientOnly from "../ClientOnly";
import { LinePlotProps } from "./LinePlot.types";

const LazyImportedLinePlot = lazy(() => import("./LinePlot"));

/**
 * LinePlot component wrapped in ClientOnly for use with server side rendering.
 */
export default function LinePlotClientOnly(props: LinePlotProps) {
  return (
    <ClientOnly>
      <Suspense fallback={<p>Loading...</p>}>
        <LazyImportedLinePlot {...props} />
      </Suspense>
    </ClientOnly>
  );
}
