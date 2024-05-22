import React, { Suspense, lazy } from "react";

import { RoadMarkingProps } from "./RoadMarking.types";

const LazyImportedRoadMarking = lazy(() => import("./RoadMarking"));

/**
 * RoadMarking component wrapped in suspense to avoid import problems with canvas
 */
export default function RoadMarkingClientOnly(props: RoadMarkingProps) {
  return (
    <Suspense fallback={null}>
      <LazyImportedRoadMarking {...props} />
    </Suspense>
  );
}
