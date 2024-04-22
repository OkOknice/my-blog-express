const express = require('express')
const { getBannerListServices, updateBannerServices } = require('../services/bannerServices')
const { resultHandle } = require('../utils/resultHandle')
const { SUCCESS_CODE } = require('../utils/resCode')


const router = express.Router()

// 获取首页列表
router.get('/list', async(req, res, next) => {
  const data = await getBannerListServices()

  res.send(resultHandle(SUCCESS_CODE, data))
})
// 更新首页数据
router.post('/update', async(req, res, next) => {
  const params = req.body
  const data = await updateBannerServices(params)
  res.send(resultHandle(SUCCESS_CODE, data))
})


module.exports = router