import { register } from "@mocks-server/cypress-commands";
import "./commands";

register();
before(() => {
  cy.configureCypressTestingLibrary({
    getElementError(message, container) {
      const error = new Error(
        [message, container.tagName].filter(Boolean).join("\n\n"),
      );
      error.name = "TestingLibraryElementError";
      return error;
    }
  });
});

after(() => {
  cy.mocksSetCollection("default");
});
