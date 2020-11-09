import React from "react";
import RegistrationForm from "./RegistrationForm";
import {
  render,
  fireEvent,
  screen,
  within,
  waitForElementToBeRemoved,
  act
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Helper to select a material ui component
 */
export const selectMaterialUiSelectOption = async (element, optionText) =>
  new Promise(resolve => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector("[role=button]");

    // Open the select dropdown
    fireEvent.mouseDown(selectButton);

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector("ul[role=listbox]");

    // Click the list item
    const listItem = within(listbox).getByText(optionText);

    if (!listItem) throw new Error("No listItem");
    userEvent.click(listItem);

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector("ul[role=listbox]")
    ).then(resolve);
  });

// Team options
const teams = ["Team A", "Team B", "Team C"];

/**
 * Test setup function that renders component and returns elements for testing
 */
function setup(inputs) {
  render(<RegistrationForm teams={teams} onRegister={() => {}} {...inputs} />);
  return {
    inputs: {
      firstName: screen.getByLabelText("firstName"),
      lastName: screen.getByLabelText("lastName"),
      email: screen.getByLabelText("email"),
      team: screen.getByLabelText("team"),
      password: screen.getByLabelText("password"),
      passwordRepeat: screen.getByLabelText("password_repeat")
    },
    submit: screen.getByRole("button", {
      name: /register/i
    })
  };
}

/**
 * Tests
 */
describe("RegistrationForm", () => {
  it("returns form information to parent when successfully validated", async () => {
    const onRegister = jest.fn();
    const elements = setup({ onRegister });
    await act(async () => {
      await userEvent.type(elements.inputs.firstName, "Joe");
      await userEvent.type(elements.inputs.lastName, "Bloggs");
      await userEvent.type(elements.inputs.email, "joe.bloggs@domain.com");
      await selectMaterialUiSelectOption(elements.inputs.team, teams[0]);
      await userEvent.type(elements.inputs.password, "indigo shark wallplug");
      await userEvent.type(
        elements.inputs.passwordRepeat,
        "indigo shark wallplug"
      );
      fireEvent.submit(elements.submit);
    });
    expect(onRegister).toHaveBeenCalled();
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", () => {
      render(<RegistrationForm teams={teams} onRegister={() => {}} />);
      const input = screen.getByLabelText("password");
      const password = "something";
      fireEvent.change(input, { target: { value: password } });
      expect(
        screen.findByText("Password strength: 0/4. Minimum required 3+.")
      ).toBeTruthy();
    });
    it("displays user feedback on password", () => {
      render(<RegistrationForm teams={teams} onRegister={() => {}} />);
      const input = screen.getByLabelText("password");
      const password = "something";
      fireEvent.change(input, { target: { value: password } });
      expect(
        screen.findByText("Add another word or two. Uncommon words are better.")
      ).toBeTruthy();
    });
  });
});
