const md5 = require('md5')
const { login, updateUser } = require('../db/dao/adminDao')
const { ValidationError } = require('../utils/errorHandle')
const { publishJwt, verifyToken } = require('../utils/jwt')

// 登录
exports.loginService = async(loginInfo) => {
  let params = {}
  let remembers = 1
  loginInfo.loginPwd = md5(loginInfo.loginPwd)
  if(loginInfo.remembers > 1) {
    remembers = loginInfo.remembers
  }

  //验证码通过
  const res = await login(loginInfo)
  // 有值
  // 生成token并返回 （TODO）
  if(res) {
    const data = res.toJSON()
    params = {
      id: data.id,
      loginId: data.id,
      name: data.name,
    }
    const token = publishJwt(params, remembers)
    return token
  } else {
    // 错误处理
    throw new ValidationError('用户名或密码不正确').handleResult()
  }
}

// 校验
exports.verifyAdmin = (token) => {
  token = token.split(' ')[1]
  const res = verifyToken(token)
  return {
    id: res.id,
    loginId: res.loginId,
    name: res.name
  }
}

// 更新
exports.updateAdminServices = async(userInfo, token) => {
  const adminInfo = await login({
    loginId: userInfo.loginId,
    loginPwd: md5(userInfo.oldLoginPwd)
  })
  token = token.split(' ')[1]
  const tokenRes = verifyToken(token)
  if(adminInfo) {
    userInfo.loginPwd = md5(userInfo.loginPwd)
    userInfo.id = tokenRes.id
    const res = await updateUser(userInfo)
    return {
      id: userInfo.id,
      loginId: userInfo.loginId,
      name: userInfo.name
    }
  } else {
    throw new ValidationError("旧密码不正确").handleResult()
  }
}