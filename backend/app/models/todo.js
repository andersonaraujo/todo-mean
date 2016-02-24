var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    task: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
