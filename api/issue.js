var router = require('koa-router')();
const { github } = require('../utils/req')
const { queryPostData } = require('../utils/public')


router.post('/query', async (ctx) => {
  const data = await github.get('/repos/huaasto/sdfs/issues')
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/add', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.post('/repos/huaasto/sdfs/issues', par)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue add 的api" };
})

router.post('/edit', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.patch('/repos/huaasto/sdfs/issues/' + par.number, par)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue edit 的api" };
})

router.post('/lock', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.put('/repos/huaasto/sdfs/issues/' + par.number + '/lock')
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue delete 的api" };
})

router.post('/unlock', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.delete('/repos/huaasto/sdfs/issues/' + par.number + '/lock')
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue delete 的api" };
})


module.exports = router.routes();