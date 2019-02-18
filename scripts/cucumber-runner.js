#!/usr/bin/env node
/*
This is parallel test runner file.
It creates child processes equals the number of
test environments passed.
*/
let child_process = require('child_process');
let config_file = '../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
let config = require(config_file).config;

process.argv[0] = 'node';
process.argv[1] = './node_modules/.bin/cucumber-js';

const getValidJson = function(jenkinsInput) {
	let json = jenkinsInput;
	json = json.replace(/\\n/g, "");
	json = json.replace('\\/g', '');
	return json;
};

let lt_browsers = null;
if(process.env.LT_BROWSERS) {
	let jsonInput = getValidJson(process.env.LT_BROWSERS);
  	lt_browsers = JSON.parse(jsonInput);
}

for( let i in (lt_browsers || config.capabilities) ){
  let env = Object.create( process.env );
  env.TASK_ID = i.toString();
  let p = child_process.spawn('/usr/bin/env', process.argv, { env: env } );  
  p.stdout.pipe(process.stdout);
}