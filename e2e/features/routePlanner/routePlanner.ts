import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the start page is open", () => {
  cy.visit("/");
});

When("the start input is clicked", () => {
  cy.findByTestId("origin-input-clickable").click();
});

When("the destination input is clicked", () => {
  cy.findByTestId("destination-input-clickable").click();
});

When("the mock server is prepared to return sample locations for {string}", (query: string) => {
  cy.mocksSetCollection(`Query for '${query}'`);
});

When("{string} is entered into the search field", (query: string) => {
  cy.findByTestId("location-search-input").type(query);
});

Then("one of the results is {string}", (result: string) => {
  cy.findAllByTestId("locationName").contains(result).should("exist");
});

When("the result {string} is clicked", (result: string) => {
  console.log("clicking", result);
  cy.findAllByTestId("locationName").contains(result).click();
});

Then("the start location should be {string}", (result: string) => {
  cy.findByTestId("origin-input-clickable").should("have.value", result);
});

Then("the destination location should be {string}", (result: string) => {
  cy.findByTestId("destination-input-clickable").should("have.value", result);
});
