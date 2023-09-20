import { render, screen } from "@testing-library/react";

import React from "react";
import RegistrationForm from "./";
import userEvent from "@testing-library/user-event";

// Team options
const teams = ["Team A", "Team B", "Team C"];

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<RegistrationForm teams={teams} onRegister={() => {}} {...inputs} />);
  return {
    inputs: {
      email: screen.getByLabelText("email"),
      firstName: screen.getByLabelText("firstName"),
      lastName: screen.getByLabelText("lastName"),
      password: screen.getByLabelText("password"),
      passwordRepeat: screen.getByLabelText("passwordRepeat"),
      team: screen.getByTestId("team")
    },
    submit: screen.getByRole("button", { name: /register/i })
  };
}

/**
 * Tests
 */
describe("RegistrationForm", () => {
  it("returns form information to callback when successfully validated", async () => {
    const user = userEvent.setup();
    const onRegister = jest.fn(data => data);
    const elements = setup({ onRegister });
    await user.type(elements.inputs.firstName, "Joe");
    await user.type(elements.inputs.lastName, "Bloggs");
    await user.type(elements.inputs.email, "joe.bloggs@domain.com");
    await user.type(elements.inputs.password, "indigo shark wallplug");
    await user.type(elements.inputs.passwordRepeat, "indigo shark wallplug");
    await user.type(elements.inputs.team, teams[0]);

    // get the button that opens the dropdown, which is a sibling of the input
    const selectButton =
      elements.inputs.team.parentNode.querySelector("[role=button]");

    // open the select dropdown
    await user.click(selectButton);

    // click the list item
    const listItem = screen.getByText(teams[0]);
    if (!listItem) throw new Error("No listItem");
    await user.click(listItem);

    // click register
    await user.click(elements.submit);
    expect(onRegister).toHaveReturnedWith({
      email: "joe.bloggs@domain.com",
      firstName: "Joe",
      lastName: "Bloggs",
      password: "indigo shark wallplug",
      passwordRepeat: "indigo shark wallplug",
      team: teams[0]
    });
  });
  it("doesnt call callback on validation errors", async () => {
    const user = userEvent.setup();
    const onRegister = jest.fn();
    const elements = setup({ onRegister });
    await user.type(elements.inputs.email, "joe.bloggs");
    // incorrect email format
    // missing first, lastname, team, password + password repeat
    user.click(elements.submit);
    expect(onRegister).not.toHaveBeenCalled();
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", async () => {
      const user = userEvent.setup();
      const onRegister = jest.fn();
      const elements = setup({ onRegister });
      await user.type(elements.inputs.password, "something");
      await user.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      expect(
        screen.queryByText("Password strength: 0/4. Minimum required 3+.")
      ).toBeInTheDocument();
    });
    it("displays user feedback on password", async () => {
      const user = userEvent.setup();
      const onRegister = jest.fn();
      const elements = setup({ onRegister });
      await user.type(elements.inputs.password, "something");
      await user.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      expect(
        screen.queryByText(
          "Add another word or two. Uncommon words are better."
        )
      ).toBeInTheDocument();
    });
  });
});
