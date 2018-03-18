//grap things needed
var mongoose = require('mongoose');
var _ = require('underscore');
var Schema = mongoose.Schema;

//create a schema
var userSchema = new Schema({

    email : String,
    password : String,

});

// OMIT RETURNING FIELDS
userSchema.methods.omitFields = function omitFields(fields, callback) {

    if (!fields || !Array.isArray(fields)) {
        throw new Error("'Field' parameter should be Array");
    }

    // convers model to json
    var _user = this.toJSON();

    // add the default ommited fields
    fields.push(['__v']);

    // filter the fields
    _user = _.omit(_user, fields);

    callback(null, _user);
}

module.exports = mongoose.model('User',userSchema);

