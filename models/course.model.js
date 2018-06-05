var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('course' , courseSchema)