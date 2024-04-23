const { addBlogType, getBlogTypeList, getBlogTypeInfo, updateBlogTypeInfo, deleteBlogType } = require('../db/dao/blogTypeDao')

// 添加分类
exports.addBlogTypeServices = async(blogTypeInfo) => {
  blogTypeInfo.articleCount = 0
  const res = await addBlogType(blogTypeInfo)
  // console.log(res)
  return res
}

// 获取分类列表
exports.getBlogTypeListServices = async() => {
  const res = await getBlogTypeList()
  // console.log(res)
  return res
}

// 获取分类信息
exports.getBlogTypeInfoServices = async(id) => {
  const res = await getBlogTypeInfo(id)
  // console.log(res)
  return res
}

// 更新分类信息
exports.updateBlogTypeInfoServices = async(id, blogTypeInfo) => {
  const res = await updateBlogTypeInfo(id, blogTypeInfo)
  return {
    id,
    ...blogTypeInfo
  }
}

// 删除分类
exports.deleteBlogTypeServices = async(id) => {
  const res = await deleteBlogType(id)
  return res
}