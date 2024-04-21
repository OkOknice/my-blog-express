const Sequelize = require('./db')
const adminModel = require('./model/adminModel')
const md5 = require('md5')

Sequelize.sync(
  {
    alter: true
  }
).then(async() => {
  // console.log(adminModel.count())
  const res = await adminModel.count()
  // 初始化数据
  if(!res) {
    adminModel.create({
      loginId: 'OKOK',
      name: '超级管理员',
      loginPwd: md5('123456')
    })
  }
  console.log("所有模型同步完成💐");
})