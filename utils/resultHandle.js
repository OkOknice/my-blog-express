const { SUCCESS_CODE } = require('./resCode')

exports.resultHandle = (code = SUCCESS_CODE, data, message = 'success') => {
  return {
    code,
    message,
    data,
  }
}