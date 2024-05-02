import { Circle, Group, Rect } from "react-konva";
import { color, states } from "./trafficLightUtils";

import Figure from "../Figure";
import React from "react";
import { TrafficLightSelectorProps } from "./TrafficLightSelector.types";
import arrowLeft from "./svg/arrow-left.svg";
import arrowLeftGreen from "./svg/arrow-left-green.svg";
import arrowRight from "./svg/arrow-right.svg";
import arrowRightGreen from "./svg/arrow-right-green.svg";
import arrowUp from "./svg/arrow-up.svg";
import arrowUpGreen from "./svg/arrow-up-green.svg";
import arrowsUpLeft from "./svg/arrows-up-left.svg";
import arrowsUpLeftGreen from "./svg/arrows-up-left-green.svg";
import arrowsUpRight from "./svg/arrows-up-right.svg";
import arrowsUpRightGreen from "./svg/arrows-up-right-green.svg";
import handStopRed from "./svg/hand-stop.svg";
import walkGreen from "./svg/walk.svg";

export const TrafficLightSelector = ({
  points,
  type = "red-yellow-green",
  angle = 0,
  scale = { x: 0.5, y: 0.5 },
  state = 5,
  onImageLoaded
}: TrafficLightSelectorProps) => {
  switch (type) {
    case "red-yellow-green":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? color.green.on
                : color.green.off
            }
          ></Circle>
        </Group>
      );
    case "red-yellow-green-small":
      return (
        <Group
          x={points[0]}
          y={points[1]}
          rotation={angle}
          scale={{ x: scale.x * 0.5, y: scale.y * 0.5 }}
        >
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? color.green.on
                : color.green.off
            }
          ></Circle>
        </Group>
      );
    case "red-yellow-green-straight":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowUp} x={0} y={8} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowUp} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowUpGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-yellow-green-left":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={8} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-yellow-green-right":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={8} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-yellow-green-straight-left":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure
              url={arrowsUpLeft}
              x={0}
              y={8}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure
              url={arrowsUpLeft}
              x={0}
              y={5}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowsUpLeftGreen}
              x={0}
              y={2}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-yellow-green-straight-right":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={10}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={8}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure
              url={arrowsUpRight}
              x={0}
              y={8}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure
              url={arrowsUpRight}
              x={0}
              y={5}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowsUpRightGreen}
              x={0}
              y={2}
              scale={0.6}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-yellow":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.red ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
        </Group>
      );
    case "yellow-green":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow || state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? color.green.on
                : color.green.off
            }
          ></Circle>
        </Group>
      );
    case "yellow-green-left":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "yellow-green-right":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "yellow-green-left-large":
      return (
        <Group
          x={points[0]}
          y={points[1]}
          rotation={angle}
          scale={{ x: scale.x * 1.25, y: scale.y * 1.25 }}
        >
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "yellow-green-right-large":
      return (
        <Group
          x={points[0]}
          y={points[1]}
          rotation={angle}
          scale={{ x: scale.x * 1.25, y: scale.y * 1.25 }}
        >
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? color.yellow.on
                : color.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoaded} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-large":
      return (
        <Group
          x={points[0]}
          y={points[1]}
          rotation={angle}
          scale={{ x: scale.x * 1.25, y: scale.y * 1.25 }}
        >
          <Rect
            x={0}
            y={0}
            width={3}
            height={4}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.red || state === states["all-on"]
                ? color.red.on
                : color.red.off
            }
          ></Circle>
        </Group>
      );
    case "red-pedestrian":
      return (
        <Group
          x={points[0]}
          y={points[1]}
          rotation={angle}
          scale={{ x: scale.x * 1, y: scale.y * 1 }}
        >
          <Rect
            x={0}
            y={0}
            width={3}
            height={4}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle x={0} y={2} radius={1.2} fill={color.red.off}></Circle>
          {state === states.red || state === states["all-on"] ? (
            <Figure
              url={handStopRed}
              x={-0.1}
              y={2}
              scale={0.75}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
    case "red-green-pedestrian":
      return (
        <Group x={points[0]} y={points[1]} rotation={angle} scale={scale}>
          <Rect
            x={0}
            y={0}
            width={3}
            height={7}
            offsetX={1.5}
            fill="black"
          ></Rect>
          <Circle x={0} y={5} radius={1.2} fill={color.red.off}></Circle>
          {state === states.red || state === states["all-on"] ? (
            <Figure
              url={handStopRed}
              x={-0.1}
              y={5}
              scale={0.75}
              onImageLoad={onImageLoaded}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={color.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={walkGreen}
              x={0}
              y={2}
              scale={0.75}
              onImageLoad={onImageLoaded}
            />
          ) : null}
        </Group>
      );
  }
};
