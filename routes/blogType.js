const express = require('express')

const { addBlogTypeServices, getBlogTypeListServices, getBlogTypeInfoServices, updateBlogTypeInfoServices, deleteBlogTypeServices } = require('../services/blogTypeServices')
const { resultHandle } = require('../utils/resultHandle')
const { SUCCESS_CODE } = require('../utils/resCode')

const router = express.Router()

// 添加分类
router.post('/add', async(req, res, next) => {
  const params = req.body
  const data = await addBlogTypeServices(params)
  // console.log(params)
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 分类列表
router.get('/list', async(req, res, next) => {
  const data = await getBlogTypeListServices()
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 查询信息
router.get('/info/:id', async(req, res, next) => {
  const id = req.params.id
  // console.log(id)
  const data = await getBlogTypeInfoServices(id)
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 更新信息
router.put('/update/:id', async(req, res, next) => {
  const id = req.params.id
  const params = req.body
  const data = await updateBlogTypeInfoServices(id, params)
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 删除信息
router.delete('/delete/:id', async(req, res, next) => {
  const id = req.params.id
  await deleteBlogTypeServices(id)
  res.send(resultHandle(SUCCESS_CODE, ''))
})


module.exports = router