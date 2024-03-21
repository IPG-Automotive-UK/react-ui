import { render, screen } from "@testing-library/react";

import AddHomeIcon from '@mui/icons-material/AddHome';
import React from "react";
import SelectorButton from "./SelectorButton";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("SelectorButton", () => {
  test("renders correctly", () => {
    const { container } = render(
      <SelectorButton
        icon={<AddHomeIcon sx={{fontSize: 56}} />}
        text={"Porsche"}
        description="View all cars by Porsche"
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText("Porsche")).toBeInTheDocument();
    expect(screen.getByText("View all cars by Porsche")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("calls onClick once when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SelectorButton
        icon={<AddHomeIcon />}
        text={"Porsche"}
        description="View all cars by Porsche"
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
