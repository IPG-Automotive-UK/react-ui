// svg path for fullscreen icon in plotly menu bar
const fullscreenIcon = {
  height: 1792,
  path: "M256 1408h1280v-768h-1280v768zm1536-1120v1216q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1472q66 0 113 47t47 113z",
  width: 1792
};

type ConfigProps = {
  isFullscreen: boolean;
  handleClickFullscreen: () => void;
};

/**
 * Returns a plotly config function with provided callback for clicking fullscreen
 */
export const getConfig = ({
  isFullscreen,
  handleClickFullscreen
}: ConfigProps) => {
  return {
    displaylogo: false, // never display plotly logo
    modeBarButtonsToAdd: !isFullscreen // if we are not in full screen, show a button to launch to fullscreen
      ? [
          {
            click: handleClickFullscreen,
            direction: "up",
            icon: fullscreenIcon,
            name: "Fullscreen",
            title: "Fullscreen"
          }
        ]
      : []
  };
};
