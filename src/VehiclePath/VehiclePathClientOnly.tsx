import React, { Suspense, lazy } from "react";

import { VehiclePathProps } from "./VehiclePath.types";

const LazyImportedVehiclePath = lazy(() => import("./VehiclePath"));

/**
 * VehiclePath component wrapped in suspense to avoid import problems with canvas
 */
export default function VehiclePathClientOnly(props: VehiclePathProps) {
  return (
    <Suspense fallback={null}>
      <LazyImportedVehiclePath {...props} />
    </Suspense>
  );
}
