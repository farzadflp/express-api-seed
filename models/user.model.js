var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'inactive',
        enum: ['active', 'inactive', 'block']
    },
    role: {
        type: String,
        required: true,
        default: 'student',
        enum: ['teacher', 'student']
    }
});

module.exports = mongoose.model('user', userSchema);