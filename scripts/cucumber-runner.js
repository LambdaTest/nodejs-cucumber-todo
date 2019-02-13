#!/usr/bin/env node
console.log('in runner');
var child_process = require('child_process');
var config_file = '../conf/' + (process.env.CONFIG_FILE || 'single') + '.conf.js';
var config = require(config_file).config;

process.argv[0] = 'node';
process.argv[1] = './node_modules/.bin/cucumber-js';

var getValidJson = function(jenkinsInput) {
	var json = process.env.LT_BROWSERS;
	json = json.replace(/\\n/g, "");
	json = json.replace('\\/g', '');
	return json;
};

var lt_browsers = null;
if(process.env.LT_BROWSERS) {
	console.log(process.env.LT_BROWSERS);
	var jsonInput = getValidJson(process.env.LT_BROWSERS);
  	lt_browsers = JSON.parse(jsonInput);
}

for( var i in (lt_browsers || config.capabilities) ){
  var env = Object.create( process.env );
  env.TASK_ID = i.toString();
  var p = child_process.spawn('/usr/bin/env', process.argv, { env: env } );  
  p.stdout.pipe(process.stdout);
}