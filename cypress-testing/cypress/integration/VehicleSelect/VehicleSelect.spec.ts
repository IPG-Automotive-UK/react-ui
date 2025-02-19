import "cypress-iframe";
import "@testing-library/cypress/add-commands";

describe("Vehicle Select tests", () => {
  const selectors = [
    { label: "Project Code *", option: "911" },
    { label: "Model Year *", option: "2015" },
    { label: "Vehicle Variant *", option: "JS - 3.6 l6 - 397kW - 7MT -" },
    { label: "Vehicle Variant *", option: "MP - 3.6 l6 - 397kW - 7MT -" },
    { label: "Gate *", option: "Gate 1" },
    { label: "Gate *", option: "Gate 2" }
  ];

  before(() => {
    // Visit the Storybook URL
    cy.visit(
      "http://localhost:6006/?path=/story/selectors-vehicleselect--default"
    );
  });

  selectors.forEach(({ label, option }, index) => {
    it(`Test onChange is called with the expected value for ${label}`, () => {
      // Open the dropdown and select the option
      cy.wait(5000);
      cy.iframe('iframe[title="storybook-preview-iframe"]')
        .findByLabelText(label)
        .click();
      cy.wait(5000);
      cy.iframe('iframe[title="storybook-preview-iframe"]')
        .contains(option, { timeout: 10000 })
        .click();
      cy.wait(5000);

      // Check that onChange was called
      /* if (index === 0) {
        cy.button('iframe[title="storybook-preview-iframe"]')
          .contains("Actions", { timeout: 10000 })
          .should("be.visible")
          .click();
      }
      

      cy.contains("onChange").should("be.visible").click();
      cy.contains(option).should("be.visible");
      */
      cy.get("#tabbutton-storybook-actions-panel") // Using the ID of the button
        .should("be.visible") // Ensure the button is visible before clicking
        .click();
      cy.contains("onChange").should("be.visible").click();
      cy.wait(5000);
      cy.get("span") // Select all span elements in the main DOM
        .contains("Object") // Find the span that contains the text "Object"
        .should("be.visible") // Ensure the span is visible before clicking
        .click(); // Click on the found span
      cy.wait(5000);
      cy.get("span") // Select all span elements in the main DOM
        .contains(option) // Find the span that contains the text "911"
        .should("be.visible");
    });
  });
  // Additional final assertions if necessary
  it("Verify all selections are visible", () => {
    cy.contains("911").should("be.visible");
    cy.contains("2015").should("be.visible");
    cy.contains("JS - 3.6 l6 - 397kW - 7MT -").should("be.visible");
    cy.contains("MP - 3.6 l6 - 397kW - 7MT -").should("be.visible");
    cy.contains("Gate 1").should("be.visible");
    cy.contains("Gate 2").should("be.visible");
  });
});
