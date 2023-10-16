import React, { Suspense, lazy } from "react";

import ClientOnly from "../ClientOnly";
import { SurfacePlotProps } from "./SurfacePlot.types";

const LazyImportedSurfacePlot = lazy(() => import("./SurfacePlot"));

/**
 * SurfacePlot component wrapped in ClientOnly for use with server side rendering.
 */
export default function SurfacePlotClientOnly(props: SurfacePlotProps) {
  return (
    <ClientOnly>
      <Suspense fallback={<span>Loading plot...</span>}>
        <LazyImportedSurfacePlot {...props} />
      </Suspense>
    </ClientOnly>
  );
}
