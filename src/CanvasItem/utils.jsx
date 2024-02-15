/**
 * Calculates the hypotenuse of a right triangle
 * @param {number} x Length of one side
 * @param {number} y Length of the other side
 * @returns {number} Length of the hypotenuse
 */
export const getLength = (x, y) => Math.sqrt(x * x + y * y);

/**
 * Calculates the angle between two points
 * @param {object} position1 First point (x, y)
 * @param {object} position2 Second point (x, y)
 * @returns {number} Angle in degrees
 */
export const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = (Math.atan2(det, dot) / Math.PI) * 180;
  return (angle + 360) % 360;
};

/**
 * Converts degrees to radians
 * @param {number} deg Angle in degrees
 * @returns {number} Angle in radians
 */
export const degToRadian = deg => (deg * Math.PI) / 180;

/**
 * cos(x) in degrees
 */
const cos = deg => Math.cos(degToRadian(deg));

/**
 * sin(x) in degrees
 * @param {*} deg Angle in degrees
 */
const sin = deg => Math.sin(degToRadian(deg));

/**
 * Resolves a change in width with regards to a minWidth
 * @param {number} width Current width
 * @param {number} deltaW Change in width
 * @param {number} minWidth Minimum width
 * @returns {object} New width and change in width
 */
const setWidthAndDeltaW = (width, deltaW, minWidth) => {
  const expectedWidth = width + deltaW;
  if (expectedWidth > minWidth) {
    width = expectedWidth;
  } else {
    deltaW = minWidth - width;
    width = minWidth;
  }
  return {
    deltaW,
    width
  };
};

/**
 * Resolves a change in height with regards to a minHeight
 * @param {number} height Current height
 * @param {number} deltaH Change in height
 * @param {number} minHeight Minimum height
 * @returns {object} New height and change in height
 */
const setHeightAndDeltaH = (height, deltaH, minHeight) => {
  const expectedHeight = height + deltaH;
  if (expectedHeight > minHeight) {
    height = expectedHeight;
  } else {
    deltaH = minHeight - height;
    height = minHeight;
  }
  return {
    deltaH,
    height
  };
};

/**
 * Defines the new style of an item after a resize or rotate
 * @param {string} type Resize handle type
 * @param {object} rect Original rectangle
 * @param {number} deltaW Change in width
 * @param {number} deltaH Change in height
 * @param {number} ratio Aspect ratio
 * @param {number} minWidth Minimum width
 * @param {number} minHeight Minimum height
 * @returns {object} New style
 */
export const getNewStyle = (
  type,
  rect,
  deltaW,
  deltaH,
  ratio,
  minWidth,
  minHeight
) => {
  let { width, height, centerX, centerY, rotateAngle } = rect;
  const widthFlag = width < 0 ? -1 : 1;
  const heightFlag = height < 0 ? -1 : 1;
  width = Math.abs(width);
  height = Math.abs(height);
  switch (type) {
    case "e": {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        deltaH = deltaW / ratio;
        height = width / ratio;
        // 左上角固定
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      } else {
        // 左边固定
        centerX += (deltaW / 2) * cos(rotateAngle);
        centerY += (deltaW / 2) * sin(rotateAngle);
      }
      break;
    }
    case "ne": {
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
      }
      centerX +=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
      centerY +=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "se": {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
      }
      centerX +=
        (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
      centerY +=
        (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "s": {
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
        // 左上角固定
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      } else {
        // 上边固定
        centerX -= (deltaH / 2) * sin(rotateAngle);
        centerY += (deltaH / 2) * cos(rotateAngle);
      }
      break;
    }
    case "sw": {
      deltaW = -deltaW;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        height = width / ratio;
        deltaH = deltaW / ratio;
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
      centerY -=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "w": {
      deltaW = -deltaW;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        height = width / ratio;
        deltaH = deltaW / ratio;
        // 右上角固定
        centerX -=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
        centerY -=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      } else {
        // 右边固定
        centerX -= (deltaW / 2) * cos(rotateAngle);
        centerY -= (deltaW / 2) * sin(rotateAngle);
      }
      break;
    }
    case "nw": {
      deltaW = -deltaW;
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        width = height * ratio;
        deltaW = deltaH * ratio;
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
      centerY -=
        (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "n": {
      deltaH = -deltaH;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        width = height * ratio;
        deltaW = deltaH * ratio;
        // 左下角固定
        centerX +=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      } else {
        centerX += (deltaH / 2) * sin(rotateAngle);
        centerY -= (deltaH / 2) * cos(rotateAngle);
      }
      break;
    }
  }

  return {
    position: {
      centerX,
      centerY
    },
    size: {
      height: height * heightFlag,
      width: width * widthFlag
    }
  };
};

// map of resize direction to clockwise index
const cursorStartMap = {
  e: 2,
  n: 0,
  ne: 1,
  nw: 7,
  s: 4,
  se: 3,
  sw: 5,
  w: 6
};

// array of css cursor resize directions in a clockwise order forn 0 - 360 degrees in 45 degree increments
const cursorDirectionArray = [
  "ns",
  "nesw",
  "ew",
  "nwse",
  "ns",
  "nesw",
  "ew",
  "nwse"
];

// map of normalized 30 degree segment to cursor direction
const cursorMap = {
  0: 0,
  1: 1,
  10: 7,
  11: 8,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6
};

/**
 * Returns the css cursor name for the given angle and resize direction
 * @param {number} rotateAngle Rotation angle of the rectangle
 * @param {string} d Resize handle direction
 * @returns {string} css cursor name
 */
export const getCursor = (rotateAngle, d) => {
  const increment = cursorMap[Math.floor(rotateAngle / 30)];
  const index = cursorStartMap[d];
  const newIndex = (index + increment) % 8;
  return cursorDirectionArray[newIndex];
};

/**
 * Transforms a rectangle layout from center origin to top left origin
 * @param {object} layout Layout object with centerX, centerY, width, height, rotateAngle
 * @returns {object} Layout object with top, left, width, height, rotateAngle
 */
export const centerToTL = ({
  centerX,
  centerY,
  width,
  height,
  rotateAngle
}) => ({
  height,
  left: centerX - width / 2,
  rotateAngle,
  top: centerY - height / 2,
  width
});

/**
 * Transforms a rectangle layout from top left origin to center origin
 * @param {object} layout Layout object with top, left, width, height, rotateAngle
 * @returns {object} Layout object with centerX, centerY, width, height, rotateAngle
 */
export const tLToCenter = ({ top, left, width, height, rotateAngle }) => ({
  position: {
    centerX: left + width / 2,
    centerY: top + height / 2
  },
  size: {
    height,
    width
  },
  transform: {
    rotateAngle
  }
});
