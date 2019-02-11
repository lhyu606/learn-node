var mongoose = require('mongoose');

var categoriesSchema = require("../schema/categories");

var categoryModel = mongoose.model('Category',categoriesSchema);

module.exports = categoryModel;












