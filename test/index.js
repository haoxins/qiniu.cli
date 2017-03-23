
'use strict'

const { equal, deepEqual } = require('assert')
const util = require('../lib/util')
const { join } = require('path')

describe('## util', () => {
  describe('# normalize', () => {
    it('success', () => {
      equal(util.normalize('/a/b/c'), 'a-b-c')
      equal(util.normalize('\\a/b\\c'), 'a-b-c')
      equal(util.normalize('\\a\\b\\c'), 'a-b-c')
    })
  })

  describe('# parseConfig', () => {
    it('success', () => {
      const task1 = {
        directory: 'directory1',
        accessKey: 'foo 1',
        secretKey: 'bar 1',
        prefix: 'static1-',
        bucket: 'bucket1'
      }

      const task2 = {
        directory: 'directory2',
        accessKey: 'foo 2',
        secretKey: 'bar 2',
        prefix: 'static2-',
        bucket: 'bucket2'
      }

      let tasks = util.parseConfig(join(__dirname, 'fixture/task.js'))
      deepEqual(tasks[0], task1)
      deepEqual(tasks[1], task2)
    })
  })

  describe('# log', () => {
    it('success', () => {
      util.log('name: %s', 'hello')
      util.log('name: %s', 'hello')
      util.log('name: %s', 'hello')
    })
  })
})
