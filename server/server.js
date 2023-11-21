// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
const mongoose = require("mongoose");
const cor = require("cors");

var count = 0;

const app = express();
app.use(cor());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Question = require("./models/questions");
const Tag = require("./models/tags");
const Answer = require("./models/answers");
const port = 8000;

app.listen(port, () => {
    console.log('app listening on 8000');
    mongoose.connect("mongodb://127.0.0.1:27017/fake_so");
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log('DB is connected');
});

app.get("/", async (req, res) => {
    console.log("Get in the server " + count);
    count++;
    const question = await Question.find({});
    const answer = await Answer.find({});
    const tag = await Tag.find({});
    const all = {
        questions: question,
        answers: answer,
        tags: tag,
    };
    // console.log(all);
    res.send(all);
});

app.post("/view", async (req, res) => {
    console.log("Came into server.js/app.post");
    let inc_view = await Question.findById(req.body.q_id);
    console.log("Came into server.js/app.post2");
    inc_view.views += 1;
    await inc_view.save();
    // console.log("Came into server.js/app.post3");
    res.send(inc_view);
})

app.post("/add_new_answer", async (req, res) => {
    // console.log(req.body);
    let new_answer = new Answer(req.body);
    // console.log(new_answer);
    await new_answer.save();
    res.send(new_answer._id);
})

app.post("/update_quest_answer", async (req, res) => {
    let target_question = await Question.findById(req.body.q_id);
    target_question.answers.push(req.body.ans_id);
    console.log(target_question.views);
    target_question.views -= 1;
    console.log(target_question.views);
    await target_question.save();
})

app.post("/new_tag_eval", async (req, res) => {
    let find_tags = await Tag.findOne({name: req.body.tag_name});
    let target_q = await Question.findById(req.body.q_id);

    if (find_tags === null) {
        let new_tag = new Tag({name:req.body.tag_name})
        await new_tag.save();
        // res.send(new_tag._id);
        target_q.tags.push(new_tag._id);
    }
    else {
        // res.send(find_tags._id);
        target_q.tags.push(find_tags._id);
    }
    await target_q.save();
})

app.post("/add_new_question", async (req, res) => {
    let new_question = new Question(req.body.question);
    await new_question.save();
    res.send(new_question._id);
})