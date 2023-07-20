Feature: JourneyDemo
    Scenario: Searching for a stopp
        When the journey demo is opened
        And "Gelsenkirchen" is entered into the stop search
        And the search button is clicked
        Then one of the results is "Gelsenkirchen Hbf"
        And one of the results is "Gelsenkirchen-Buer Süd"
