import { Button, Stack } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";

import DetailCard from "./DetailCard";
import { Edit } from "@mui/icons-material";
import FileCard from "../FileCard/FileCard";
import React from "react";
import { action } from "@storybook/addon-actions";
import userEvent from "@testing-library/user-event";

// import { userEvent } from "@storybook/testing-library";

/**
 * Tests
 */
describe("DetailCard", () => {
  // test that the detail card renders with title
  it("renders title and subtitle ", () => {
    render(
      <DetailCard title="detail card title" subtitle="detail card subtitle" />
    );
    expect(screen.getByText(/detail card title/i)).toBeInTheDocument();
    expect(screen.getByText(/detail card subtitle/i)).toBeInTheDocument();
  });

  // test that detail card renders with label that can be clicked
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
    // render detail card with label
    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
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

  // test that image is rendered in detail card
  it("renders image", () => {
    render(
      <FileCard
        title="detail card title"
        subtitle="detail card subtitle"
        media="https://picsum.photos/400/200"
      />
    );
    // expect image to be in the document
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // test that content is rendered in detail card
  it("renders content", () => {
    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        content={<div>Some content on the card </div>}
      />
    );
    // expect content to be in the document
    expect(screen.getByText("Some content on the card")).toBeInTheDocument();
  });

  it("calls onClickEdit when edit button is clicked", () => {
    const onClickEdit = jest.fn();
    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        buttonsStack=<Stack>
          <Button onClick={onClickEdit}>Edit</Button>
          <Button onClick={action("onClickDelete")}>Delete</Button>
        </Stack>
      />
    );
    fireEvent.click(screen.getByText(/edit/i));
    expect(onClickEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onClickDelete when delete button is clicked", () => {
    const onClickDelete = jest.fn();
    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        buttonsStack=<Stack>
          <Button onClick={action("onClickEdit")}>Edit</Button>
          <Button onClick={onClickDelete}>Delete</Button>
        </Stack>
      />
    );
    fireEvent.click(screen.getByText(/delete/i));
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });
});
