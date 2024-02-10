#!/usr/bin/env node

const yargs = require('yargs/yargs')
const moment = require('moment');

const { hideBin } = require('yargs/helpers');
const { demandCommand } = require('yargs');

var argv = yargs(hideBin(process.argv))
    .command({
        command: 'current',
        builder: setBooleanOptions,
        handler: currentHandler
    })
    .command({
        command: 'add',
        builder: setNumberOptions,
        handler: addHandler
    })
    .command({
        command: 'sub',
        builder: setNumberOptions,
        handler: subHandler
    })
    .demandCommand(1, 'use one of the commands: current, add, sub')
    .strict()
    .parse()

function currentHandler(argv) {
    var now = moment()
    switch (true) {
        case argv.year:
            result = now.year()
            break;
        case argv.month:
            result = now.format('MMMM')
            break;
        case argv.date:
            result = now.date()
            break;
        default:
            result = now.toISOString()
    }
    console.log(result)
}

function addHandler(argv) {
    var result = moment()
        .add(argv.year, 'years')
        .add(argv.month, 'months')
        .add(argv.date, 'days')
    console.log(result.toISOString())
}

function subHandler(argv) {
    var result = moment()
        .subtract(argv.year, 'years')
        .subtract(argv.month, 'months')
        .subtract(argv.date, 'days')
    console.log(result.toISOString())
}

function setNumberOptions(yargs) {
    yargs
        .option('y', {
            alias: 'year',
            type: 'number',
            requiresArg: true,
            default: 0,
        })
        .option('m', {
            alias: 'month',
            type: 'number',
            requiresArg: true,
            default: 0,
        })
        .option('d', {
            alias: 'date',
            type: 'number',
            requiresArg: true,
            default: 0,
        });
}

function setBooleanOptions(yargs) {
    yargs
        .option('y', {
            alias: 'year',
            type: 'boolean',
        })
        .option('m', {
            alias: 'month',
            type: 'boolean',
        })
        .option('d', {
            alias: 'date',
            type: 'boolean',
        })
}