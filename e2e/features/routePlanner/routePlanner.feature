Feature: RoutePlanner
  Background:
    Given the start page is open

  Scenario: a start location can be picked
    Given the mock server is prepared to handle location queries
    When the start input is clicked
    And "Gelsenkirchen" is entered into the search field
    Then one of the results is "Gelsenkirchen, Hbf"
    And one of the results is "Gelsenkirchen, Hauptbahnhof Parkhaus"
    When the result "Gelsenkirchen, Hbf" is clicked
    Then the start location should be "Gelsenkirchen, Hbf"

  Scenario: a destination location can be picked
    Given the mock server is prepared to handle location queries
    When the destination input is clicked
    And "Gelsenkirchen" is entered into the search field
    Then one of the results is "Gelsenkirchen, Hbf"
    And one of the results is "Gelsenkirchen, Hauptbahnhof Parkhaus"
    When the result "Gelsenkirchen, Hbf" is clicked
    Then the destination location should be "Gelsenkirchen, Hbf"

  Scenario: a route can be planned
    Given the mock server is set up to create a route from "Gelsenkirchen, Hbf" to "Köln Hbf"
    And I have entered "Gelsenkirchen, Hbf" as the start location
    When I have entered "Köln, Köln Hbf" as the destination location
    Then I get a route option with a duration of 60 Min and the following legs:
      | from               | to           | departure    | arrival      |
      | Gelsenkirchen, Hbf | Duisburg Hbf | 20.10. 13:39 | 20.10. 14:03 |
      | Duisburg Hbf       | Köln Hbf     | 20.10. 14:13 | 20.10. 14:49 |
