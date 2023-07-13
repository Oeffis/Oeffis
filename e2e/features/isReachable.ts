import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("I visit the frontpage", () => {
    cy.visit("/");
});

Then("I should see a map", () => {
    cy.get("#map").should("exist");
});
