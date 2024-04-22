const bannerModel = require('../model/bannerModel')

exports.getBannerList = async() => {
  const res = await bannerModel.findAll()
  return res
}

exports.updateBanner = async(bannerInfo) => {
  const res = await bannerModel.update(bannerInfo, {
    where: {
      id: bannerInfo.id
    }
  })
  return res
}