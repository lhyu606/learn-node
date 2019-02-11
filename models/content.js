var mongoose = require('mongoose');

var contentsSchema = require("../schema/contents");

module.exports = mongoose.model('Content',contentsSchema);












