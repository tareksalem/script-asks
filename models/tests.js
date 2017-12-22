const mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek@ds047622.mlab.com:47622/script-asks");
const Schema = mongoose.Schema;

var testSchema = new Schema({
    testTitle: {type: String, required: true},
    testImg: {type: String, required: true},
    testResultTitle: {type: String, required: true},
    testResultDescription: {type: String, required: true},
    testDate: {type: Date, required: true},
    testCategory: {type: String, required: true}
});

var Test = module.exports = mongoose.model("tests", testSchema, "test");