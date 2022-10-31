import { Delete, Edit } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { render, screen } from "@testing-library/react";

import React from "react";
import SummaryCard from "./SummaryCard";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("SummaryCard", () => {
  // test that the summary card renders with title
  it("renders title and subtitle ", () => {
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
      />
    );
    expect(screen.getByText("summary card title")).toBeInTheDocument();
    expect(screen.getByText("summary card subtitle")).toBeInTheDocument();
  });

  // test that summary card renders with label that can be clicked
  it("renders label and can be clicked", async () => {
    const labels = [
      {
        _id: "1",
        color: "#174713",
        description: "",
        name: "National Highways"
      }
    ];

    // mock function to test if label is clicked
    const onClickLabel = jest.fn();

    // render summary card with label
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        labels={labels}
        onClickLabel={onClickLabel}
      />
    );

    // expect label to be in the document
    expect(screen.getByText("National Highways")).toBeInTheDocument();

    // find the nearest button to the label and click it
    await userEvent.click(
      screen.getByRole("button", { name: "National Highways" })
    );

    // expect the mock function to be called
    expect(onClickLabel).toHaveBeenCalled();
  });

  // test that image is rendered in summary card
  it("renders image", () => {
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        media="https://picsum.photos/200/300"
      />
    );

    // expect image to be in the document
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // test that more options popover is rendered
  it("renders more options popover", async () => {
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        moreOptionsPopover={
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItemButton>
            </ListItem>
          </List>
        }
      />
    );

    // find the ... button and click it
    await userEvent.click(screen.getByRole("button", { name: "settings" }));

    // expect the popover to be in the document
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  // test that a content is rendered in summary card
  it("renders content", () => {
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        content={<div>Some content on the card </div>}
      />
    );

    // expect the content to be in the document
    expect(screen.getByText("Some content on the card")).toBeInTheDocument();
  });

  // test that the onClickMoreDetails function is called when more details button is clicked
  it("calls onClickMoreDetails when more details button is clicked", async () => {
    const onClickMoreDetails = jest.fn();

    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        onClickMoreDetails={onClickMoreDetails}
      />
    );

    // find the more details button and click it
    await userEvent.click(screen.getByRole("button", { name: "MORE DETAILS" }));

    // expect the onClickMoreDetails function to be called
    expect(onClickMoreDetails).toHaveBeenCalled();
  });

  // test that the onClickViewFiles function is called when view files button is clicked
  it("calls onClickViewFiles when view files button is clicked", async () => {
    const onClickViewFiles = jest.fn();

    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        onClickViewFiles={onClickViewFiles}
      />
    );

    // find the view files button and click it
    await userEvent.click(screen.getByRole("button", { name: "VIEW FILES" }));

    // expect the onClickViewFiles function to be called
    expect(onClickViewFiles).toHaveBeenCalled();
  });
});
