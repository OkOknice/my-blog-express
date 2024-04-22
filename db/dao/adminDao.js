const adminModel = require('../model/adminModel')

// 登录查询
exports.login = async (loginInfo) => {
  const res = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd
    }
  })
  return res
}

// 更新用户信息
exports.updateUser = async(userInfo) => {
  const res = await adminModel.update(userInfo, {
    where:{
      id: userInfo.id
    }
  })
  return res
}