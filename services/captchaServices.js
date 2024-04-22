const svgCaptcha = require('svg-captcha')

exports.getCaptchaService = () => {
  return svgCaptcha.create({
    size : 4,
    ignoreChars : "iIl10Oo",
    noise : 6,
    color : true
  })
}