import { Box } from "@mui/material";
import { InfographicProps } from "./Infographic.types";
import LazyLoadCardMedia from "../../LazyLoadInfographic/LazyLoadCardMedia/LazyLoadCardMedia";
import React from "react";
import VersionChip from "../../VersionChip/VersionChip";

const Infographic = ({ media, version }: InfographicProps) => {
  return (
    <Box
      className="infographic-container"
      position={"relative"}
      sx={{
        display: "flex",
        justifyContent: "center",
        width: 368
      }}
    >
      <LazyLoadCardMedia
        CardMediaProps={{
          sx: {
            boxSizing: "content-box",
            height: 190,
            objectFit: "contain",
            padding: 200,
            width: 336
          }
        }}
        src={media}
      />
      {version ? (
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
          <Box padding={1} sx={{ maxWidth: 320 }}>
            <VersionChip version={version} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Infographic;
