const redis = require('redis')
const redis_scanner = require('redis-scanner')
const bluebird = require('bluebird')
const rejson = require('redis-rejson')

const config = require('../../config/redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let reuse_client

// We expect a value 'foo': 'bar' to be present 
// So instead of writing client.get('foo', cb); you have to write: 
// Using BlueBird
exports.redisGetAsync = () => {
  const client = __getClient(config.development)
  client.getAsync('/api/v1.0/lecture/1391/rate/65667').then(function(res) {
    return res
  })
}

// Using multi with promises looks like: \
exports.multiAsync = () => {
  const client = __getClient(config.development)
  client.multi().get('/api/v1.0/lecture/1391/rate/65667').execAsync().then(function(res) {
    console.log(res); // => 'bar' 
  })
}