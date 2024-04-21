const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { resultHandle } = require('./utils/resultHandle')



const app = express();

require('dotenv').config()
require('express-async-errors')

// 引入数据库
require('./db/init')

// 引入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin')
// 使用路由中间件
app.use('/', indexRouter);
app.use('/api/admin', adminRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  res.send(resultHandle( err.code,null, err.message))
});

module.exports = app;
