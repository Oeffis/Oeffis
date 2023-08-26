Feature: RoutePlanner
  Background:
    Given the start page is open

  Scenario: a start location can be picked
    When the start input is clicked
    And the mock server is prepared to return a canned response for "Gelsenkirchen Hbf"
    And "Gelsenkirchen Hbf" is entered into the search field
    Then one of the results is "Gelsenkirchen, Hbf"
    And one of the results is "Gelsenkirchen, Hauptbahnhof Parkhaus"
    When the result "Gelsenkirchen, Hbf" is clicked
    Then the start location should be "Gelsenkirchen, Hbf"

  Scenario: a destination location can be picked
    When the destination input is clicked
    And the mock server is prepared to return a canned response for "Gelsenkirchen Hbf"
    And "Gelsenkirchen Hbf" is entered into the search field
    Then one of the results is "Gelsenkirchen, Hbf"
    And one of the results is "Gelsenkirchen, Hauptbahnhof Parkhaus"
    When the result "Gelsenkirchen, Hbf" is clicked
    Then the destination location should be "Gelsenkirchen, Hbf"
