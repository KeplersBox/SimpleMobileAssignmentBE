var express = require('express');

var userRouter = require('./user');

module.exports = function initRouter(app) {

    app.use('/api/user',userRouter);

}