var env = require('../env.json');

exports.config = function() {
    var node_env = 'development';
    return env[node_env];
};