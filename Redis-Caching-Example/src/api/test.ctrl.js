exports.testFunc = async (ctx) => {
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