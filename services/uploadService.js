const { addFile, getFile, deleteFile } = require('../db/dao/fileDao')

exports.uploadService = async(fileInfo) => {
  await addFile(fileInfo)
}

exports.getFileService = async(attachmentId) => {
  const res = await getFile(attachmentId)
  return res
}

exports.deleteFileService = async(attachmentId) => {
  const res = await deleteFile(attachmentId)
  return res
}