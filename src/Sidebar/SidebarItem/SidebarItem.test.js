import { render, screen, waitFor } from "@testing-library/react";
import { Mail } from "@mui/icons-material";
import React from "react";
import SidebarItem from "./";
import userEvent from "@testing-library/user-event";

describe("SidebarItem", () => {
  it("renders name", () => {
    render(<SidebarItem onClick={jest.fn()} name="Inbox" icon={<Mail />} />);
    expect(screen.getByText(/inbox/i)).toBeInTheDocument();
  });
  it("calls callback onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<SidebarItem onClick={onClick} name="Inbox" icon={<Mail />} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
  it("displays count when present", () => {
    render(
      <SidebarItem
        onClick={jest.fn()}
        name="Inbox"
        icon={<Mail />}
        count={10}
      />
    );
    expect(screen.getByText(/9+/i)).toBeInTheDocument();
  });
  it("can be disabled", () => {
    render(
      <SidebarItem onClick={jest.fn()} name="Inbox" icon={<Mail />} disabled />
    );
    expect(screen.getByRole("button")).toHaveClass("Mui-disabled");
  });
  it("can be selected", () => {
    render(
      <SidebarItem onClick={jest.fn()} name="Inbox" icon={<Mail />} selected />
    );
    expect(screen.getByRole("button")).toHaveClass("Mui-selected");
  });
  it("nested children are collapsed by default", () => {
    render(
      <SidebarItem onClick={jest.fn()} name="Parent" icon={<Mail />}>
        <SidebarItem onClick={jest.fn()} name="Child" icon={<Mail />} />
      </SidebarItem>
    );
    expect(screen.queryByText(/child/i)).not.toBeInTheDocument();
  });
  it("nested children can be expanded initially", () => {
    render(
      <SidebarItem
        onClick={jest.fn()}
        name="Parent"
        icon={<Mail />}
        initialOpen
      >
        <SidebarItem onClick={jest.fn()} name="Child" icon={<Mail />} />
      </SidebarItem>
    );
    expect(screen.queryByText(/child/i)).toBeInTheDocument();
  });
  it("nested children can be expanded", async () => {
    const user = userEvent.setup();
    render(
      <SidebarItem onClick={jest.fn()} name="Parent" icon={<Mail />}>
        <SidebarItem onClick={jest.fn()} name="Child" icon={<Mail />} />
      </SidebarItem>
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByText(/child/i)).toBeInTheDocument();
  });
  it("nested children can be collapsed", async () => {
    const user = userEvent.setup();
    render(
      <SidebarItem onClick={jest.fn()} name="Parent" icon={<Mail />}>
        <SidebarItem onClick={jest.fn()} name="Child" icon={<Mail />} />
      </SidebarItem>
    );
    user.click(screen.getByRole("button", { name: "Parent" })); // open
    user.click(screen.getByRole("button", { name: "Parent" })); // close
    await waitFor(() => {
      expect(screen.queryByText(/child/i)).not.toBeInTheDocument();
    });
  });
});
