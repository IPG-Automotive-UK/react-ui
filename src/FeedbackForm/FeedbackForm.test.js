import { render, screen, waitFor } from "@testing-library/react";
import FeedbackForm from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("MultistepForm", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<FeedbackForm onSubmit={onSubmit} />);
  });

  it("onSubmit is called when all fields pass Validation", async () => {
    const floatingButton = screen.getByRole("button", { name: /add/i });
    userEvent.click(floatingButton);

    const feedbackLike = await screen.findByTestId("SentimentSatisfiedAltIcon");
    userEvent.click(feedbackLike);

    const title = await screen.findByRole("textbox", { name: /title/i });
    userEvent.type(title, "Car Maker");

    const description = screen.getByRole("textbox", { name: /description/i });
    userEvent.type(description, "Car Maker you are Good!");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    const feedbackDislike = screen.getByTestId("SentimentVeryDissatisfiedIcon");
    userEvent.click(feedbackDislike);

    const title1 = await screen.findByRole("textbox", { name: /title/i });
    userEvent.type(title1, "Car Maker");

    const description1 = screen.getByRole("textbox", { name: /description/i });
    userEvent.type(description1, "Car Maker you are Good!");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    const feedbackSuggestion = screen.getByTestId("TextsmsOutlinedIcon");
    userEvent.click(feedbackSuggestion);

    const title2 = await screen.findByRole("textbox", { name: /title/i });
    userEvent.type(title2, "Car Makers");

    const description2 = screen.getByRole("textbox", { name: /description/i });
    userEvent.type(description2, "Car Maker you are Good!");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenLastCalledWith({
        description: "Car Maker you are Good!",
        // message: "I like something",
        title: "Car Makers",
        url: window.location.href
      });
      expect(onSubmit).toBeCalled();
      expect(onSubmit).toHaveBeenCalledTimes(3);
    });
  });
});
