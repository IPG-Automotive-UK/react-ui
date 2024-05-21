import React, { Suspense, lazy } from "react";

import { TrafficSignProps } from "./TrafficSign.types";

const LazyImportedTrafficSign = lazy(() => import("./TrafficSign"));

/**
 * TrafficSign component wrapped in Suspense to prevent import errors.
 */
export default function TrafficSignClientOnly(props: TrafficSignProps) {
  return (
    <Suspense fallback={<div></div>}>
      <LazyImportedTrafficSign {...props} />
    </Suspense>
  );
}
