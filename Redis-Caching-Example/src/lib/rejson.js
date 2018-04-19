const redis = require('redis')
const rejson = require('redis-rejson')

const config = require('../../config/redis')
let reuse_client

const users = {
  dongsu: {
    name: 'dongsu',
    age: 11,
    job: 'develop',
  },
}

const __getClient = (options) => {
  if (reuse_client) return reuse_client
  reuse_client = redis.createClient(
    options.port,
    options.host,
  )
  return reuse_client
}

exports.rejsonSetTest = (key, value) => {
  return new Promise((resolve, reject) => {
    const client2 = __getClient(redisConfig)
    client2.json_set('object', '.', 'foo', (err, result) => {
      if (err) resolve(err)
      else resolve(result)
    })
  })
}

exports.rejsonGetTest = (key, value) => {
  return new Promise((resolve, reject) => {
    const client2 = __getClient(redisConfig)
    client2.get('object', '.', 'dongsu', (err, result) => {
      if (err) resolve(err)
      else resolve(result)
    })
  })
}