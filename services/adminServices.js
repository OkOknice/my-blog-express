const md5 = require('md5')
const { login } = require('../db/dao/adminDao')
const { ValidationError } = require('../utils/errorHandle')
const 

exports.loginService = async(loginInfo) => {
  loginInfo.loginPwd = md5(loginInfo.loginPwd)
  // 校验验证码 （TODO）


  //验证码通过
  const res = await login(loginInfo)
  // 有值
  // 生成token并返回 （TODO）
  if(res) {
    const data = res.toJSON()
    return {
      id: data.id,
      loginId: data.id,
      name: data.name
    }
  } else {
    // 错误处理
    throw new ValidationError('用户名或密码不正确').handleResult()
  }
  
}