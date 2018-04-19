const Router = require('koa-router')
const testCtrl = require('./test.ctrl')

const test = new Router()

test.get('/get', testCtrl.testGet)
test.get('/set', testCtrl.testSet)

module.exports = test
