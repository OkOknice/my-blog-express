const Sequelize = require('./db')
const adminModel = require('./model/adminModel')
const bannerModel = require(('./model/bannerModel'))
const md5 = require('md5')

require('./model/fileModel')
require('./model/blogTypeModel')


Sequelize.sync(
  {
    alter: true
  }
).then(async() => {
  // console.log(adminModel.count())
  const res = await adminModel.count()
  const bannerCount = await bannerModel.count()
  // 初始化用户数据
  if(!res) {
    await adminModel.create({
      loginId: 'OKOK',
      name: '超级管理员',
      loginPwd: md5('123456')
    })
  }
  // 初始化首页 banner 数据
  if(!bannerCount) {
    
    await bannerModel.bulkCreate([
      {
        "midImg": "/static/images/bg1_mid.jpg",
        "bigImg": "/static/images/bg1_big.jpg",
        "title": "塞尔达旷野之息",
        "description": "2017年年度游戏，期待续作"
    }, {
        "midImg": "/static/images/bg2_mid.jpg",
        "bigImg": "/static/images/bg2_big.jpg",
        "title": "塞尔达四英杰",
        "description": "四英杰里面你最喜欢的又是谁呢"
    }, {
        "midImg": "/static/images/bg3_mid.jpg",
        "bigImg": "/static/images/bg3_big.jpeg",
        "title": "日本街道",
        "description": "动漫中经常出现的日本农村街道，一份独特的恬静"
    }
    ])
    console.log('222')
  }

  console.log("所有模型同步完成💐");
})