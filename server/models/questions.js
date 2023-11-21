// Question Document Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        length_max: 100,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    asked_by: {
        type: String,
        default: "Anonymous"
    },
    ask_date_time: {
        type: Date,
        default: new Date()
    },
    views: {
        type: Number,
        default: 0
    },
    answers: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

questionSchema.virtual("url").get(function () {
    return "posts/question/" + this._id;
});

module.exports = mongoose.model("Question", questionSchema);
