import { Box, CardMedia } from "@mui/material";
import React, { Fragment } from "react";

import { InfographicProps } from "./Infographic.types";

const Infographic = ({ media, versionChip }: InfographicProps) => {
  return (
    <Fragment>
      <Box
        position={"relative"}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 368
        }}
      >
        <CardMedia
          component="img"
          src={media}
          sx={{
            boxSizing: "content-box",
            height: 190,
            objectFit: "contain",
            padding: 2,
            width: 336
          }}
        />
        <Box
          position={"absolute"}
          display={"flex"}
          alignItems={"end"}
          sx={{
            height: 190,
            padding: 2,
            width: 336
          }}
        >
          <Box padding={1}>{versionChip}</Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Infographic;
