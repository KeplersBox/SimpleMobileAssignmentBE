var mongoose = require ('mongoose');
var common = require('./common');

var config = common.config();

var connection = mongoose.connect(config.db);

module.exports = connection;
