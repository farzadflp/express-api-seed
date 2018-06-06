var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var eventSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    date:{
        type: String ,
       // require: true
    }
    
});

module.exports = mongoose.model('event' , eventSchema)