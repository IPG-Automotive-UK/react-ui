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

    const feedback = await screen.findByTestId("SentimentSatisfiedAltIcon");
    userEvent.click(feedback);

    const title = await screen.findByRole("textbox", { name: /title/i });
    userEvent.type(title, "Car Maker");

    const description = screen.getByRole("textbox", { name: /description/i });
    userEvent.type(description, "Car Maker");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenLastCalledWith({
        description: "Car Maker",
        title: "Car Maker",
        url: window.location.href
      });
      expect(onSubmit).toBeCalled();
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
