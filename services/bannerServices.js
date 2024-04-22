const { getBannerList, updateBanner } = require('../db/dao/bannerDao')


exports.getBannerListServices = async() => {
  let bannerList = []
  const data = await getBannerList()
  // console.log(data)
  bannerList = data.map(item => item.dataValues)
  return bannerList
}

exports.updateBannerServices = async(bannerInfo) => {
  const res = await updateBanner(bannerInfo)
  return bannerInfo
}