const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // 数据库名称
  process.env.DB_USERNAME, // 用户名
  process.env.DB_PWD, // 密码
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: null
  }
)

module.exports = sequelize