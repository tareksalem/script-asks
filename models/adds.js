const mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek@ds047622.mlab.com:47622/script-asks");
const Schema = mongoose.Schema;

var addSchema = new Schema({
    addName: {type: String, required: true},
    addScript: {type: String, required: true},
    addNumber: {type: Number, required: true}
});

var Add = module.exports = mongoose.model("adds", addSchema, "add");