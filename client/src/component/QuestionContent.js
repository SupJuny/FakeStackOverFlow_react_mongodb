import React from "react";
import HelperFunction from './HelperFunctions.js';
var help = new HelperFunction();

export default class QuestionContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question_text: "",
            answer_text: ""
        }

    }

    render() {
        //console.log("get in the quest content function");
        let quest = this.props.data.questions;
        // console.log("this is props data: "+ this.props.data);
        // console.log("this is quest: "+quest);
        var index = 0;
        for (let j = 0; j < quest.length; j++) {
            if (quest[j]._id === this.props.ident)
                index = j;
        }
        let q = quest[index];
        //console.log(q);
        let ans = this.props.data.answers.sort((a, b) => b.ans_date_time - a.ans_date_time);
        // ans.sort((a, b) => b.ansDate - a.ansDate);
        // console.log(ans);
        // ans = help.newest_sort(this.props.data.answers);

        let q_page = [];

        ans.forEach(a => {
            if (q.answers.includes(a._id)) {
                q_page.push(
                    <div id="q_content_answers" key={a._id}>
                        <div>
                            <p id="q_content_ans_text" dangerouslySetInnerHTML={{ __html: a.text.replace(/\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g, '<a href="$2" target="_blank">$1</a>') }}></p>
                            <div id="content_section">
                                <p id="q_content_ans_by">{a.ans_by}</p>
                                <p id="q_content_ans_time">answered {help.time_log(a.ans_date_time)}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        return (
            <div id='main_right'>

                <div id="question_content_page">
                    <div id="q_content_area">
                        <div className="space" id="q_content_top">
                            <h3 id='q_content_num_ans'>{q.answers.length} answers</h3>
                            <h3 id='q_content_title'>{q.title}</h3>
                        </div>
                        <button className="askQ" id='askQ_cont' onClick={this.props.ask_question}>Ask Question</button>
                        <div className="space" id="q_content_bottom">
                            <h3 id='q_content_num_view'>{q.views} views</h3>
                            <p id='q_content_text' dangerouslySetInnerHTML={{ __html: q.text.replace(/\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g, '<a href="$2" target="_blank">$1</a>') }}></p>
                            <div id="q_content_user_and_time">
                                <p id='q_content_user'>{q.asked_by}</p>
                                <p id="q_content_time">asked {help.time_log(q.ask_date_time)}</p>
                            </div>
                        </div>
                    </div>
                    <div id='q_content_answer_area'>
                        {q_page}
                    </div>
                    <button id="ans_question_btn" onClick={this.props.answer_question}>Answer Question</button>
                </div>
            </div>
        );
    }
}