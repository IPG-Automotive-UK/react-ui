import { render, screen } from "@testing-library/react";
import React from "react";
import UserMenu from "./";
import userEvent from "@testing-library/user-event";

// a set of default inputs so that tests can change what theyre testing
const defaultInputs = {
  onChangePassword: jest.fn(),
  onLogout: jest.fn(),
  username: "Joe Bloggs"
};

/** Tests */
describe("User Menu", () => {
  describe("Avatar", () => {
    test("shows first and last initial of username", () => {
      render(<UserMenu {...defaultInputs} username="Ruud van Nistelrooy" />);
      expect(screen.getByText(/RN/i)).toBeInTheDocument();
    });
    test("shows ? if falsy username", () => {
      render(<UserMenu {...defaultInputs} username="" />);
      expect(screen.getByText(/\?/i)).toBeInTheDocument();
    });
  });
  describe("Menu header", () => {
    test("shows full username", async () => {
      render(<UserMenu {...defaultInputs} username="Jane Doe" />);
      await userEvent.click(screen.getByRole("button", { name: /jd/i }));
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
    test("shows Unknown if falsy username", async () => {
      render(<UserMenu {...defaultInputs} username="" />);
      await userEvent.click(screen.getByRole("button", { name: /\?/i }));
      expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
    });
  });
  describe("Menu item", () => {
    test("onLogout called on user click", async () => {
      const onLogout = jest.fn();
      render(
        <UserMenu
          {...defaultInputs}
          username="John Smith"
          onLogout={onLogout}
        />
      );
      await userEvent.click(screen.getByRole("button", { name: /JS/i }));
      await userEvent.click(screen.getByRole("menuitem", { name: /Logout/i }));
      expect(onLogout).toHaveBeenCalled();
    });
    test("onChangePassword called on user click", async () => {
      const onChangePassword = jest.fn();
      render(
        <UserMenu
          {...defaultInputs}
          username="John Smith"
          onChangePassword={onChangePassword}
        />
      );
      await userEvent.click(screen.getByRole("button", { name: /JS/i }));
      await userEvent.click(
        screen.getByRole("menuitem", { name: /Change password/i })
      );
      expect(onChangePassword).toHaveBeenCalled();
    });
  });
});
