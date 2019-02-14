const lambdaCredentials = require('./cred.conf.js').cred;

exports.config = {
  user: lambdaCredentials.username,
  key: lambdaCredentials.access_key,
  server: process.env.LT_GRID_URL || 'https://'+ lambdaCredentials.username +':'+ lambdaCredentials.access_key +'@hub.lambdatest.com/wd/hub',

  commonCapabilities: {
    name: process.env.LT_BUILD_NUMBER || "parallel_test",
    build: process.env.LT_BUILD_NAME || "cucumber-js-lambdatest"
  },

  capabilities: [{
    browserName: 'chrome',
    platform: 'win10',
    version: "71",
  },{
    browserName: 'firefox',
    platform: 'win10',
    version: "60",
  },{
    browserName: 'safari',
    platform: 'macos 10.13',
    version: "11.0",
  },{
    browserName: 'internet explorer',
    platform: 'win10',
    version: "11",
  }]
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

