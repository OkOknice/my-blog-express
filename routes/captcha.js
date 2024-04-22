const express = require('express')
const { getCaptchaService } = require('../services/captchaServices')
// const { resultHandle } = require('../utils/resultHandle')
// const { SUCCESS_CODE } = require('../utils/resCode')

const router = express.Router()

router.get('/captcha', (req, res,next) => {
  const captcha = getCaptchaService()
  req.session.captcha = captcha.text;
  // console.log(captcha.data)
  // 设置响应头
  res.setHeader("Content-Type","image/svg+xml");
  res.send(captcha.data)
})

module.exports = router