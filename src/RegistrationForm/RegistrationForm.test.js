import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import RegistrationForm from "./";
import { selectMaterialUiSelectOption } from "../testUtils";
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
      team: screen.getByLabelText("team")
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
  it("returns form information to callback when successfully validated", async () => {
    const onRegister = jest.fn(data => data);
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
    const onRegister = jest.fn();
    const elements = setup({ onRegister });
    await act(async () => {
      await userEvent.type(elements.inputs.email, "joe.bloggs");
      // incorrect email format
      // missing first, lastname, team, password + password repeat
      fireEvent.submit(elements.submit);
    });
    expect(onRegister).not.toHaveBeenCalled();
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
