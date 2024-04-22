const jwt = require('jsonwebtoken')
const md5 = require('md5')


exports.publishJwt = (signInfo, time=1) => {
  return jwt.sign(
    signInfo,
    md5(process.env.JWT_PRIVATEKEY),
    {
      expiresIn: 60 * 60 * 24 * time
    }
  )
}

exports.verifyToken = token => {
  return jwt.verify(
    token,
    md5(process.env.JWT_PRIVATEKEY),
  )
}