const blogTypeModel = require('../model/blogTypeModel')

// 添加分类
exports.addBlogType = async(blogTypeInfo) => {
  // console.log(blogTypeInfo)
  const res = await blogTypeModel.create(blogTypeInfo)
  // console.log(res)
  return res.toJSON()
}

// 分类列表
exports.getBlogTypeList = async() => {
  let dataList = []
  const res = await blogTypeModel.findAll()
  dataList = res.map(item => item.dataValues)
  return dataList
}

// 查询分类信息
exports.getBlogTypeInfo = async(id) => {
  const res = await blogTypeModel.findByPk(id)
  console.log(res)
  if(res) {
    return res.toJSON()
  }
  return null
  
}

// 更新分类信息
exports.updateBlogTypeInfo = async(id, blogTypeInfo) => {
  const res = await blogTypeModel.update(blogTypeInfo, {
    where: {
      id
    }
  })
  return res
}

// 删除分类
exports.deleteBlogType = async(id) => {
  const res = await blogTypeModel.destroy({
    where: {
      id
    }
  })
  return res
}