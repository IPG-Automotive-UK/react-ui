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
        cy.iframe('iframe[title="storybook-preview-iframe"]')
          .findByLabelText(label)
          .click();
        cy.iframe('iframe[title="storybook-preview-iframe"]')
          .contains(option)
          .click();
  
        // Check that onChange was called
        if (index === 0) {
          cy.contains("Actions 1").click();
        }
  
        cy.contains("onChange").should("be.visible");
        cy.contains(option).should("be.visible");
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
  