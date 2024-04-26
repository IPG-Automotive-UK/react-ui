import { Line } from "react-konva";
import Marker from "./Marker";
import React from "react";
import Vehicle from "./Vehicle";
import { VehiclePathProps } from "./VehiclePath.types";

const VehiclePath: React.FC<VehiclePathProps> = (
  { path, index = 0, vehicle, showPath = true },
  key
) => {
  // compute current x,y and yaw values
  const x = path.x[index];
  const y = path.y[index] * -1;
  const yaw = path.yaw ? path.yaw[index] ?? 0 : 0;

  return (
    <>
      {/* Only show path/trajectory if showPath flag is 'true' */}
      {showPath ? (
        <Line
          key={key}
          strokeWidth={path.strokeWidth ?? 0.1}
          scaleY={-1}
          stroke={path.color ?? "#5E8AB4"}
          // zip the x and y points --> [x0, y0, x1, y1...]
          points={path.x.flatMap((e, i) => [e, path.y[i]])}
        />
      ) : null}
      {/* Render vehicle if vehicle exists and is type 'Vehicle' */}
      {vehicle && "height" in vehicle ? (
        <Vehicle
          key={`vehicle_${key}`}
          x={x}
          y={y}
          yaw={yaw}
          height={vehicle.height}
          width={vehicle.width}
          color={vehicle.color}
          label={vehicle.label}
        />
      ) : null}
      {/* Render marker if vehicle defined and is type 'Marker' */}
      {vehicle && "radius" in vehicle ? (
        <Marker
          key={`marker_${key}`}
          x={x}
          y={y}
          radius={vehicle.radius}
          color={vehicle.color}
        />
      ) : null}
    </>
  );
};

export default VehiclePath;