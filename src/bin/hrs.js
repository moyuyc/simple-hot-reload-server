#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const DEFAULT_POST = 8082;
const options = {
    help: args.h || args.help,
    path: args._.length === 0 ? process.cwd() : path.resolve(args._[0]),
    port: args.p || args.port || DEFAULT_POST,
    version: args.v || args.version,
    config: args.c || args.config || './hrs.config.js'
};

if (options.help) {
    console.log(
`  Usage: hrs [-p port] path
  
  Options:
    
    -v --version                get current version.
    -p --port                   set port of server. (default: ${DEFAULT_POST})
    -c --config                 config path. (default hrs.config.js)
    -h --help                   how to use it.
`
    );

    process.exit(0);
}

if (options.version) {
    console.log(require('../../package.json').version);
    process.exit(0);
}
if (!fs.existsSync(options.path) || !fs.statSync(options.path).isDirectory()) {
    console.error(`${options.path} not existed or is NOT a directory`);
    process.exit(1);
}

let config;
const configPath = path.resolve(options.config);
if (fs.existsSync(configPath)) {
    config = require(configPath);
}

require('../index')({
    port: options.port,
    config: config,
    path: options.path
});


