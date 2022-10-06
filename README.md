![LambdaTest Logo](https://www.lambdatest.com/resources/images/logos/logo.svg)
---

# Nodejs Cucumber todo List

[Cucumber JS](https://www.npmjs.com/package/selenium-cucumber-js) integration with [LambdaTest](https://www.lambdatest.com/)


### Local Setup
- Clone Repository
- cd ```nodejs-cucumber-todo```
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

## About LambdaTest
[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.



