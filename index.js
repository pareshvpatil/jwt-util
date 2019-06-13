#!/usr/bin/env node

const vorpal = require('vorpal')();
const jwtUtil = require('./jwt-util');
const chalk = require('chalk');

const args = process.argv;

vorpal
    .command('create', 'create jwt',{})
    .option('-p, --payload <payload>', 'payload in single quotes')
    .types({string: ['p', 'payload']})
    .option('-k, --key <key>', 'encryption key 16 bytes')
    .types({string: ['k', 'key']})
    .option('-a, --algorithm <algo>', 'encryption algorithm, ex. AES128KW')
    .types({string: ['a', 'algorithm']})
    .option('-m, --method <method>', 'encryption method, ex. A128CBC-HS256')
    .types({string: ['m', 'method']})
    .option('-e, --expireIn <expiry>', 'expiration time in seconds')
    .types({string: ['e', 'expireIn']})
    .action(function (args, callback) {
        let opts = args.options;
        if (!opts.payload || !opts.key || !opts.method) {
            this.log(chalk.yellow('please enter mandatory fields, run `create --help` for more information'));
        } else {
            this.log(chalk.green(jwtUtil.createJWToken(opts.payload, opts.key, opts.algorithm, opts.method, opts.expireIn)));
        }
        callback();
    });

vorpal
    .command('update', 'update jwt', {})
    .option('-t, --token <token>', 'jw token')
    .types({string: ['t', 'token']})
    .option('-p, --payload <payload>', 'additional payload in single quotes')
    .types({string: ['p', 'payload']})
    .option('-k, --key <key>', 'encryption key 16 bytes')
    .types({string: ['k', 'key']})
    .option('-a, --algorithm <algo>', 'encryption algorithm, ex. AES128KW')
    .types({string: ['a', 'algorithm']})
    .option('-m, --method <method>', 'encryption method, ex. A128CBC-HS256')
    .types({string: ['m', 'method']})
    .option('-e, --expireIn <expiry>', 'expiration time in seconds')
    .types({string: ['e', 'expireIn']})
    .action(function (args, callback) {
        let opts = args.options;
        if (!opts.payload || !opts.key || !opts.method) {
            this.log(chalk.yellow('please enter mandatory fields, run `create --help` for more information'));
        } else {
            this.log(chalk.yellow(jwtUtil.updateJWToken(opts.token, opts.payload, opts.key, opts.algorithm, opts.method, opts.expireIn)));
        }
        callback();
    });

vorpal
    .command('decrypt', 'decrypt jwt', {})
    .option('-t, --token <token>', 'jwtoken to decrypt')
    .types({string: ['p', 'payload']})
    .option('-k, --key <key>', 'encryption key 16 bytes')
    .types({string: ['k', 'key']})
    .action(function (args, callback) {
        let opts = args.options;
        if (!opts.token || !opts.key) {
            this.log(chalk.yellow('please enter mandatory fields, run `create --help` for more information'));
        } else {
            this.log('\n\n');
            this.log(jwtUtil.decryptJWToken(opts.token, opts.key));
        }
        callback();
    });

vorpal
    .delimiter('jwt-util~$')
    .show();
