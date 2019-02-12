exports.config = {
  user: process.env.LT_USERNAME || 'faisalr',
  key: process.env.LT_ACCESS_KEY || '34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0',
  server: process.env.LT_GRID_URL || 'https://'+( process.env.LT_USERNAME || 'faisalr' )+':'+(process.env.LT_ACCESS_KEY || '34ixUwLwZu53NVzs8V95u573CiZIJ7KBMvTyT3BSxC0RCE3TM0')+'@hub.lambdatest.com/wd/hub',
  capabilities: [{
    browserName: process.env.LT_BROWSER_NAME || 'chrome',
    name: process.env.LT_BUILD_NUMBER || "single-test",
    build: process.env.LT_BUILD_NAME || "cucumberjs-lambdatest",
    platform: process.env.LT_PLATFORM || "win8",
    version: process.env.LT_BROWSER_VERSION || "71",
    resolution: process.env.LT_RESOLUTION || "1024x768",
    tunnel: true,
  }]
}