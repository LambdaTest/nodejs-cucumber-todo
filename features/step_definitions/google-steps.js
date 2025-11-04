'use strict';

const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { By, until } = require('selenium-webdriver');

When('I type query as {string}', async function (searchQuery) {
  // Go to Google homepage
  await this.driver.get('https://www.google.com/ncr');

  // Accept cookie popup if present (handles both popup/no-popup cases)
  try {
    const acceptButton = await this.driver.findElement(By.xpath("//div[text()='Accept all']"));
    await acceptButton.click();
  } catch (e) {
    // Popup not found — continue silently
  }

  // Type query and press Enter
  const searchBox = await this.driver.findElement(By.name('q'));
  await searchBox.sendKeys(searchQuery, '\n');
});

Then('I submit', async function () {
  // Wait until search results are loaded
  await this.driver.wait(until.elementLocated(By.id('search')), 10000);
});

Then('I should see title {string}', async function (expectedTitle) {
  // Wait until title contains query text
  await this.driver.wait(async () => {
    const title = await this.driver.getTitle();
    return title && title.includes(expectedTitle);
  }, 10000);

  const actualTitle = await this.driver.getTitle();
  assert.ok(
    actualTitle.includes(expectedTitle),
    `❌ Expected title to include "${expectedTitle}", but got "${actualTitle}"`
  );
});
