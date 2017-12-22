const mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek@ds047622.mlab.com:47622/script-asks");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    facebook: {type: String, required: true},
    token: {type: String},
    username: {type: String, required: true},
    role: {type: String, required: true},
    userImage: {type: String}

});

var User = module.exports = mongoose.model("user", userSchema, "user");