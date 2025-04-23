import { Box } from "@mui/material";
import { LazyRenderProps } from "./LazyRender.types";
import React from "react";
import { useInView } from "react-intersection-observer";

/**
 * LazyRender is a generic wrapper component that defers rendering its children
 * until it enters the viewport. Useful for performance optimization of heavy components
 * like charts, tables, or large DOM trees.
 *
 * @param LazyRenderProps The input object of the component
 * @param LazyRenderProps.children ReactNode The content to render when the component is in view
 * @param LazyRenderProps.fallback ReactNode Optional fallback to render while the component is not yet in view
 * @param LazyRenderProps.sx SxProps Optional styling applied to the container Box
 */
const LazyRender = ({ children, sx, fallback }: LazyRenderProps) => {
  // This component is lazy loaded
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  return (
    <Box ref={ref} sx={sx}>
      {inView
        ? children
        : fallback || (
            <div>
              <p>Loading...</p>
            </div>
          )}
    </Box>
  );
};

export default LazyRender;
