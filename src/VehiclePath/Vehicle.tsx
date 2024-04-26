import { Rect, Text } from "react-konva";

import React from "react";
import type { VehicleProps } from "./VehiclePath.types";

const Vehicle: React.FC<VehicleProps> = (
  { height = 5, width = 2, x, y, yaw, color = "#5E8AB4", label },
  key
) => {
  const rotation = ((yaw * 180) / Math.PI - 90) * -1;
  return (
    <>
      <Rect
        x={x}
        y={y}
        offsetX={width / 2}
        offsetY={height}
        width={width}
        height={height}
        rotation={rotation}
        key={key}
        fill={color}
      />
      {/* Only render text if label given */}
      {label && (
        <Text
          text={label}
          width={5}
          height={3}
          wrap="char"
          ellipsis={true}
          x={x}
          y={y}
          offset={{
            x: 2.5,
            y: 0
          }}
          rotation={rotation}
          verticalAlign="top"
          align="center"
          fontSize={1.5}
        />
      )}
    </>
  );
};

export default Vehicle;
