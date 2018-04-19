const redis = require('../lib/redis')

exports.testSet = async (ctx) => {
  const { url } = ctx
  let result
  const connection = await dbConnection()
  result = await elkModel.selectDepartmentInfo(connection)
  result = { 'dept_info' : result }
  result = await redis.setRedis(url, result)
  ctx.body = {
    code: 200,
    status: 'success',
    message: 'department list',
    result,
  }
}


exports.testGet = async (ctx) => {
  const { url } = ctx
  let result
  console.log('tt')
  result = redis.redisGetAsync()
  console.log('mm')
  ctx.body = {
    code: 200,
    status: 'success',
    message: 'department list',
    result,
  }
}
