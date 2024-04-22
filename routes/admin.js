const express = require('express');
const router = express.Router();

const { loginService, verifyAdmin, updateAdminServices } = require('../services/adminServices')
const { resultHandle } = require('../utils/resultHandle')
const { SUCCESS_CODE } = require('../utils/resCode')
const { ValidationError } = require('../utils/errorHandle')

// 登录
router.post('/login', async(req, res, next) => {
  const params = req.body
  // 校验验证码
  if(!params.captcha) {
    throw new ValidationError('验证码不能为空').handleResult()
  }
  if(!req.session.captcha) {
    throw new ValidationError('验证码已失效，请重新获取').handleResult()
  }
  if(params.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    throw new ValidationError('验证码错误').handleResult()
  }
 
  const data = await loginService(params)
  res.header("authorization", data)
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 校验用户
router.get('/whoami', (req, res, next) => {
  const data = verifyAdmin(req.headers.authorization)
  res.send(resultHandle(SUCCESS_CODE, data))
})

// 更新用户
router.put('/update', async(req, res, next) => {
  const params = req.body
  // console.log(params)
  const data = await updateAdminServices(params, req.headers.authorization)
  res.send(resultHandle(SUCCESS_CODE, data))
})

module.exports = router