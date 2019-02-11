exports.config = {
  user: 'faisalr',
  key: '34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0',
  server: 'https://faisalr:34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0@hub.lambdatest.com/wd/hub',

  commonCapabilities: {
    name: "parallel_test",
    build: "cucumber-js-lambdatest"
  },

  capabilities: [{
    browserName: 'chrome',
    platform: 'win10',
    version: "71",
  },{
    browserName: 'firefox',
    platform: 'win8',
    version: "64",
  },{
    browserName: 'safari',
  },{
    browserName: 'internet explorer',
    platform: 'win10',
    version: "12",
  }]
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});

