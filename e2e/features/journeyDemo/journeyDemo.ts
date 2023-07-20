import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("the journey demo is opened", () => {
    cy.visit("/journeyDemo");
});

When("{string} is entered into the stop search", (input: string) => {
    cy.get("[data-cy=\"stopQuery\"]").type(input);
});

When("the search button is clicked", () => {
    cy.get("[data-cy=\"stopQuerySubmit\"]").click();
});

Then("one of the results is {string}", (result: string) => {
    cy.get("[data-cy=\"locationName\"]").contains(result).should("exist");
});
