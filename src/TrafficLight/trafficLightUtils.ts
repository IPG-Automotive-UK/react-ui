// enum to help code readability
const states = Object.freeze({
  "all-on": 5,
  green: 1,
  off: 0,
  red: 3,
  yellow: 2,
  "yellow-red": 4
});

// traffic light colours object
const color = {
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

export { color, states, trafficLightsWithImages };
