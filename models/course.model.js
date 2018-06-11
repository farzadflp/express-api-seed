var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    members: {
        type: [String]
    },
    idOfCreator: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }

});

module.exports = mongoose.model('course', courseSchema);