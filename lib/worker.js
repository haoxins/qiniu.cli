
'use strict'

const read = require('fs-readdir-recursive')
const { resolve } = require('path')
const assert = require('assert')
const qiniu = require('qiniu')
const util = require('./util')

class Worker {
  constructor(opts) {
    assert(typeof opts === 'object', 'opts required')
    assert(typeof opts.directory === 'string', 'directory required')

    this.opts = opts
  }

  upload() {
    const self = this

    const { opts } = self

    const {
      rename = util.normalize,
      accessKey,
      secretKey,
      directory,
      verbose,
      bucket,
      prefix
    } = opts

    qiniu.conf.ACCESS_KEY = accessKey
    qiniu.conf.SECRET_KEY = secretKey

    const files = read(directory).map((p) => {
      return {
        filename: p,
        filepath: resolve(directory, p)
      }
    })

    return Promise.all(files.map((file) => {
      const dest = prefix + rename(file.filename)
      if (verbose) {
        util.log('PUT file: %s, to: %s', file.filepath, dest)
      }

      function uptoken(bucket, dest) {
        const putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + dest)
        return putPolicy.token()
      }

      const token = uptoken(bucket, dest)

      const extra = new qiniu.io.PutExtra()

      return new Promise((resolve, reject) => {
        qiniu.io.putFile(token, dest, file.filepath, extra, (err, info) => {
          if (err) {
            return reject(err)
          }

          util.log('upload: %s success !', info.key)
        })
      })
    }))
  }
}

module.exports = Worker
