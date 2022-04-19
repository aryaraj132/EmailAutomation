const mongoose = require("mongoose");

const SenderMailSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
    }
},
{timestamps:true}
);

module.exports = mongoose.model("SenderMail",SenderMailSchema)