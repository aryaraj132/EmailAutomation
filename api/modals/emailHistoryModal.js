
const mongoose = require("mongoose");

const EmailHistorySchema = new mongoose.Schema({
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
    uniqueName:{
        type:String,
        required:true
    },
    ScheduleType:{
        type:String,
        required:true
    },
    ScheduleValue:{
        type:Object,
        required:true
    },
    Count:{
        type:Number,
        default:0
    },
    isHTML:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

module.exports = mongoose.model("EmailHistory",EmailHistorySchema)