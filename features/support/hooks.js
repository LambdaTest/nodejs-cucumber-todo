'use strict';

const webdriver = require('selenium-webdriver');
const config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
const config = require(config_file).config;

//remove unwanted characters from json
const getValidJson = function(jenkinsInput) {
  let json = jenkinsInput;
  json = json.replace(/\\n/g, "");
  json = json.replace('\\/g', '');
  return json;
};

//When running parallel test capabilities data will come in `process.env.LT_BROWSERS` key
let lt_browsers = null;
if(process.env.LT_BROWSERS) {
  let jsonInput = getValidJson(process.env.LT_BROWSERS);
  lt_browsers = JSON.parse(jsonInput);
}

// create selenium session
const createLTSession = function(config, caps){
  console.log('capabilities', caps);
  console.log('selenium address:', config.server);
  return new webdriver.Builder().
    usingServer(config.server).
    withCapabilities(caps).
    build();
}

const myHooks = function () {
  this.Before(function (scenario, callback) {
    let world = this;
    let task_id = parseInt(process.env.TASK_ID || 0);
    let caps;
    if(lt_browsers) {
      caps = getParallelCaps(lt_browsers, task_id);
    } else {
      caps = config.capabilities[task_id];
    }
    world.driver = createLTSession(config, caps);
    callback();
  });

  this.After(function(scenario, callback){
    this.driver.quit().then(function(){
      callback();
    });
  });
};

// Mapping capabilities
const getParallelCaps = function (lt_browsers, task_id) {
  let givenCap = lt_browsers[task_id];
  let returnCap = {name: 'parallel_test', build: 'cucumber-js-lambdatest', visual: true, video: true, console: true, network: true};
  if(givenCap['operatingSystem']) {
    returnCap['platform'] = givenCap['operatingSystem'];
  }
  if(givenCap['browserName']) {
    returnCap['browserName'] = givenCap['browserName'];
  }
  if(givenCap['browserVersion']) {
    returnCap['version'] = givenCap['browserVersion'];
  }
  if(givenCap['resolution']) {
    returnCap['resolution'] = givenCap['resolution'];
  }
  if(process.env.LT_TUNNEL_NAME != "" && process.env.LT_TUNNEL_NAME != undefined) {
    returnCap['tunnel'] = true;
    returnCap['TunnelName'] = process.env.LT_TUNNEL_NAME;
  }
  return returnCap;
};

module.exports = myHooks;
