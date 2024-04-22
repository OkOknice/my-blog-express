const Sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Banner = Sequelize.define(
  'Banner',
  {
    // 这张表拥有哪些字段
    midImg : {
      type : DataTypes.STRING,
      allowNull : false
    },
    bigImg : {
      type : DataTypes.STRING,
      allowNull : false
    },
    title : {
      type : DataTypes.STRING,
      allowNull : false
    },
    description : {
      type : DataTypes.STRING,
      allowNull : false
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
)

module.exports = Banner