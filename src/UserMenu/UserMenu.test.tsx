import { render, screen } from "@testing-library/react";

import React from "react";
import UserMenu from ".";
import { UserMenuProps } from "./UserMenu.types";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mock useColorScheme
const setModeMock = vi.fn();

vi.mock("@mui/material", async () => {
  const actual =
    await vi.importActual<typeof import("@mui/material")>("@mui/material");
  return {
    ...actual,
    useColorScheme: () => ({
      mode: "light",
      setMode: setModeMock
    })
  };
});

// a set of default inputs so that tests can change what theyre testing
const defaultInputs: UserMenuProps = {
  onChangePassword: vi.fn(),
  onLogout: vi.fn(),
  user: {
    email: "marleyschleifer416@gmail.com",
    name: "John Doe"
  }
};

/** Tests */
describe("User Menu", () => {
  describe("Avatar", () => {
    test("shows first and last initial of username", () => {
      render(<UserMenu {...defaultInputs} />);
      expect(screen.getByText(/JD/i)).toBeInTheDocument();
    });
    test("shows ? if falsy username", () => {
      render(
        <UserMenu
          {...defaultInputs}
          user={{ email: "marleyschleifer416@gmail.com", name: "" }}
        />
      );
      expect(screen.getByText(/\?/i)).toBeInTheDocument();
    });
    test("renders correct font-size", () => {
      render(<UserMenu {...defaultInputs} />);
      expect(screen.getByText(/JD/i)).toHaveStyle("font-size: 14px");
    });
  });
  describe("Menu header", () => {
    test("shows full username", async () => {
      const user = userEvent.setup();
      render(<UserMenu {...defaultInputs} />);
      await user.click(screen.getByRole("button", { name: /jd/i }));
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
    test("shows Unknown if falsy username", async () => {
      const user = userEvent.setup();
      render(
        <UserMenu
          {...defaultInputs}
          user={{ email: "marleyschleifer416@gmail.com", name: "" }}
        />
      );
      await user.click(screen.getByRole("button", { name: /\?/i }));
      expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
    });
    test("shows user email", async () => {
      const user = userEvent.setup();
      render(<UserMenu {...defaultInputs} />);
      await user.click(screen.getByRole("button", { name: /JD/i }));
      expect(
        screen.getByText(/marleyschleifer416@gmail.com/i)
      ).toBeInTheDocument();
    });
    test("shows Unknown if falsy email", async () => {
      const user = userEvent.setup();
      render(
        <UserMenu {...defaultInputs} user={{ email: "", name: "Test Name" }} />
      );
      await user.click(screen.getByRole("button", { name: /TN/i }));
      expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
    });
  });
  describe("Menu item", () => {
    test("onLogout called on user click", async () => {
      const user = userEvent.setup();
      const onLogout = vi.fn();
      render(<UserMenu {...defaultInputs} onLogout={onLogout} />);
      await user.click(screen.getByRole("button", { name: /JD/i }));
      await user.click(screen.getByRole("menuitem", { name: /Logout/i }));
      expect(onLogout).toHaveBeenCalled();
    });
    test("onChangePassword called on user click", async () => {
      const user = userEvent.setup();
      const onChangePassword = vi.fn();
      render(
        <UserMenu {...defaultInputs} onChangePassword={onChangePassword} />
      );
      await user.click(screen.getByRole("button", { name: /JD/i }));
      await user.click(
        screen.getByRole("menuitem", { name: /Change password/i })
      );
      expect(onChangePassword).toHaveBeenCalled();
    });
  });
  describe("Theme Mode", () => {
    // Test radio button switching theme mode
    test.each([
      ["Dark", "dark"],
      ["System Preference", "system"]
    ])(
      "changes to %s theme mode when %s radio button is clicked",
      async (label, expectedMode) => {
        render(
          <UserMenu
            user={{ email: "test@example.com", name: "John Doe" }}
            onLogout={vi.fn()}
            onChangePassword={vi.fn()}
          />
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));
        await user.click(screen.getByLabelText(new RegExp(label, "i")));

        expect(setModeMock).toHaveBeenCalledWith(expectedMode);
      }
    );
  });
});
