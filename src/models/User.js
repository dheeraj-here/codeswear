const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name :{type: String, required: true},
    email :{type: String, required: true, unique:true},
    password :{type: String, required: true},

}, {timestamps: true})

mongoose.models = {}

const User =  mongoose.model('User', UserSchema);
module.exports = User; // Export the model, not the schema
