'use strict';

var assert = require('cucumber-assert');
var webdriver = require('selenium-webdriver');

module.exports = function() {

  this.When(/^visit url "([^"]*)"$/, function (url, next) {
    this.driver.get('https://lambdatest.github.io/sample-todo-app').then(next);
  });

  this.When(/^field with name "First Item" is present check the box$/, function (next) {
      this.driver.findElement({ name: 'li1' })
      .click().then(next);
  });

  this.When(/^field with name "Second Item" is present check the box$/, function (next) {
      this.driver.findElement({ name: 'li3' })
      .click().then(next);
  });

  this.When(/^select the textbox add "([^"]*)" in the box$/, function (text, next) {
      this.driver.findElement({ id: 'sampletodotext' }).click();
      this.driver.findElement({ id: 'sampletodotext' }).sendKeys(text).then(next);
  });

  this.Then(/^click the "([^"]*)"$/, function (button, next) {
    this.driver.findElement({ id: button }).click().then(next);
  });

  this.Then(/^I must see title "([^"]*)"$/, function (titleMatch, next) {
    this.driver.getTitle()
      .then(function(title) {
        assert.equal(title, titleMatch, next, 'Expected title to be ' + titleMatch);
      });
  });
};