import type { TrafficLightProps } from "./TrafficLight.types";

export type TrafficLightSelectorProps = Omit<
  TrafficLightProps,
  "onTrafficLightLoaded"
> & { onImageLoaded: (loaded: boolean) => void };
