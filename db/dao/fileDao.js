const fileModel = require('../model/fileModel')

exports.addFile = async(fileInfo) => {
  await fileModel.create(fileInfo)
}

exports.getFile = async(attachmentId) => {
  const res = await fileModel.findOne({
    where: {
      attachmentId
    }
  })

  return res.toJSON()
}

exports.deleteFile = async(attachmentId) => {
  const res = fileModel.destroy({
    where: {
      attachmentId
    }
  })
  return res
}