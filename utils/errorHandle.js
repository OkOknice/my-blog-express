/**
 * @author OKOK
 * @desc 错误处理工具
 */
const { AUTH_CODE, UPLOAD_CODE, VERTIY_CODE, NOFOUND_CODE, COMMON_ERROR_CODE } = require('./resCode')


// 业务处理错误基类
class ServiceError extends Error {
  /**
   * 
   * @param {*} message 错误消息
   * @param {*} code 错误的消息码
   */
  constructor(message, code) {
    super(message)
    this.code = code
  }

  handleResult() {
    return {
      data: null,
      message: this.message,
      code: this.code
    }
  }
}

// 附件上传
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, UPLOAD_CODE)
  }
}

// 禁止访问
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, AUTH_CODE)
  }
}

// 验证错误
exports.ValidationError = class extends ServiceError {
  constructor(message) {
    super(message, VERTIY_CODE);
  }
}

// 无资源错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super("not found", NOFOUND_CODE);
  }
}

// 未知错误
exports.UnknownError = class extends ServiceError {
  constructor() {
    super("server internal error", COMMON_ERROR_CODE);
  }
}