import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the start page is open", () => {
  cy.visit("/");
});

Given("the mock server is prepared to handle location queries", () => {
  cy.mocksSetCollection(`Location Query`);
});

Given("the mock server is set up to create a route from {string} to {string}", (origin: string, destination: string) => {
  cy.mocksSetCollection(`Route from '${origin}' to '${destination}'`);
});

Given("I have entered {string} as the start location", (origin: string) => {
  clickStartInput();
  typeIntoLocationSearch(origin);
  clickLocationResult(origin);
  assertOriginLocationIs(origin);
});

Given("I have entered {string} as the destination location", (destination: string) => {
  clickDestinationInput();
  typeIntoLocationSearch(destination);
  clickLocationResult(destination);
  assertDestinationLocationIs(destination);
});

When("the start input is clicked", clickStartInput);
When("the destination input is clicked", clickDestinationInput);
When("{string} is entered into the search field", typeIntoLocationSearch);

Then("one of the results is {string}", (result: string) => {
  cy.findAllByTestId("locationName").contains(result).should("exist");
});

When("the result {string} is clicked", clickLocationResult);
Then("the start location should be {string}", assertOriginLocationIs);
Then("the destination location should be {string}", assertDestinationLocationIs);

Then("I get a route option with a duration of {int} Min and the following legs:", (duration: string, table: { rawTable: string[][] }) => {
  const legs = table.rawTable.slice(1).map(row => ({
    from: row[0],
    to: row[1],
    departure: row[2],
    arrival: row[3]
  }));

  cy.findAllByTestId("journey-details")
    .eq(1)
    .as("journeyDetails");

  cy.get("@journeyDetails")
    .findByTestId("journey-details-duration")
    .should("have.text", duration);

  cy.get("@journeyDetails")
    .findByTestId("journey-details-start-time")
    .should("have.text", legs[0].departure)
    .scrollIntoView();

  cy.get("@journeyDetails")
    .findByTestId("journey-details-end-time")
    .should("have.text", legs[legs.length - 1].arrival);

  cy.get("@journeyDetails")
    .findByTestId("journey-details-open")
    .click();

  cy.get("@journeyDetails").findAllByTestId("journey-step").as("legs");

  for (const [index, leg] of legs.entries()) {
    cy.get("@legs")
      .eq(index)
      .as("leg");

    cy.get("@leg")
      .findByTestId("journey-step-start-time")
      .should("have.text", leg.departure);

    cy.get("@leg")
      .findByTestId("journey-step-arrival-time")
      .should("have.text", leg.arrival);

    cy.get("@leg")
      .findByTestId("journey-step-stop-name")
      .should("have.text", leg.to);
  }
});

function clickStartInput(): void {
  cy.findByTestId("origin-input-clickable").click();
}

function clickDestinationInput(): void {
  cy.findByTestId("destination-input-clickable").click();
}

function typeIntoLocationSearch(query: string): void {
  cy.findByTestId("location-search-input").type(query);
}

function clickLocationResult(result: string): void {
  cy.findAllByTestId("locationName").contains(result).click();
}

function assertOriginLocationIs(result: string): void {
  cy.findByTestId("origin-input-clickable").should("have.value", result);
}

function assertDestinationLocationIs(result: string): void {
  cy.findByTestId("destination-input-clickable").should("have.value", result);
}
