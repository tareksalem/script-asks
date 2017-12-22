const mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek@ds047622.mlab.com:47622/script-asks");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

var adminSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordResetToken: {type: String, default: ""},
    passwordResetExpires: {type: String, default: Date.now},
    role: {type: String, required: true}
});
adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
var Admin = module.exports = mongoose.model("users", adminSchema, "admin");