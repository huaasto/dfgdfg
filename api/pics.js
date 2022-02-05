var router = require('koa-router')();
const { github } = require('../utils/req')
const { queryPostData } = require('../utils/public')


router.post('/list', async (ctx) => {
  const par = await queryPostData(ctx)
  const path = par.path
  console.log(path)
  const data = await github.get('/repos/huaasto/pics/contents' + (path || ''))
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/query/:name', async (ctx) => {
  const name = ctx.params.name
  const data = await github.get('/repos/huaasto/pics/contents/' + name)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/create', async (ctx) => {
  // const par = await queryPostData(ctx)
  const par = ctx.request.body
  console.log(par.message)
  const data = await github.put('/repos/huaasto/pics/contents' + (par.path || '/') + par.name, par)
  // console.log(data)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/delete', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.delete('/repos/huaasto/pics/contents' + par.path, { data: par })
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})



module.exports = router.routes();