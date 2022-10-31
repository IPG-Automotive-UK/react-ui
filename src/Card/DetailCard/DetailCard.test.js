import { render, screen } from "@testing-library/react";

import DetailCard from "./DetailCard";
import React from "react";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("DetailCard", () => {
  // test that the detail card renders with title
  it("renders title and subtitle ", () => {
    render(
      <DetailCard title="detail card title" subtitle="detail card subtitle" />
    );
    expect(screen.getByText("detail card title")).toBeInTheDocument();
    expect(screen.getByText("detail card subtitle")).toBeInTheDocument();
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
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        media="https://picsum.photos/200/300"
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

  // test that onClickDelete is called when delete button is clicked
  it("calls onClickDelete when delete button is clicked", async () => {
    const onClickDelete = jest.fn();

    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        onClickDelete={onClickDelete}
      />
    );

    // find the nearest button to the delete button and click it
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    // expect the mock function to be called
    expect(onClickDelete).toHaveBeenCalled();
  });

  // test that onClickEdit is called when edit button is clicked
  it("calls onClickEdit when edit button is clicked", async () => {
    const onClickEdit = jest.fn();

    render(
      <DetailCard
        title="detail card title"
        subtitle="detail card subtitle"
        onClickEdit={onClickEdit}
      />
    );

    // find the nearest button to the edit button and click it
    await userEvent.click(screen.getByRole("button", { name: "Edit" }));

    // expect the mock function to be called
    expect(onClickEdit).toHaveBeenCalled();
  });
});
