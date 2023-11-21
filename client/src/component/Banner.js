import React from 'react';

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.searching_by_input = this.searching_by_input.bind(this);
    }

    searching_by_input(e) {
        if (e.key === "Enter") {
            // this.props.input_handler(e.target.value);
            // console.log(e.target.value);
            this.props.search_handler(e.target.value);
        }
    }

    render() {
        return (
            <div>
                <h1 id='title'>Fake Stack Overflow</h1>
                <input id="search_input" type="text" placeholder="Search..." onKeyDown={this.searching_by_input}></input>

                <div id='main_left'>
                    <br></br>
                    <br></br>
                    <button id='question_menu' className='side_content' style={{ backgroundColor: this.props.q_color }} onClick={this.props.main_question_page}>Questions</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button id='tag_menu' className='side_content' style={{ backgroundColor: this.props.t_color }} onClick={this.props.main_tag_page}>Tags</button>
                </div>
            </div>
        )
    }
}
