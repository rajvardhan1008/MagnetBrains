const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum: ["Consumer", "Industrial", "Components"],
    },
    quantity:{
        type:Number,
        default:1,
    },
    image:{
        type:String,
    },
    description:{
        type:String
    },
    listedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
});

module.exports = mongoose.model("Product", productSchema);