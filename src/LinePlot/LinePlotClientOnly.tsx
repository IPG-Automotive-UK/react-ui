import React, { Suspense, lazy } from "react";

import ClientOnly from "../ClientOnly";
import { LinePlotProps } from "./LinePlot.types";

/**
 * LinePlot component wrapped in ClientOnly for use with server side rendering.
 */
export default function LinePlotClientOnly(props: LinePlotProps) {
  const LazyImportedLinePlot = lazy(() => import("./LinePlot"));
  return (
    <ClientOnly>
      <Suspense fallback={<p>Loading...</p>}>
        <LazyImportedLinePlot {...props} />
      </Suspense>
    </ClientOnly>
  );
}
