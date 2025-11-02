'use strict';

const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');

When('visit url {string}', async function (url) {
  await this.driver.get(url);
});

When('field with name "First Item" is present check the box', async function () {
  const checkbox = await this.driver.findElement({ name: 'li1' });
  await checkbox.click();
});

When('field with name "Second Item" is present check the box', async function () {
  const checkbox = await this.driver.findElement({ name: 'li3' });
  await checkbox.click();
});

When('select the textbox add {string} in the box', async function (text) {
  const textbox = await this.driver.findElement({ id: 'sampletodotext' });
  await textbox.click();
  await textbox.sendKeys(text);
});

Then('click the {string}', async function (buttonId) {
  const btn = await this.driver.findElement({ id: buttonId });
  await btn.click();
});

Then('I must see title {string}', async function (expectedTitle) {
  const actualTitle = await this.driver.getTitle();
  assert.strictEqual(
    actualTitle,
    expectedTitle,
    `Expected title to be "${expectedTitle}", but got "${actualTitle}"`
  );
});
