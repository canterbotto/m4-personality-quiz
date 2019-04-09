import React, { Component } from 'react';
import "./Quiz.css";
let questions = require("./questions.json");

function shuffleArray(array) 
{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


class InfoBox extends Component
{
    constructor(){super()}
    render()
    {
        return (
            <div id="infobox">
            <h2 id="infoname">{this.props.name}</h2>
            </div>
        )
    }
}

function optionButton(props, callBack, type) { 
    // props = {displayName, [desc], [name]}
    let className = "optionButton";
    if (props.name === props.sel) 
        className = "optionButtonSelected"
    let content;
    if (type==="txt")
        content = <h4>{props.desc}</h4>
    else if (type==="img") {
        content = <img src={props.desc} alt={props.desc} className="optionimg"/>
        className = "imgButton"
    }
    
    return (
        <button id={props.name} className={className} type="radio" 
                name="optionButton" onClick={buttonClicked}>
            {content}
        </button>
    );
    function buttonClicked(e) {
        e.preventDefault();
        callBack(props);
        // can hold whether or not selected in a variable
    }
}

function submitButton(callBack) {
    // props = {callBack} callback
    return (
        <button id="vote-submit" type="button" onClick={buttonClicked} >
            <text id="submitText">Submit</text>
        </button>
    );

    function buttonClicked(e) {
        e.preventDefault();
        callBack();
    }
}

class VoteBox extends Component
{ // props.options
    constructor() {
        super();
        this.state = {
            selected: "none"
        };
        this.options = [];
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        // shuffleArray(this.props.options); REMOVED AND DONE MANUALLY IN JSON
        this.options = [];
        return (
            <div>
                <div style={{height: "10px", overflow:"hidden"}} />
                {this.renderOptions()}
                <div style={{height: "2px"}}/>
                {submitButton(this.onSubmit)}
            </div>
        )
    }

    renderOptions() {
        for (let i = 0; i < this.props.options.length; i++) {
            this.options.push(<div style={{height: "2px"}}/>);
            this.props.options[i].sel = this.state.selected;
            this.options.push(optionButton(this.props.options[i], this.handleClick, this.props.type));
            // need to adjoin all buttons
        }
        return this.options;
    }
    
    handleClick(btn) {
        this.setState({
            selected: btn.name
        });
    }

    onSubmit() {
        let sel = this.state.selected;
        if (sel === "none") return;
        this.props.callback(sel);
    }
}



class Quiz extends Component 
{
    constructor() {
        super();
        this.state = {
            status: "Open",
            idx: 0,
            complete: false
        };
        this.scores = {
            us: 0,
            ru: 0,
            cn: 0,
            uk: 0
        }
        this.QUESTIONS = questions.length;
        shuffleArray(questions);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render()
    {
        if (!this.state.complete)
        return (
            <div className="container">
            <InfoBox 
                name={questions[this.state.idx].text}
            />
            <div style={{height: "10ox"}} />
            <VoteBox options={questions[this.state.idx].options}
                     callback={this.onSubmit}
                     type={questions[this.state.idx].type} />
            </div>
        )
        else
        {
            let {us, ru, cn, uk} = this.scores;
            return (
                <div className="container">
                    <h3>Russian: {ru} / {this.QUESTIONS}</h3>
                    <h3>American: {us} / {this.QUESTIONS}</h3>
                    <h3>Chinese: {cn} / {this.QUESTIONS}</h3>
                    <h3>British/UK: {uk} / {this.QUESTIONS}</h3>
                </div>
            )
        }
    }

    onSubmit(sel) {
        let index = this.state.idx + 1;
        if (index < this.QUESTIONS) { // more questions
            this.setState({
                idx: index
            });
            this.scores[sel] += 1;
        }
        else { // no questions left
            this.scores[sel] += 1;
            this.setState({
                complete: true,
            });
        } 
    }
      
}

export default Quiz;