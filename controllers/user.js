var events = require('events');

var mongoose = require('mongoose');

var UserDal = require('../dal/user');

exports.createUser = function createUser(req,res,next) {

    var workflow = new events.EventEmitter();

    workflow.on('validateUser',function validation() {

        req
            .checkBody('email','Invalid email address')
            .notEmpty().withMessage('Please provide email address');
        req
            .checkBody('password','Invalid password')
            .notEmpty().withMessage('please provide password');

        var validationErrors = req.validationErrors();

        if (validationErrors) {

            res.status(400); // Bad Request

            res.json(validationErrors);

            return;

        } else {
            // if no errors pass to the next workflow
            workflow.emit('checkIfUserExists');
        }
    });

    workflow.on('checkIfUserExists',function checkIfUserExists() {

        UserDal
            .get({email:req.body.email},function cb(err,user) {

                if(err) return next(err);

                if(user.email){

                    res.status(200).json({
                        message:'User already exists',
                        data:user
                    })

                }else{
                    workflow.emit('createUser');
                }
        })

    });

    workflow.on('createUser',function createUser() {
        
        UserDal.create({

            email : req.body.email,
            password : req.body.password,

        },function cb(err,user) {
            if(err) return next(err);
            workflow.emit('respond',user);
        });


    });

    workflow.on('respond',function respond(user) {
        res.status(200).json({
            message:'User successfuly Added',
            data:user
        })
    });

    workflow.emit('validateUser');

};

exports.getUserByEmail = function get(req,res,next){

    var workflow = new events.EventEmitter();

    workflow.on('getUser',function getUser(){

        UserDal.get({email:req.query.email},function cb(err,user){

            if(err) return next(err);

            if(!user.email){

                res.status(201).json({
                    message :'No user found'
                });

            }else{

                workflow.emit('respond',user);

            }

        });

    });

    workflow.on('respond',function respond(user){

        user.omitFields([],function(err,_user){

            res.status(200).json(_user);
        });

    });

    workflow.emit('getUser');

};

