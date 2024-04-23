const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { UploadError } = require('../utils/errorHandle')
const { uploadService, getFileService, deleteFileService } = require('../services/uploadService')
const { getUUID } = require('../utils/tool')
const { resultHandle } = require('../utils/resultHandle')
const { SUCCESS_CODE } = require('../utils/resCode')

const router = express.Router()


// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null,path.resolve(__dirname, '../public/static/uploads/'));
  },
  // 上传到服务器的文件，文件名要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(file.originalname, path.extname(file.originalname));
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName = `${basename}-${new Date().getTime()}-${ Math.floor(Math.random() * 9000 + 1000)}${extname}`;
    cb(null, newName);
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024
  }
})

router.post('/', (req, res, next) => {
 
  upload.single('file')(req, res, async(err) => {
    if(err instanceof multer.MulterError) {
      throw new UploadError('文件上传失败').handleResult()
    } else {
      const fileInfo = {
        size: req.file.size,
        filename: req.file.filename,
        originalname: req.file.originalname,
        attachmentId: getUUID(),
        downloadUrl: `/static/uploads/${req.file.filename}`
      }
      await uploadService(fileInfo)
      res.send(resultHandle(SUCCESS_CODE, fileInfo.downloadUrl))
    }
    // console.log(err)
  })

})

// 获取附件
router.get('/download/:attachmentId', async(req, res, next) => {
  const attachmentId = req.params.attachmentId
  const data = await getFileService(attachmentId)
  res.send(resultHandle(SUCCESS_CODE, {
    downloadUrl: data.downloadUrl,
    attachmentId: data.attachmentId
  }))
})

// 删除附件
router.get('/delete/:attachmentId', async(req, res, next) => {
  const attachmentId = req.params.attachmentId
  const data = await getFileService(attachmentId)
  const absPath = path.resolve(__dirname, '../public/static/uploads', data.filename)
  await deleteFileService(attachmentId).then(() => {
    fs.unlink(absPath, async() => {
      res.send(resultHandle(SUCCESS_CODE))
    })
  })
  
})

module.exports = router