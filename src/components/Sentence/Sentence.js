import React, { Component } from 'react';
import styled, { keyframes } from "styled-components";
import { Divider, Icon } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { animateScroll as scroll } from "react-scroll";

import { lineFinished } from "../../actions/articleAction";
import { finishTyping } from "../../actions/controlAction";

const SentWrapper = styled.div`
    height: 100%;
    overflow: auto;
`;

const blink = keyframes`
    from {
        border-color: white;
    }
    to {
        border-color: grey;
    }
`;

const EngContainer = styled.h3`
    white-space: pre-line;
    
    .check {
        color: #46C8AE;
    }
    .padding {
        padding-left: 2px;
    }
    .finished {
        color: #000;
        position: relative;
        z-index: 3;
    }
    .not-finished {
        color: #B1B1B1;
        position: relative;
        z-index: 2;
    }
    .cursor::before {
        content: '';
        z-index: -1;
        height: 1em;
        top: 2px;
        position: absolute;
        left: -1px;
        border: grey solid 1px;
        animation: ${blink} 1s cubic-bezier(1, 0, 0, 1) infinite;
    }
    .wrong {
        color: red;
    }
`;

const Cursor = styled.span`
    border: grey solid 1px;

    animation: ${blink} 1s cubic-bezier(1, 0, 0, 1) infinite;
`;

class Sentence extends Component {
    constructor(props){
        super(props);
        this.state = {
            line: 0,
            index: 0,
            currentInput: '',
        };

        this.sents = [];


        this.onHandleKeydown = (e) => {
            const { body } = this.props;
            const { key } = e;
            if(key === " ") {
                e.preventDefault();
            }
    
            let { index, line, currentInput } = this.state;
            if (line >= body.length) { return; }
    
            const { eng } = body[line];
    
            if (key.length === 1) {
                if (index >= eng.length - 1 && eng[eng.length - 1] === key) {
                    index = 0;
                    
                    this.props.lineFinished(line);
                    line += 1;
                    if(line >= body.length) this.props.finishTyping();
                    this.setState({ index, line, currentInput: "" });
                    this.scrollToView(this.sents[line]);
                } else if (!currentInput) {
                    if (key !== eng[index]) {
                        currentInput = key;
                    }
                    index += 1;
    
                    this.setState({ currentInput, index });
                } else if (key !== eng[index - 1]) {
                    this.setState({ currentInput: key });
                } else {
                    this.setState({ currentInput: '' });
                }
            } else if (key === 'Backspace') {
                index -= 1;
                this.setState({
                    currentInput: '',
                    index: index >= 0 ? index : 0,
                });
            }
        };

        // this.onHandleClick = (line) => {
        //     this.setState({ line });
        // };

        this.scrollToView = (elem) => {
            if(!elem) return;
            const top = elem.offsetTop;
            const height = window.innerHeight - 200;
            scroll.scrollTo(top - height / 2, {containerId: "__sent_wrapper"});
        };
    }

    componentDidMount(){
        document.addEventListener('keydown', this.onHandleKeydown);
    }

    // componentWillUpdate(props, state) {
    //     const { number } = state;
    //     if(number){
    //         localStorage.setItem(number.toString(), JSON.stringify(state));
    //     }
    // }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onHandleKeydown);
    }

    render() {
        const {
            index,
            currentInput,
            line,
        } = this.state;
        const { body, finished } = this.props;
    
        let keyCounter = 0;
        const Sents = body.map((e, i) => {
            const { cht, eng } = e;
            const isCurrentLine = line === i;
            const isFinished = finished[i];

            return (
                <div ref={ref => this.sents.push(ref)} key={keyCounter++}>
                    <div>
                        <h3>{cht}</h3>
                        <EngContainer>
                            {
                                isCurrentLine && !isFinished && (
                                    <div className="padding">
                                        <span className="finished">{eng.slice(0, index - currentInput.length)}</span>
                                        <span className="wrong">{currentInput}</span>
                                        <span className="not-finished cursor">{eng.slice(index)}</span>
                                    </div>
                                )
                            }
                            {
                                isFinished && <div className="padding">
                                    <span className="finished">{eng}<Icon className="check" type="check-circle-o" /></span>
                                </div>
                            }
                            {
                                !isCurrentLine && !isFinished && <div className="padding">
                                    <span className="not-finished">{eng}</span>
                                </div>
                            }
                        </EngContainer>
                        <Divider />
                    </div>
                </div>
            );
        });
        
        return (
            <SentWrapper id="__sent_wrapper">
                {Sents}
            </SentWrapper>
        );
    }
}

Sentence.propTypes = {
    body: PropTypes.arrayOf(PropTypes.shape({
        cht: PropTypes.string.isRequired,
        eng: PropTypes.string.isRequired,
    }),).isRequired,
    finished: PropTypes.arrayOf(PropTypes.bool).isRequired,
    lineFinished: PropTypes.func.isRequired,
    finishTyping: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return {
        body: state.articleReducer.body,
        finished: state.articleReducer.finished
    }
}

export default connect(mapStateToProps, { lineFinished, finishTyping })(Sentence);