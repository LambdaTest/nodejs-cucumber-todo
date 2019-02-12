exports.config = {
  user: process.env.LT_USERNAME || 'faisalr',
  key: process.env.LT_ACCESS_KEY || '34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0',
  server: process.env.LT_GRID_URL || 'https://'+( process.env.LT_USERNAME || 'faisalr' )+':'+(process.env.LT_ACCESS_KEY || '34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0')+'@hub.lambdatest.com/wd/hub',

  commonCapabilities: {
    name: process.env.LT_BUILD_NUMBER || "parallel_test",
    build: process.env.LT_BUILD_NAME || "cucumber-js-lambdatest"
  },

  capabilities: [{
    browserName: process.env.LT_BROWSER_NAME || 'chrome',
    platform: process.env.LT_PLATFORM || 'win10',
    version: process.env.LT_BROWSER_VERSION || "71",
  },{
    browserName: process.env.LT_BROWSER_NAME || 'firefox',
    platform: process.env.LT_PLATFORM || 'win10',
    version: process.env.LT_BROWSER_VERSION || "60",
  },{
    browserName: process.env.LT_BROWSER_NAME || 'safari',
    platform: process.env.LT_PLATFORM || 'macos 10.13',
    version: process.env.LT_BROWSER_VERSION || "11.0",
  },{
    browserName: process.env.LT_BROWSER_NAME || 'internet explorer',
    platform: process.env.LT_PLATFORM || 'win10',
    version: process.env.LT_BROWSER_VERSION || "11",
  }]
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

