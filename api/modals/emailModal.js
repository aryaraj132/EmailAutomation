
const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    sendTo:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },
    CC:{
        type:Array,
        default:[]
    },
    Body:{
        type:String,
        required:true
    },
    ScheduleType:{
        type:String,
        required:true
    },
    ScheduleValue:{
        type:String,
        required:true
    },
    Count:{
        type:Number,
        default:0
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Email",EmailSchema)