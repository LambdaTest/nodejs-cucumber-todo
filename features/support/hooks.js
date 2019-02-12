'use strict';

var webdriver = require('selenium-webdriver');
var config_file = '../../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';

var config = require(config_file).config;
var lt_browsers = null;

if(process.env.LT_BROWSERS) {
  var lt_browsers = JSON.parse(process.env.LT_BROWSERS);
}

console.log(lt_browsers);

var createLTSession = function(config, caps){
  console.log(caps);
  return new webdriver.Builder().
    usingServer(config.server).
    withCapabilities(caps).
    build();
}

var myHooks = function () {
  this.Before(function (scenario, callback) {
    var world = this;
    if(lt_browsers) {
      for (var i = lt_browsers.length - 1; i >= 0; i--) {
        var common_caps =  {
          name: "parallel_test",
          build: "cucumber-js-lambdatest"
        };
        if(lt_browsers[i]['lt_browsers'])
          common_caps['browserName'] = lt_browsers[i]['lt_browsers'];
        if(lt_browsers[i]['browserVersion'])
          common_caps['version'] = lt_browsers[i]['browserVersion'];
        if(lt_browsers[i]['operatingSystem'])
          common_caps['platform'] = lt_browsers[i]['operatingSystem'];
        if(lt_browsers[i]['resolution'])
          common_caps['resolution'] = lt_browsers[i]['resolution'];
        world.driver = createLTSession(config, common_caps);
        callback();
      }
    } else {
      var task_id = parseInt(process.env.TASK_ID || 0);
      var caps = config.capabilities[task_id];
      world.driver = createLTSession(config, caps);
      callback();
    }
  });

  this.After(function(scenario, callback){
    this.driver.quit().then(function(){
      callback();
    });
  });
};

module.exports = myHooks;
