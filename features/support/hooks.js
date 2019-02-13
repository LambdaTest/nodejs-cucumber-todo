'use strict';

var webdriver = require('selenium-webdriver');
var config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
if(process.env.LT_BROWSERS) {
  config_file = '../../conf/parallel.conf.js';
}

//remove unwanted characters from jenkins json
var getValidJson = function(jenkinsInput) {
  var json = process.env.LT_BROWSERS;
  json = json.replace(/\\n/g, "");
  json = json.replace('\\/g', '');
  return json;
};

var config = require(config_file).config;

var lt_browsers = null;
if(process.env.LT_BROWSERS) {
  var jsonInput = getValidJson(process.env.LT_BROWSERS);
  lt_browsers = JSON.parse(jsonInput);
}

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
  var returnCap = {name: 'parallel_test', build: 'cucumber-js-lambdatest'};
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
