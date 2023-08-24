import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("I visit the frontpage", () => {
  cy.visit("/");
});

Then("I should see a an inputs for the start and the destination", () => {
  cy.findByTestId("origin-input").should("exist");
  cy.findByTestId("destination-input").should("exist");
});
