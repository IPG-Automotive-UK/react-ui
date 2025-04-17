import { Box } from "@mui/material";
import { LazyLoadProps } from "./LazyLoad.types";
import React from "react";
import { useInView } from "react-intersection-observer";

const LazyLoad = ({ children, sx }: LazyLoadProps) => {
  // This component is lazy loaded
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  return (
    <Box ref={ref} sx={sx}>
      {inView ? (
        <>{children}</>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </Box>
  );
};

export default LazyLoad;
