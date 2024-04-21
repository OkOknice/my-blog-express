const express = require('express');
const router = express.Router();

const { loginService } = require('../services/adminServices')
const { resultHandle } = require('../utils/resultHandle')

// 登录
router.post('/login', async(req, res, next) => {
  const params = req.body
  const data = await loginService(params)
  res.send(resultHandle(data))
})

module.exports = router