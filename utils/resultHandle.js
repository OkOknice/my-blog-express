const { SUCCESS_CODE } = require('./resCode')

// 结果处理
exports.resultHandle = (code, data, message = 'success') => {
  return {
    code,
    message,
    data,
  }
}