Feature: JourneyDemo
    Background:
        Given the mock server returns a canned response for a location query of "Gelsenkirchen"

    Scenario: Searching for a stopp
        Given the journey demo is opened
        When "Gelsenkirchen Hbf" is entered into the stop search
        And the search button is clicked
        Then one of the results is "Gelsenkirchen, Hbf"
        And one of the results is "Gelsenkirchen, Hauptbahnhof Parkhaus"
