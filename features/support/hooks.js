'use strict';

const { Before, After, setDefaultTimeout, setWorldConstructor } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');

setDefaultTimeout(60 * 1000); // ✅ allow 60 seconds for driver creation


const config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
const config = require(config_file).config;

const getValidJson = function (jenkinsInput) {
  let json = jenkinsInput;
  json = json.replace(/\\n/g, '');
  json = json.replace('\\/g', '');
  return json;
};

let lt_browsers = null;
if (process.env.LT_BROWSERS) {
  let jsonInput = getValidJson(process.env.LT_BROWSERS);
  lt_browsers = JSON.parse(jsonInput);
}

const createLTSession = async function (config, caps) {
  console.log('Creating session with caps:', caps);
  return await new webdriver.Builder()
    .usingServer(config.server)
    .withCapabilities(caps)
    .build();
};

const getParallelCaps = function (lt_browsers, task_id) {
  let givenCap = lt_browsers[task_id];
  let returnCap = {
    name: 'parallel_test',
    build: 'cucumber-js-lambdatest',
    visual: true,
    video: true,
    console: true,
    network: true
  };
  if (givenCap['operatingSystem']) returnCap['platform'] = givenCap['operatingSystem'];
  if (givenCap['browserName']) returnCap['browserName'] = givenCap['browserName'];
  if (givenCap['browserVersion']) returnCap['version'] = givenCap['browserVersion'];
  if (givenCap['resolution']) returnCap['resolution'] = givenCap['resolution'];
  if (process.env.LT_TUNNEL_NAME) {
    returnCap['tunnel'] = true;
    returnCap['TunnelName'] = process.env.LT_TUNNEL_NAME;
  }
  return returnCap;
};

// ✅ Define a custom World that exposes `this.driver`
class CustomWorld {
  constructor() {
    this.driver = null;
  }

  async createDriver() {
    const task_id = parseInt(process.env.TASK_ID || 0);
    const caps = lt_browsers
      ? getParallelCaps(lt_browsers, task_id)
      : config.capabilities[task_id];

    this.driver = await createLTSession(config, caps);
  }

  async quitDriver() {
    if (this.driver) {
      await this.driver.quit();
    }
  }
}

setWorldConstructor(CustomWorld);

// ✅ Attach hooks
Before(async function () {
  await this.createDriver();
});

After(async function () {
  await this.quitDriver();
});
