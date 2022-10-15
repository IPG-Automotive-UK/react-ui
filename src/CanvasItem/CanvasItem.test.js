import * as React from "react";

import CanvasItem from ".";
import { render } from "@testing-library/react";

const CanvasItemWithState = args => {
  const [rectangle, setRectangle] = React.useState({
    height: 200,
    left: 100,
    rotateAngle: 0,
    top: 100,
    width: 200
  });
  React.useEffect(
    () => setRectangle(previous => ({ ...previous, top: args.top })),
    [args.top]
  );
  React.useEffect(
    () => setRectangle(previous => ({ ...previous, left: args.left })),
    [args.left]
  );
  React.useEffect(
    () => setRectangle(previous => ({ ...previous, width: args.width })),
    [args.width]
  );
  React.useEffect(
    () => setRectangle(previous => ({ ...previous, height: args.height })),
    [args.height]
  );
  React.useEffect(
    () =>
      setRectangle(previous => ({
        ...previous,
        rotateAngle: args.rotateAngle
      })),
    [args.rotateAngle]
  );

  const [selected, setSelected] = React.useState(args.selected);
  React.useEffect(() => setSelected(args.selected), [args.selected]);

  const onResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    setRectangle(previous => ({
      ...previous,
      height,
      left,
      top,
      width
    }));
  };

  const onRotate = rotateAngle => {
    setRectangle(previous => ({
      ...previous,
      rotateAngle
    }));
  };

  const onDrag = (top, left) => {
    setRectangle(previous => ({
      ...previous,
      left,
      top
    }));
  };

  const onClick = e => {
    e.stopPropagation();
    setSelected(true);
  };

  return (
    <CanvasItem
      {...args}
      {...rectangle}
      onResize={onResize}
      onRotate={onRotate}
      onDrag={onDrag}
      selected={selected}
      onClick={onClick}
    ></CanvasItem>
  );
};

/**
 * Tests
 */
describe("Select", () => {
  test("can render with state", () => {
    const { container } = render(
      <CanvasItemWithState width={300} height={300} left={10} top={10} />
    );
    expect(container.querySelector(".canvas-item")).toBeInTheDocument();
    const styles = window.getComputedStyle(
      container.querySelector(".canvas-item")
    );
    expect(styles.width).toBe("300px");
    expect(styles.height).toBe("300px");
    expect(styles.top).toBe("10px");
    expect(styles.left).toBe("10px");
  });
});
