const lambdaCredentials = require('./cred.conf.js').cred;

exports.config = {
  user: lambdaCredentials.username,
  key: lambdaCredentials.access_key,
  server: process.env.LT_GRID_URL || 'https://'+lambdaCredentials.username+':'+lambdaCredentials.access_key+'@hub.lambdatest.com/wd/hub',
  capabilities: [{
    browserName: process.env.LT_BROWSER_NAME || 'chrome',
    name: process.env.LT_BUILD_NUMBER || "single-test",
    build: process.env.LT_BUILD_NAME || "cucumberjs-lambdatest",
    platform: process.env.LT_PLATFORM || "win8",
    version: process.env.LT_BROWSER_VERSION || "71",
    resolution: process.env.LT_RESOLUTION || "1024x768",
    tunnel: process.env.tunnel ? true : false,
  }]
}
