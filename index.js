#!/usr/bin/env node

'use strict'

const version = require('./package').version
const Worker = require('./lib/worker')
const program = require('commander')
const util = require('./lib/util')

program
  .version(version)
  .option('-c, --config [config]', 'config file')
  .option('-v, --verbose', 'verbose')
  .parse(process.argv)

if (program.config) {
  const tasks = util.parseConfig(program.config)
  const workers = tasks.map((task) => {
    task.verbose = !!program.verbose
    return new Worker(task)
  })

  Promise.all(workers.map((worker) => {
    return worker.upload()
  })).then(() => {
    console.log('upload finished')
  })
}
