'use strict';

var webdriver = require('selenium-webdriver');
var config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
var config = require(config_file).config;

//remove unwanted characters from json
var getValidJson = function(jenkinsInput) {
  var json = jenkinsInput;
  json = json.replace(/\\n/g, "");
  json = json.replace('\\/g', '');
  return json;
};

//When running parallel test capabilities data will come in `process.env.LT_BROWSERS` key
var lt_browsers = null;
if(process.env.LT_BROWSERS) {
  var jsonInput = getValidJson(process.env.LT_BROWSERS);
  lt_browsers = JSON.parse(jsonInput);
}

// create selenium session
var createLTSession = function(config, caps){
  console.log('capabilities', caps);
  console.log('selenium address:', config.server);
  return new webdriver.Builder().
    usingServer(config.server).
    withCapabilities(caps).
    build();
}

var myHooks = function () {
  this.Before(function (scenario, callback) {
    var world = this;
    var task_id = parseInt(process.env.TASK_ID || 0);
    var caps;
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
var getParallelCaps = function (lt_browsers, task_id) {
  var givenCap = lt_browsers[task_id];
  var returnCap = {name: 'parallel_test', build: 'cucumber-js-lambdatest', visual: true, video: true, console: true, network: true};
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
  if(givenCap['tunnel']) {
    returnCap['tunnel'] = true;
  }
  if(givenCap['Tunnel_Name']) {
    returnCap['Tunnel_Name'] = givenCap['Tunnel_Name'];
  }
  // if(givenCap[]) {
  //   returnCap['platform'] = givenCap['operatingSystem'];
  // }
  // if(givenCap[]) {
  //   returnCap['platform'] = givenCap['operatingSystem'];
  // }
  // if(givenCap[]) {
  //   returnCap['platform'] = givenCap['operatingSystem'];
  // }
  return returnCap;
};

module.exports = myHooks;
