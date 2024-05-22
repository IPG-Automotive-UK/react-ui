import React, { Suspense, lazy } from "react";

import { TrafficLightProps } from "./TrafficLight.types";

const LazyImportedTrafficLight = lazy(() => import("./TrafficLight"));

/**
 * TrafficLight component wrapped in Suspense to prevent import errors.
 */
export default function TrafficLightClientOnly(props: TrafficLightProps) {
  return (
    <Suspense fallback={null}>
      <LazyImportedTrafficLight {...props} />
    </Suspense>
  );
}
