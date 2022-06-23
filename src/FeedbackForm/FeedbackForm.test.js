import { render, screen, waitFor } from "@testing-library/react";
import FeedbackForm from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("FeedbackForm", () => {
  test.each([
    ["sentiment-card-like", "I like something"],
    ["sentiment-card-dislike", "I don't like Something"],
    ["sentiment-card-suggestion", "I have a suggestion"]
  ])(
    "correct fields are returned for %s",
    async (sentimentCardId, expectedSentiment) => {
      // render component
      const onSubmit = jest.fn();
      render(<FeedbackForm onSubmit={onSubmit} />);

      // click button to open dialog
      const addButton = screen.getByTestId("open-button");
      await userEvent.click(addButton);

      // select sentiment
      const sentimentCard = screen.getByTestId(sentimentCardId);
      await userEvent.click(sentimentCard);

      // enter title
      const titleField = await screen.findByRole("textbox", { name: /title/i });
      await userEvent.type(titleField, "CarMaker");

      // enter description
      const descriptionField = screen.getByRole("textbox", {
        name: /description/i
      });
      await userEvent.type(descriptionField, "CarMaker you are Good!");

      // click submit button
      const submitButton = screen.getByTestId("submit-button");
      await userEvent.click(submitButton);

      // verify onSubmit was called with correct values
      await waitFor(() => {
        expect(onSubmit).toHaveBeenLastCalledWith({
          description: "CarMaker you are Good!",
          sentiment: expectedSentiment,
          title: "CarMaker",
          url: window.location.href
        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    }
  );

  test("dialog is closed when open is false", () => {
    // render component
    const { baseElement } = render(<FeedbackForm open={false} />);

    // verify dialog is not rendered
    const dialog = baseElement.querySelector(".MuiDialog-root");
    expect(dialog).not.toBeInTheDocument();
  });

  test("dialog is open when open is true", () => {
    // render component
    const { baseElement } = render(<FeedbackForm open />);

    // verify dialog is opened
    const dialog = baseElement.querySelector(".MuiDialog-root");
    expect(dialog).toBeInTheDocument();
  });
});
