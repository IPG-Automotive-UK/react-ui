import * as React from "react";

import CanvasItem from ".";
import { render } from "@testing-library/react";

const CanvasWithState = args => {
  const [width, setWidth] = React.useState(args.width ?? 500);
  const [height, setHeight] = React.useState(args.width ?? 500);
  React.useEffect(() => setWidth(args.width), [args.width]);
  React.useEffect(() => setHeight(args.height), [args.height]);
  const onResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };
  return (
    <CanvasItem
      {...args}
      top
      height={height}
      width={width}
      onResize={onResize}
    />
  );
};

/**
 * Tests
 */
describe("Select", () => {
  test("can render with state", () => {
    const { container } = render(<CanvasWithState width={300} height={300} />);
    expect(container.querySelector("#canvas")).toBeInTheDocument();
    const styles = window.getComputedStyle(container.querySelector("#canvas"));
    expect(styles.width).toBe("300px");
    expect(styles.height).toBe("300px");
  });
});
