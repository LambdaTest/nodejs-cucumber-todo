/*
Default capabilities to be loaded in parallel env test if capabilities not exported  
*/

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
    visual: false,// if true screenshots will be captured
    video: true, // if false video will not generate
    console: false,// if true console logs will come on automation dashboard
    network: false // if true network logs will come 
  },{
    browserName: 'firefox',
    platform: 'win10',
    version: "60",
    visual: true,
    video: true,
    console: true,
    network: true
  },{
    browserName: 'safari',
    platform: 'macos 10.13',
    version: "11.0",
    visual: true,
    video: true,
    console: true,
    network: true
  },{
    browserName: 'internet explorer',
    platform: 'win10',
    version: "11",
    visual: true,
    video: true,
    console: true,
    network: true
  }]
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(let i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

