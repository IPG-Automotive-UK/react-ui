import React, { Suspense, lazy } from "react";

import { BulletGaugeProps } from "./BulletGauge.types";
import ClientOnly from "../ClientOnly/index.js";

const LazyImportedBulletGauge = lazy(() => import("./BulletGauge.js"));

/**
 * BulletGauge component wrapped in ClientOnly for use with server side rendering.
 */
export default function BulletGaugeClientOnly(props: BulletGaugeProps) {
  return (
    <ClientOnly>
      <Suspense fallback={<span>Loading...</span>}>
        <LazyImportedBulletGauge {...props} />
      </Suspense>
    </ClientOnly>
  );
}
