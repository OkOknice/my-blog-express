const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt")
const md5 = require('md5')
const session = require("express-session");

const { resultHandle } = require('./utils/resultHandle')
const { ForbiddenError } = require('./utils/errorHandle')

require('dotenv').config()
require('express-async-errors')

// 引入数据库
require('./db/init')

const app = express();

app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : true,
  saveUninitialized : true
}))



// 引入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({
  secret: md5(process.env.JWT_PRIVATEKEY), // 设置的秘钥
  algorithms: ['HS256'] // 加密算法
}).unless({
  // 需要排除的 token 验证的路由
  path: [
    { url : '/api/admin/login', methods : ['POST'] },
    { url : '/res/captcha', methods : ['GET'] },
  ]
}))

// 引入路由
const adminRouter = require('./routes/admin')
const captchaRouter = require('./routes/captcha')
const bannerRouter = require('./routes/banner')
// 使用路由中间件
app.use('/api/admin', adminRouter)
app.use('/api/banner', bannerRouter)
app.use('/res', captchaRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  if(['No authorization token was found', 'invalid token'].includes(err.message)) {
    res.send(new ForbiddenError('未登录，或者登录已经过期').handleResult())
  }
  res.send(resultHandle( err.code,null, err.message))
});

module.exports = app;
