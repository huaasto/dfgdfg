var router = require('koa-router')();
const { github } = require('../utils/req')
const { queryPostData } = require('../utils/public')


router.post('/list', async (ctx) => {
  const par = await queryPostData(ctx)
  const path = par.path
  const data = await github.get('/repos/huaasto/pics/contents' + (path || ''))
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/list/mini', async (ctx) => {
  const par = await queryPostData(ctx)
  const path = par.path
  console.log(path)
  const data = await github.get('/repos/huaasto/minipics/contents' + (path || ''))
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/item', async (ctx) => {
  const par = await queryPostData(ctx)
  const path = par.path
  const data = await github.get('/repos/huaasto/pics/contents/' + path)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/create', async (ctx) => {
  // const par = await queryPostData(ctx)
  const par = await queryPostData(ctx)
  let i = 0
  const data = await recreate('/repos/huaasto/pics/contents', i, par)
  // const data = await github.put('/repos/huaasto/pics/contents' + (par.path || '/') + par.name, par)
  // console.log(data)
  // await wait(10000)

  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/create/mini', async (ctx) => {
  // const par = await queryPostData(ctx)
  const par = await queryPostData(ctx)
  console.log(par)
  let i = 0
  const data = await recreate('/repos/huaasto/minipics/contents', i, par)
  // const data = await github.put('/repos/huaasto/pics/contents' + (par.path || '/') + par.name, par)
  // console.log(data)
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})
function wait(ms) {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}
function recreate(url, i, par) {
  console.log(url, par.name)
  return new Promise(async res => {
    let data = await github.put(url + (par.path || '/') + par.name, par)
    if (!data.data.content && i < 5) {
      data = await recreate(url, i + 1, par)
    }
    res(data)
  })
}

router.post('/delete', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.delete('/repos/huaasto/pics/contents' + par.path, { data: par })
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})

router.post('/delete/mini', async (ctx) => {
  const par = await queryPostData(ctx)
  const data = await github.delete('/repos/huaasto/minipics/contents' + par.path, { data: par })
  ctx.body = data.data;
  // ctx.body = { "title": "这是一个 issue query 接口" };
})



module.exports = router.routes();