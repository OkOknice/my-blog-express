const adminModel = require('../model/adminModel')

// 登录查询
exports.login = async (loginInfo) => {
  const data = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd
    }
  })
  // console.log(data)
  return data
}