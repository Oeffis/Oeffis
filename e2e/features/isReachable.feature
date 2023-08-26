Feature: can be reached
    Scenario: visiting the frontpage
        When I visit the frontpage
        Then I should see a buttons for origin-input-clickable and destination-input-clickable
