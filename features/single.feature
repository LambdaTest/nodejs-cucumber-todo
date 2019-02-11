Feature: Google's Search Functionality

  Scenario: Can find search results
    When I type query as "Lambdatest"
    Then I submit
    Then I should see title "Lambdatest - Google Search"
