const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
}, {timestamps: true});
const ProductModel = mongoose.model("Products", productSchema, "products");
module.exports = ProductModel;