import { states, trafficLightsWithImages } from "./trafficLightUtils";
import { useEffect, useRef, useState } from "react";

import { TrafficLightProps } from "./TrafficLight.types";
import { TrafficLightSelector } from "./TrafficLightSelector";

/**
 * @param type - A string specifying the type of traffic light. Default is "red-yellow-green"
 * @param state - A number specifying the state of the light. Default is 5 (meaning all lights on)
 * @param points - A list of two points specifying the x and y coordinates in Fr0 [x, y]
 * @param angle - The angle of rotation of the traffic light to the origin. Default is 0
 * @param onTrafficLightLoad - A function that will be called once the traffic light is fully drawn
 */

const TrafficLight = ({
  type = "red-yellow-green",
  state = 5,
  points,
  angle = 0,
  scale = { x: 0.5, y: 0.5 },
  onTrafficLightLoad
}: TrafficLightProps) => {
  // Refs holding the number of images to be loaded and the number of images loaded already
  const imagesNeededRef = useRef(0);
  const imagesLoadedRef = useRef(0);

  // State that is set to true once all images have loaded
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // images may only need to be reloaded once `type` or `state` changes
  // finds out how many images will need to be loaded
  useEffect(() => {
    // on type change reset images loaded state and ref
    setAllImagesLoaded(false);
    imagesLoadedRef.current = 0;
    imagesNeededRef.current = 0;

    // Calculate images needed only if traffic light `type` uses images
    // default is traffic light uses 0 images
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
  }, [type, state]);

  // calls the onTrafficLightLoad callback once allImagesLoaded state is set to `true`
  useEffect(() => {
    if (allImagesLoaded && onTrafficLightLoad) {
      onTrafficLightLoad(true);
    }
    // if no images are needed treat this as all images loaded
    if (imagesNeededRef.current === 0) setAllImagesLoaded(true);
  }, [allImagesLoaded, onTrafficLightLoad, points, angle, scale.x, scale.y]);

  /**
   * A function to be executed whenever an individual
   * image is loaded
   */
  const onImageLoad = (loaded: boolean | undefined) => {
    // increment images loaded
    if (loaded && !allImagesLoaded) {
      imagesLoadedRef.current += 1;
    }
    // check if all images loaded
    if (imagesLoadedRef.current === imagesNeededRef.current) {
      // all images have been loaded
      setAllImagesLoaded(true);
    }
  };

  return TrafficLightSelector({
    angle,
    onImageLoad,
    points,
    scale,
    state,
    type
  });
};

export default TrafficLight;
