Feature: Automate a website
    Scenario: perform click events
      When visit url "https://www.testmuai.com/selenium-playground/todo-app/"
      When field with name "First Item" is present check the box
      When field with name "Second Item" is present check the box
      When select the textbox add "Let's add new to do item" in the box
      Then click the "addbutton"
      Then I must see title "Selenium Grid Online | Run Selenium Test On Cloud"