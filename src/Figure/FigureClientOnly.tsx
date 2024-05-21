import React, { Suspense, lazy } from "react";

import { FigureProps } from "./Figure.types";

const LazyImportedFigure = lazy(() => import("./Figure"));

/**
 * Figure component wrapped in Suspense to prevent import errors.
 */
export default function FigureClientOnly(props: FigureProps) {
  return (
    <Suspense fallback={null}>
      <LazyImportedFigure {...props} />
    </Suspense>
  );
}
