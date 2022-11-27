import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import SummaryCard from "./SummaryCard";
import { action } from "@storybook/addon-actions";
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
  it("calls onClickMoreDetails when more details button is clicked", () => {
    const onClickMoreDetails = jest.fn();
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        moreCardActions={
          <Stack direction="row" spacing={1}>
            <Button
              size="large"
              variant="text"
              sx={{ width: "50%" }}
              onClick={onClickMoreDetails}
            >
              MORE DETAILS
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ background: theme => theme.palette.primary.main }}
            />
            <Button
              size="large"
              variant="text"
              sx={{ width: "50%" }}
              onClick={action("onClickViewFiles")}
            >
              VIEW FILES
            </Button>
          </Stack>
        }
      />
    );
    // find the more details button and click it
    fireEvent.click(screen.getByText(/more details/i));

    // expect the onClickMoreDetails function to be called
    expect(onClickMoreDetails).toHaveBeenCalledTimes(1);
  });

  // // test that the onClickViewFiles function is called when view files button is clicked
  it("calls onClickViewFiles when view files button is clicked", () => {
    const onClickViewFiles = jest.fn();

    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        moreCardActions={
          <Stack direction="row" spacing={1}>
            <Button
              size="large"
              variant="text"
              sx={{ width: "50%" }}
              onClick={action("onClickMoreDetails")}
            >
              MORE DETAILS
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ background: theme => theme.palette.primary.main }}
            />
            <Button
              size="large"
              variant="text"
              sx={{ width: "50%" }}
              onClick={onClickViewFiles}
            >
              VIEW FILES
            </Button>
          </Stack>
        }
      />
    );

    // find the view files button and click it
    fireEvent.click(screen.getByText(/view files/i));

    // expect the onClickViewFiles function to be called
    expect(onClickViewFiles).toHaveBeenCalledTimes(1);
  });
});
