import React, { Component } from 'react';
import { animateScroll as scroll } from "react-scroll";
import { Progress } from "antd";
import axios from "axios";
import styled from 'styled-components';
import Sentence from './Sentence';
import List from '../List/List';


const Container = styled.div`
    margin: 40px;
`;

const PointContainer = styled.h2`
    position: fixed;
    right: 40px;
    top: 40px;
`

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: 0,
            index: 0,
            currentInput: '',
            body: [],
            finished: [],
        };

        this.sents = [];

        this.onHandleKeydown = (e) => {
            const { body } = this.state;
            const { key } = e;
            if(key === " ") {
                e.preventDefault();
            }
    
            let { index, line, currentInput } = this.state;
            if (line >= body.length) { return; }
    
            
            const { finished } = this.state;
            const { eng } = body[line];
    
            if (key.length === 1) {
                if (index >= eng.length - 1 && eng[eng.length - 1] === key) {
                    index = 0;
                    const newFinished = finished.slice();
                    newFinished[line] = true;
                    line += 1;
    
                    this.setState({ index, line, finished: newFinished, currentInput: "" });
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

        this.onHandleClick = (line) => {
            this.setState({ line });
        };

        this.handleSelectChange = (number) =>{
            axios.get(`/api/article/${number}`).then(res => {
                const { body } = res.data;
                console.log(body);
                this.setState({
                    line: 0,
                    index: 0,
                    currentInput: '',
                    body,
                    finished: Array(body.length).fill(false),
                    number
                })
            });
        };

        this.scrollToView = (elem) => {
            const top = elem.offsetTop;
            const { innerHeight } = window;
            scroll.scrollTo(top - innerHeight / 2);
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onHandleKeydown);
    }

    componentWillUpdate(props, state) {
        localStorage.setItem('main', JSON.stringify(state));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onHandleKeydown);
    }

    render() {
        const { line, index, currentInput, finished, body, number } = this.state;
        let keyCounter = 0;
        let Sents;
        if (body.length){
            Sents = body.map((e, i) => {
                const { cht, eng } = e;
                return (<div ref={ref => this.sents.push(ref)} key={keyCounter++}>
                    <Sentence
                        currentInput={currentInput}
                        cht={cht}
                        eng={eng}
                        index={index}
                        isCurrentLine={line === i}
                        isFinished={finished[i]}
                        onClick={() => this.onHandleClick(i)}
                    />
                </div>);
            });
        }

        const finishedNum = finished.reduce((a, b) => a + b, 0);
        const totalNum = finished.length;

        return (
            <Container ref={ref => { this.con = ref; }}>
                <List onChange={this.handleSelectChange}/><br/><br/>
                <PointContainer style={{ position: 'fixed', right: 40, top: 40 }}>
                    { finishedNum } / { totalNum }
                    <Progress percent={finishedNum/totalNum * 100} showInfo={false}/>
                </PointContainer>
                {number && <iframe title="embed" width="560" height="525" src={`https://tw.voicetube.com/embed/${number}`} frameBorder="0" allowFullScreen/>}
                {Sents}
            </Container>
        );
    }
}

export default Main;
