import { Box } from "@mui/material";
import { LazyRenderProps } from "./LazyRender.types";
import React from "react";
import { useInView } from "react-intersection-observer";

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
