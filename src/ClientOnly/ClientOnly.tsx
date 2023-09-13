import React, { useEffect, useState } from "react";

import { ClientOnlyProps } from "./ClientOnly.types";

/**
 * ClientOnly component is used to wrap a React component that cannot be server side rendered. For example, Plotly.js cannot be server side rendered so the LinePlot component is wrapped in ClientOnly.
 */
export default function ClientOnly({
  children,
  fallback = null
}: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <React.Fragment>{children}</React.Fragment> : fallback;
}
