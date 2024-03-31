const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title :{type: String, required: true},
    slug :{type: String, required: true, unique:true},
    desc :{type: String, required: true},
    img :{type: String, required: true},
    category :{type: String, required: true},
    size :{type: String},
    color :{type: String},
    price :{type: Number, required: true},
    availability :{type: Number, required: true},

}, {timestamps: true})

mongoose.models = {}

const Product =  mongoose.model('Product', ProductSchema);
module.exports = Product; // Export the model, not the schema
