'use strict';

var webdriver = require('selenium-webdriver');
var config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';

var config = require(config_file).config;

var createLTSession = function(config, caps){
  return new webdriver.Builder().
    usingServer(config.server).
    withCapabilities(caps).
    build();
}

var myHooks = function () {
  this.Before(function (scenario, callback) {
    var world = this;
    var task_id = parseInt(process.env.TASK_ID || 0);
    var caps = config.capabilities[task_id];
    world.driver = createLTSession(config, caps);
    callback();
  });

  this.After(function(scenario, callback){
    this.driver.quit().then(function(){
      callback();
    });
  });
};

module.exports = myHooks;
