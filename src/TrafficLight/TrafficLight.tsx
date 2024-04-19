import { Circle, Group, Rect } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import Figure from "../Figure";
import { TrafficLightProps } from "./TrafficLight.types";
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

/**
 * @param type - A string specifying the type of traffic light. Default is "red-yellow-green"
 * @param state - A number specifying the state of the light. Default is 5 (meaning all lights on)
 * @param points - A list of two points specifying the x and y coordinates in Fr0 [x, y]
 * @param angle - The angle of rotation of the traffic light to the origin. Default is 0
 */
const TrafficLight = ({
  type = "red-yellow-green",
  state = 5,
  points,
  angle = 0,
  scale = { x: 0.5, y: 0.5 },
  onTrafficLightLoad
}: TrafficLightProps) => {
  // enum to help code readability
  const states = Object.freeze({
    "all-on": 5,
    green: 1,
    off: 0,
    red: 3,
    yellow: 2,
    "yellow-red": 4
  });
  const colours = {
    green: {
      off: "#09280b",
      on: "#2dc937"
    },
    red: {
      off: "#430101",
      on: "#de0404"
    },
    yellow: {
      off: "#453607",
      on: "#e7b416"
    }
  };
  // Refs holding the number of images to be loaded and the number of images loaded already
  const imagesNeededRef = useRef(0);
  const imagesLoadedRef = useRef(0);

  // State that is set to true once all images have loaded
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Traffic Lights that need images
  const trafficLightsWithImages = [
    "red-yellow-green-straight",
    "red-yellow-green-left",
    "red-yellow-green-right",
    "red-yellow-green-straight-left",
    "red-yellow-green-straight-right",
    "yellow-green-left",
    "yellow-green-right",
    "yellow-green-left-large",
    "yellow-green-right-large",
    "red-pedestrian",
    "red-green-pedestrian"
  ];

  // finds out how many images will need to be loaded
  useEffect(() => {
    // on type change reset images loaded state and ref
    setAllImagesLoaded(false);
    imagesLoadedRef.current = 0;
    imagesNeededRef.current = 0;
    if (trafficLightsWithImages.includes(type)) {
      switch (state) {
        case states["all-on"]:
          ["red", "yellow", "green"].forEach(color => {
            if (type.includes(color)) {
              imagesNeededRef.current += 1;
            }
          });
          break;
        case states.green:
          if (type.includes("green")) imagesNeededRef.current += 1;
          break;
        case states.red:
          if (type.includes("red")) imagesNeededRef.current += 1;
          break;
        case states.yellow:
          if (type.includes("yellow")) imagesNeededRef.current += 1;
          break;
        case states["yellow-red"]:
          ["red", "yellow"].forEach(color => {
            if (type.includes(color)) {
              imagesNeededRef.current += 1;
            }
          });
          break;
        default:
          imagesNeededRef.current = 0;
          break;
      }
    } else imagesNeededRef.current = 0;

    if (imagesNeededRef.current === 0) setAllImagesLoaded(true);

    console.log(imagesNeededRef.current, "needed");
    // states is a frozen object thus es-lint error wrong
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, state]);

  // todo make this run when state switched from something to 0
  useEffect(() => {
    console.log(Boolean(onTrafficLightLoad));
    if (allImagesLoaded && onTrafficLightLoad) {
      onTrafficLightLoad(true);
    }
  }, [allImagesLoaded, onTrafficLightLoad]);

  /**
   * A function to be executed whenever an image is loaded
   */
  const onImageLoad = (loaded: boolean | undefined) => {
    // increment images loaded
    if (loaded && !allImagesLoaded) {
      imagesLoadedRef.current += 1;
    }
    console.log(imagesLoadedRef.current);
    // check if all images loaded
    if (imagesLoadedRef.current === imagesNeededRef.current) {
      // all images have been loaded
      setAllImagesLoaded(true);
    }
  };

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
                ? colours.red.on
                : colours.red.off
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? colours.green.on
                : colours.green.off
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
                ? colours.red.on
                : colours.red.off
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? colours.green.on
                : colours.green.off
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
                ? colours.red.on
                : colours.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowUp} x={0} y={8} onImageLoad={onImageLoad} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowUp} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure url={arrowUpGreen} x={0} y={2} onImageLoad={onImageLoad} />
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
                ? colours.red.on
                : colours.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={8} onImageLoad={onImageLoad} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.red.on
                : colours.red.off
            }
          ></Circle>
          {state === states.red ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={8} onImageLoad={onImageLoad} />
          ) : null}
          <Circle
            x={0}
            y={5}
            radius={1.2}
            fill={
              state === states.yellow ||
              state === states["yellow-red"] ||
              state === states["all-on"]
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.red.on
                : colours.red.off
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
              onImageLoad={onImageLoad}
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
                ? colours.yellow.on
                : colours.yellow.off
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
              onImageLoad={onImageLoad}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowsUpLeftGreen}
              x={0}
              y={2}
              scale={0.6}
              onImageLoad={onImageLoad}
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
                ? colours.red.on
                : colours.red.off
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
              onImageLoad={onImageLoad}
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
                ? colours.yellow.on
                : colours.yellow.off
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
              onImageLoad={onImageLoad}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowsUpRightGreen}
              x={0}
              y={2}
              scale={0.6}
              onImageLoad={onImageLoad}
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
                ? colours.red.on
                : colours.red.off
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
                ? colours.yellow.on
                : colours.yellow.off
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          <Circle
            x={0}
            y={2}
            radius={1.2}
            fill={
              state === states.green || state === states["all-on"]
                ? colours.green.on
                : colours.green.off
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowLeft} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowLeftGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.yellow.on
                : colours.yellow.off
            }
          ></Circle>
          {state === states.yellow ||
          state === states["yellow-red"] ||
          state === states["all-on"] ? (
            <Figure url={arrowRight} x={0} y={5} onImageLoad={onImageLoad} />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={arrowRightGreen}
              x={0}
              y={2}
              onImageLoad={onImageLoad}
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
                ? colours.red.on
                : colours.red.off
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
          <Circle x={0} y={2} radius={1.2} fill={colours.red.off}></Circle>
          {state === states.red || state === states["all-on"] ? (
            <Figure
              url={handStopRed}
              x={-0.1}
              y={2}
              scale={0.75}
              onImageLoad={onImageLoad}
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
          <Circle x={0} y={5} radius={1.2} fill={colours.red.off}></Circle>
          {state === states.red || state === states["all-on"] ? (
            <Figure
              url={handStopRed}
              x={-0.1}
              y={5}
              scale={0.75}
              onImageLoad={onImageLoad}
            />
          ) : null}
          <Circle x={0} y={2} radius={1.2} fill={colours.green.off}></Circle>
          {state === states.green || state === states["all-on"] ? (
            <Figure
              url={walkGreen}
              x={0}
              y={2}
              scale={0.75}
              onImageLoad={onImageLoad}
            />
          ) : null}
        </Group>
      );
  }
};

export default TrafficLight;
