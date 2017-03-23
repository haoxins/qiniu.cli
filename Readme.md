
### qiniu.cli

* Install

```bash
$ [sudo] npm i qiniu.cli -g
```

* `usage`

```js
Usage: qiniu [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --config [config]  config file
    -v, --verbose          verbose
```

* `config.js`

```js
module.exports = {
  accessKey: 'your access key',
  secretKey: 'your secret key',
  tasks: [{
    directory: 'your local directory',
    prefix: 'file name prefix',
    bucket: 'your bucket',
    rename: originName => originName
  }]
}
```
