const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    paypalTransactionDetails:[],
    transactionStatus:{
        type:String,
        enum:["Success", "Fail"]
    }
});

module.exports = mongoose.model("Order", orderSchema);