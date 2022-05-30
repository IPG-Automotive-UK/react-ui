import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
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
      team: screen.getByTestId("team")
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
    act(() => {
      userEvent.type(elements.inputs.firstName, "Joe");
      userEvent.type(elements.inputs.lastName, "Bloggs");
      userEvent.type(elements.inputs.email, "joe.bloggs@domain.com");
      userEvent.type(elements.inputs.password, "indigo shark wallplug");
      userEvent.type(elements.inputs.passwordRepeat, "indigo shark wallplug");
      userEvent.type(elements.inputs.team, teams[0]);
    });
    await selectMaterialUiSelectOption(elements.inputs.team, teams[0]);
    fireEvent.submit(elements.submit);
    await waitFor(() =>
      expect(onRegister).toHaveReturnedWith({
        email: "joe.bloggs@domain.com",
        firstName: "Joe",
        lastName: "Bloggs",
        password: "indigo shark wallplug",
        passwordRepeat: "indigo shark wallplug",
        team: teams[0]
      })
    );
  });
  it("doesnt call callback on validation errors", async () => {
    const onRegister = jest.fn();
    const elements = setup({ onRegister });
    act(() => {
      userEvent.type(elements.inputs.email, "joe.bloggs");
    });
    // incorrect email format
    // missing first, lastname, team, password + password repeat
    fireEvent.submit(elements.submit);
    await waitFor(() => expect(onRegister).not.toHaveBeenCalled());
  });
  describe("Password restrictions", () => {
    it("displays password complexity score", async () => {
      const onRegister = jest.fn();
      const elements = setup({ onRegister });
      act(() => {
        userEvent.type(elements.inputs.password, "something");
        userEvent.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      });
      await waitFor(() =>
        expect(
          screen.queryByText("Password strength: 0/4. Minimum required 3+.")
        ).toBeInTheDocument()
      );
    });
    it("displays user feedback on password", async () => {
      const onRegister = jest.fn();
      const elements = setup({ onRegister });
      act(() => {
        userEvent.type(elements.inputs.password, "something");
        userEvent.click(elements.inputs.passwordRepeat); // moving to next form element triggers validation
      });
      await waitFor(() =>
        expect(
          screen.queryByText(
            "Add another word or two. Uncommon words are better."
          )
        ).toBeInTheDocument()
      );
    });
  });
});
