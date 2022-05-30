import React from "react";
import UserAvatar from "./UserAvatar";
import { render } from "@testing-library/react";

/**
 * UserAvatar Tests
 */
describe("UserAvatar", () => {
  // check background color is set when color prop is set
  test("color prop sets background color", () => {
    const color = "rgb(255, 0, 0)";
    const { container } = render(<UserAvatar color={color} />);
    const avatar = container.querySelector(".MuiAvatar-root");
    expect(avatar).toHaveStyle(`background-color: ${color}`);
  });

  // check only one initial shown for single word name
  test("one letter initial shown for single word name", () => {
    const name = "John";
    const { container } = render(<UserAvatar name={name} />);
    const avatar = container.querySelector(".MuiAvatar-root");
    expect(avatar.innerHTML).toBe("J");
  });

  // check two initials are shown for two word name
  test("two letter initial shown for two word name", () => {
    const name = "John Doe";
    const { container } = render(<UserAvatar name={name} />);
    const avatar = container.querySelector(".MuiAvatar-root");
    expect(avatar.innerHTML).toBe("JD");
  });

  // check only first and last initials are shown for more than two word name
  test("only first and last initials shown for more than two word name", () => {
    const name = "John Doe Smith";
    const { container } = render(<UserAvatar name={name} />);
    const avatar = container.querySelector(".MuiAvatar-root");
    expect(avatar.innerHTML).toBe("JS");
  });

  // check image is shown when image prop is set
  test("image shown when image prop is set", () => {
    const imgSrc =
      "https://avatars2.githubusercontent.com/u/8186664?s=460&u=e9f9c8f8b8e9d0b5f7b1f8f8b8c8f8f8b8c8f8f8&v=4";
    const { container } = render(<UserAvatar img={imgSrc} />);
    const imageComponent = container.querySelector(".MuiAvatar-img");
    expect(imageComponent.src).toBe(imgSrc);
  });

  // check no image is shown when image prop is not set
  test("no image shown when image prop is not set", () => {
    const { container } = render(<UserAvatar />);
    const imageComponent = container.querySelector(".MuiAvatar-img");
    expect(imageComponent).toBeNull();
  });
});
