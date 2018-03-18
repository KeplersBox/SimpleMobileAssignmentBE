var User = require('../models/user');

exports.create = function create(userDate,callback) {

    //create and object from the passed user data
    var userModel  = new User(userDate);

    userModel.save(function saveUser(err,data) {

        if(err) return callback(err);

        exports.get({_id:data._id},function (err,user){

            if(err) return callback(err);

            callback(null,user || {});

        })
    })

};

exports.get = function get(query,callback) {

    User
        .findOne(query)

        .exec(function getUser(err,user) {

            if(err) return callback(err);

            callback(null,user || {});

        });

};

exports.update = function update(query, updates, callback) {

    updates.$set = updates.$set || {};

    User.findOneAndUpdate(query,updates)

        .exec(function getUser(err,user) {

            if(err) return callback(err);

            callback(null, user || {});

        });
};