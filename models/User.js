var mongoose = require('mongoose');

var usersSchema = require("../schema/users");

var userModel = mongoose.model('User',usersSchema);

module.exports = userModel;












