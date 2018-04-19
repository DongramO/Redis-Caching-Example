const redis = require('redis')
const redis_scanner = require('redis-scanner')
const bluebird = require('bluebird')
const rejson = require('redis-rejson')

const config = require('../../config/redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let reuse_client

const __getClient = (options) => {
  if (reuse_client) return reuse_client
  reuse_client = redis.createClient(
    options.port,
    options.host,
  )
  return reuse_client
}

exports.setRedisSync = (key, value) => {
  return new Promise((resolve, reject) => {
    const client = __getClient(config.development)
    console.log()
    client.set(key, JSON.stringify(value), (err) => {
      if (err) reject(err)
      client.expire(key, 3600 * 24 * 10)
      resolve(value)
    })
  })
}

exports.setRedisAsync = (key, value) => {
  const client = __getClient(config.development)
  console.log()
  client.set(key, JSON.stringify(value), (err) => {
    if (err) return err
    client.expire(key, 3600 * 24 * 10)
    return value
  })
}

exports.getRedis = (key) => {
  return new Promise((resolve, reject) => {
    const client = __getClient(config.development)
    client.get(key, (err, data) => {
      if (err) reject(err)
      client.expire(key, 3600 * 24 * 10)
      if (data) resolve(JSON.parse(data))
      else resolve({})
    })
  })
}

exports.delRedis = (key) => {
  return new Promise((resolve, reject) => {
    const client = __getClient(config.development)
    client.del(key, (err, response) => {
      if (response === 1) {
        resolve(true)
      } else {
        reject(err)
      }
    })
  })
}



