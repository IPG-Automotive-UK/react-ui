import type { TrafficLightProps } from "./TrafficLight.types";

export type TrafficLightSelectorProps = Omit<
  TrafficLightProps,
  "onTrafficLightLoad"
> & { onImageLoad: (loaded: boolean) => void };
