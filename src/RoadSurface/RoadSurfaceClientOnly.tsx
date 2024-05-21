import React, { Suspense, lazy } from "react";

import { RoadSurfaceProps } from "./RoadSurface.types";

const LazyImportedRoadSurface = lazy(() => import("./RoadSurface"));

/**
 * RoadSurface component wrapped in Suspense to prevent import errors.
 */
export default function RoadSurfaceClientOnly(props: RoadSurfaceProps) {
  return (
    <Suspense fallback={null}>
      <LazyImportedRoadSurface {...props} />
    </Suspense>
  );
}
