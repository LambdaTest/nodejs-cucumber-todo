![LambdaTest Logo](https://www.lambdatest.com/static/images/logo.svg)
---

# nodejs-cucumber-todo
[Cucumber JS](https://www.npmjs.com/package/selenium-cucumber-js) integration with LambdaTest


### Local Setup
- Clone Repository
- Install dependencies by running command
```npm install```
- Add `username` and `accesskey` in `cred.conf.js` file located in conf folder.
```
exports.cred = {
	username: process.env.LT_USERNAME || 'YOUR_USERNAME',
	access_key: process.env.LT_ACCESS_KEY || 'YOUR_ACCESS_KEY'
}
```
- Or yon can simply export `username` and `access_key` using simple commands
```
export LT_USERNAME=YOUR_USERNAME
export LT_ACCESS_KEY=YOUR_ACCESS_KEY
```

### Run Tests
- For Single environment test run: `npm test`
- For Parallel test run: `npm run parallel`

##### Setting test through jenkins
Please refer this [url](https://www.lambdatest.com/support/docs/display/TD/Selenium+with+Jenkins)
#####  Routing traffic through your local machine
- Set `tunnel` value to `true` in test capabilities
> OS specific instructions to download and setup tunnel binary can be found at the following links.
>    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
>    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
>    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)




