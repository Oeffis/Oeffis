import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the mock server returns a canned response for a location query of \"Gelsenkirchen\"", () => {
    cy.mocksSetCollection("Query for 'Gelsenkirchen Hbf'");
});

When("the journey demo is opened", () => {
    cy.visit("/journeyDemo");
});

When("{string} is entered into the stop search", (input: string) => {
    cy.findByTestId("stopQuery").type(input);
});

When("the search button is clicked", () => {
    cy.findByTestId("stopQuerySubmit").click();
});

Then("one of the results is {string}", (result: string) => {
    cy.findAllByTestId("locationName").contains(result).should("exist");
});
