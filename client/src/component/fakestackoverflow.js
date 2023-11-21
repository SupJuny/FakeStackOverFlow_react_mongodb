import React from 'react';
import axios from 'axios';
import MainQuestionPage from './MainQuestionPage';
import Banner from './Banner';
import TagPage from './TagPage';
import AskQuestion from "./AskQuestion";
import QuestionContent from './QuestionContent';
import AnswerQuestion from './AnswerQuestion';
import HelperFunction from './HelperFunctions.js';
var help = new HelperFunction();

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      temp_data: { questions: [], answers: [], tags: [] },
      page_num: 0,
      nq_title: "",
      nq_text: "",
      nq_tags: "",
      nq_user: "",
      quest_id: "",
      tag_id: "",
      ans_text: "",
      ans_name: "",
      searched: 0,
      sort_by_tag: false,
      q_btn_color: "lightgray",
      t_btn_color: "transparent",
      is_view_inc: false
    }
  }

  async componentDidMount() {
    console.log("get in component mount function");

    await axios.get("http://localhost:8000/")
      .then((res) => {
        this.setState({
          data: res.data,
          temp_data: res.data
        });
        console.log("Renew Data");
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    console.log(this.state.data);
    console.log("Component Mount function passed");
  }

  // ################# Display pages section ####################
  display_main_page = (tid, is_tag) => {
    this.setState(() => ({
      page_num: 0,
      searched: 0,
      sort_by_tag: is_tag,
      tag_id: tid,
      q_btn_color: "lightgray",
      t_btn_color: "transparent"
    }));
    this.componentDidMount();
  }

  display_tag_page = (id) => {
    this.setState(() => ({
      page_num: 1,
      tag_id: id,
      q_btn_color: "transparent",
      t_btn_color: "lightgray"
    }));
  }

  display_ask_question = () => {
    this.setState(() => ({
      page_num: 2
    }))
  }

  display_question_content = async (id) => {
    await this.increase_view(id);

    // this.state.data.questions.forEach(q => {
    //   if (q._id === id) console.log(q);
    // });

    this.setState(() => ({
      page_num: 3,
      quest_id: id,
      is_view_inc: true
    }))
  }

  display_answer_question = () => {
    this.setState(() => ({
      page_num: 4
    }))
  }

  display_searched_page = () => {
    this.setState(() => ({
      page_num: 0,
      searched: 1,
      q_btn_color: "transparent",
      t_btn_color: "transparent"
    }))
  }

  // ################ New Question handler section ####################
  handle_title = (title) => {
    this.setState({ nq_title: title })
  }

  handle_text = (text) => {
    this.setState({ nq_text: text })
  }

  handle_tag = (tag) => {
    this.setState({ nq_tags: tag })
  }

  handle_user = (user) => {
    this.setState({ nq_user: user })
  }

  // ################# Answer handler section ####################
  handle_ans_text = (text) => {
    this.setState({ ans_text: text })
  }

  handle_ans_name = (name) => {
    this.setState({ ans_name: name })
  }

  // ################ Add to Model section ####################

  // increase view of question
  increase_view = async (id) => {
    await axios.post("http://localhost:8000/view", {
      q_id: id
    })

    console.log("Increase_view_post passed");

    await this.componentDidMount();

    // this.state.data.questions.forEach(q => {
    //   if (q._id === id) console.log(q);
    // });
  }

  // add new question
  add_new_question = () => {
    let new_title = this.state.nq_title;
    let new_text = help.handling_hyperlinks(this.state.nq_text);
    let new_tags = this.state.nq_tags;
    let new_username = this.state.nq_user;

    let title_empty_check = true;
    let text_empty_check = true;
    let username_empty_check = true;
    let new_tag_length_check = true;

    console.log("post question function");
    console.log("text is", new_text);

    for (let i = 0; i < new_title.length; i++) {
      if (new_title[i] !== " ") title_empty_check = false;
    }

    for (let i = 0; i < new_text.length; i++) {
      if (new_text[i] !== " ") text_empty_check = false;
    }

    for (let i = 0; i < new_username.length; i++) {
      if (new_username[i] !== " ") username_empty_check = false;
    }

    new_tags = new_tags.toLowerCase();

    for (let i = 0; i < new_tags.length; i++)  // deleting unnecessary characters
    {
      new_tags = new_tags.replaceAll("  ", " ");

      if ((new_tags[i] >= 'a' && new_tags[i] <= 'z') || (new_tags[i] === '-') || (new_tags[i] === ' ') || (new_tags[i] >= '0' && new_tags[i] <= '9')) {
        continue;
      }
      else {
        new_tags = new_tags.slice(0, i) + new_tags.slice(i + 1);
        i--;
      }
    }

    if (new_tags[new_tags.length - 1] === ' ') new_tags = new_tags.slice(0, new_tags.length - 1);

    const tags_arr = new_tags.split(" ");

    for (let i = 0; i < tags_arr.length; i++) {
      if (tags_arr[i].length > 10) new_tag_length_check = false;
      console.log(tags_arr[i]);
    }

    if (tags_arr.length > 5) alert("Tags should be less or equal than 5.");
    else if (!new_tag_length_check) alert("The tag cannot be more than 10 characters.")
    else if (new_title.length > 100) alert("The title should not be more than 100 characters");
    else if (title_empty_check) alert("The title should not be empty");
    else if (text_empty_check) alert("The question text should not be empty");
    else if (username_empty_check) alert("The username should not be empty");
    else if (new_text === "hyperlink_empty") alert("Insert the hyperlink inside of parentheses");
    else if (new_text === "invalid_hyperlink") alert("Hyperlink should start with http:// or https://");
    else {
      axios.post("http://localhost:8000/add_new_question/", {
        question: {
          title: new_title,
          text: new_text,
          tags: [],
          asked_by: new_username,
          ask_date_time: new Date()
        }
      }).then((res) => {
        for (let i = 0; i < tags_arr.length; i++) {
          axios.post("http://localhost:8000/new_tag_eval/", {
            tag_name: tags_arr[i],
            q_id: res.data
          })
        }
        this.componentDidMount();
        this.display_main_page();
      });
    }
  }

  // post new answer function
  add_new_answer = () => {
    let target_quest_id = this.state.quest_id;
    let new_ans_text = help.handling_hyperlinks(this.state.ans_text);
    let new_ans_username = this.state.ans_name;

    console.log(new_ans_text);
    console.log(new_ans_username);

    let username_empty_check = true;
    let text_empty_check = true;

    for (let i = 0; i < new_ans_text.length; i++) {
      if (new_ans_text[i] !== " ") text_empty_check = false;
    }

    for (let i = 0; i < new_ans_username.length; i++) {
      if (new_ans_username[i] !== " ") username_empty_check = false;
    }

    if (text_empty_check) alert("The answer text should not be empty");
    else if (username_empty_check) alert("The username should not be empty");
    else if (new_ans_text === "hyperlink_empty") alert("Insert the hyperlink inside of parentheses");
    else if (new_ans_text === "invalid_hyperlink") alert("Hyperlink should start with http:// or https://");
    else {
      console.log("In right condition for adding question");
      axios.post("http://localhost:8000/add_new_answer/", {
        text: new_ans_text,
        ans_by: new_ans_username,
        ans_date_time: new Date()
      }).then((res) => {
        console.log("Then Passed");
        axios.post("http://localhost:8000/update_quest_answer/", {
          ans_id: res.data,
          q_id: target_quest_id
        });
        console.log("Answer ID");
        console.log(res.data);
        console.log(target_quest_id);
      }).then(() => {
        console.log("just before go back to content page");
        this.componentDidMount();
        this.display_question_content(target_quest_id);
      });
    }
  }

  // ################ search bar function ####################
  searching_by_input = (inpt) => {
    console.log("get in search function in fakestackoverflow");
    // let search_input = this.state.srch_input;
    console.log(inpt);
    // console.log(search_input);
    let search_input = inpt
    let words = search_input.toLowerCase();
    let searched_questions = [];
    let word_questions = [];
    let tag_questions = [];

    let split_by_space = words.split(" ");

    for (let i = 0; i < split_by_space.length; i++) {
      if (split_by_space[i] === '') continue;
      else if (split_by_space[i].includes('[') && split_by_space[i].includes(']')) {
        let is_last_word_tag = true;
        let idx = 0;
        let tmp_str = "";
        while (idx < split_by_space[i].length) {
          if (split_by_space[i][idx] !== '[') {
            tmp_str = "";
            while (split_by_space[i][idx] !== '[' && idx < split_by_space[i].length) {
              tmp_str += split_by_space[i][idx];
              idx++;
            }
            word_questions.push(tmp_str);
          }
          else {
            tmp_str = "";
            idx++;
            while (split_by_space[i][idx] !== ']') {
              tmp_str += split_by_space[i][idx];
              if (idx === split_by_space[i].length - 1) {
                tmp_str = '[' + tmp_str;
                word_questions.push(tmp_str);
                is_last_word_tag = false;
                break;
              }
              idx++;
            }
            idx++;
            if (is_last_word_tag) tag_questions.push(tmp_str);
          }
        }
      }
      else {
        word_questions.push(split_by_space[i]);
      }
    }

    console.log(word_questions);
    console.log(tag_questions);
    var tag_id_set = [];

    this.state.data.tags.forEach(d => {
      tag_questions.forEach(l => {
        if (d.name === l) tag_id_set.push(d._id);
      })
    })

    console.log("tag id set is " + tag_id_set);

    this.state.data.questions.forEach(o => {
      let q_title = o.title.toLowerCase();
      let q_text = o.text.toLowerCase();
      let q_tag = o.tags;


      word_questions.forEach(w => {
        if (q_title.includes(w) || q_text.includes(w)) searched_questions.push(o);
      })

      tag_id_set.forEach(t => {
        if (q_tag.includes(t)) searched_questions.push(o);
      })
    });

    console.log(searched_questions);

    let sorted_questions = [];

    searched_questions.forEach(element => {
      if (!sorted_questions.includes(element)) sorted_questions.push(element);
    });

    this.setState({ temp_data: { questions: help.newest_sort(sorted_questions) } })
    this.display_searched_page();
  }


  // ################ page rendering section ####################
  render() {
    console.log("Renderrr");
    let main_page = null;
    let banner = null;
    console.log(this.state.data);

    // main page
    if (this.state.page_num === 0) {
      // banner = <Banner main_question_page={this.display_main_page} main_tag_page={this.display_tag_page} search={this.searching_by_input} input={this.state.srch_input} />    //search handle function need to add
      main_page = <MainQuestionPage
        main_tag_page={this.display_tag_page} search_handler={this.searching_by_input} input={this.state.srch_input} q_color={this.state.q_btn_color} t_color={this.state.t_btn_color}
        tid={this.state.tag_id} tag_sort={this.state.sort_by_tag} data={this.state.data} temp_data={this.state.temp_data}
        ask_question={this.display_ask_question} question_content={this.display_question_content} search_status={this.state.searched} />
    }
    // tag page
    else if (this.state.page_num === 1) {
      banner = <Banner main_question_page={this.display_main_page} main_tag_page={this.display_tag_page} search_handler={this.searching_by_input}
        q_color={this.state.q_btn_color} t_color={this.state.t_btn_color} />
      main_page = <TagPage main_question_page={this.display_main_page} ask_question={this.display_ask_question} data={this.state.data} />
    }

    // ask question page
    else if (this.state.page_num === 2) {
      banner = <Banner main_question_page={this.display_main_page} main_tag_page={this.display_tag_page} main_pages={this.main_page} search_handler={this.searching_by_input} />
      main_page = <AskQuestion main_question_page={this.display_main_page} title_handler={this.handle_title} text_handler={this.handle_text}
        tag_handler={this.handle_tag} user_handler={this.handle_user} title={this.state.nq_title} text={this.state.nq_text} tags={this.state.nq_tags}
        user={this.state.nq_user} add_question={this.add_new_question} />
    }

    // question content page
    else if (this.state.page_num === 3) {
      // console.log("question id: "+this.state.quest_id);
      banner = <Banner main_question_page={this.display_main_page} main_tag_page={this.display_tag_page} main_pages={this.main_page} search_handler={this.searching_by_input} />
      main_page = <QuestionContent ident={this.state.quest_id} data={this.state.data} ask_question={this.display_ask_question}
        answer_question={this.display_answer_question} />
    }

    // Answer the question page
    else if (this.state.page_num === 4) {
      banner = <Banner main_question_page={this.display_main_page} main_tag_page={this.display_tag_page} main_pages={this.main_page} search_handler={this.searching_by_input} />
      main_page = <AnswerQuestion text={this.state.ans_text} name={this.state.ans_name} answer_text_handler={this.handle_ans_text} post_answer={this.add_new_answer}
        answer_name_handler={this.handle_ans_name} />
    }

    return (
      <div>
        {banner}
        {main_page}
      </div>
    );
  }
}
