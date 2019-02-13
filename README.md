![LambdaTest Logo](https://www.lambdatest.com/static/images/logo.svg)
---

# Cucumber JS
Cucumber JS with LambdaTest<br/>


### Local Setup
- Clone Repo
- Install depedencies 
```npm install```
- Add `username` , `accesskey` and `seleniumAddress` in `*.conf.js` files.

### Run Tests
- For Single environment test run: `npm test`
- For Parallel test run: `npm run parallel`

##### Setting test through jenkins
Please refer this [url](https://www.lambdatest.com/support/docs/display/TD/Selenium+with+Jenkins)
#####  Routing traffic through your local machine
- Set tunnel value to `true` in test capabilities
> OS specific instructions to download and setup tunnel binary can be found at the following links.
>    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
>    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
>    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

##### Run test through lambdatest jenkins plugin
- Give github repository url.
- Select Selenium capabilites
- Enter Lambdatest `username` and `access_key`.


