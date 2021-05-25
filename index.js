const path = require('path')
const dotenv = require('dotenv')
const resolveClientEnv = require('./resolveClientEnv')

module.exports = (api, options) => {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  var fs = require("fs")
  var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/develop
  var ref = gitHEAD.split(': ')[1] // refs/heads/develop
  var branch = gitHEAD.split('/')[2] // develop

  var currentEnv = resolveClientEnv(options)

  try {
    const envPath = path.resolve(`.branch.env${branch ? `.${branch}` : ``}`)
    const env = dotenv.config({ path: envPath, debug: process.env.DEBUG })
    if (env.error) {
      return
    }
    api.chainWebpack(config => {
      config
        .plugin('define')
        .tap(args => {
          args[0]['process.env'] = JSON.stringify(Object.assign(env.parsed, currentEnv))
          return args
        })
    })
  } catch (err) {
    if (err.toString().indexOf('ENOENT') < 0) {
      throw (err)
    }
  }
}