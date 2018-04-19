const redis = require('redis')
const redis_scanner = require('redis-scanner')
const bluebird = require('bluebird')
const rejson = require('redis-rejson')

const config = require('../../config/redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let reuse_client

const __getClientScanner = (options) => {
  if (reuse_client) return reuse_client
  reuse_client = redis.createClient(
    options.port,
    options.host,
  )
  redis_scanner.bindScanners(reuse_client);
  return reuse_client
}

exports.scanRedis = () => {
  return new Promise((resolve, reject) => {
    const client = __getClientScanner(config.development)
    var options = {
      args: ['Match','test2'],
      onData: (result) => {
        resolve(result)
      },
      onEnd: (err) => {
        console.log(err)
        resolve(err)
      }
    };
    var scanner = new redis_scanner.Scanner(client, 'SCAN', null, options)
    const cursor = 0
    client.scan()
    resolve([])
  })
}