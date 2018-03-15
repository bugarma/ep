import React, { Component } from 'react';
import { animateScroll as scroll } from "react-scroll";
import { Progress, Col, Row, Button } from "antd";
import axios from "axios";
import styled from 'styled-components';
import Sentence from './Sentence';
import List from '../List/List';


const Container = styled.div`
    padding: 40px;
`;

const PointContainer = styled.h2`
    margin: 0;
`;

const SentWrapper = styled.div`
    height: calc(100vh - 200px);
    overflow: auto;
`

const IframeWrapper = styled.div`
    position: relative;
    height: calc(100vh - 200px);
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: 0,
            index: 0,
            currentInput: '',
            body: [],
            finished: [],
            number: null,
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
            axios.get(`https://cors.io/?https://tw.voicetube.com/videos/print/${number}?eng_zh_tw=1`).then(res => {
                const parser = new DOMParser().parseFromString(res.data, "text/html");
                const spans = [...parser.querySelectorAll('li span')];

                const body = spans.map(e => {
                    const s = e.innerHTML.split(/(?:<br>)|(?:<br\/>)/);
                    const eng = new DOMParser().parseFromString(s[0], "text/html").querySelector('body').textContent.trim();
                    const cht = new DOMParser().parseFromString(s[1], "text/html").querySelector('body').textContent.trim();

                    return {
                        eng,
                        cht
                    };
                })                
                this.setState({
                    line: 0,
                    index: 0,
                    currentInput: '',
                    body,
                    finished: Array(body.length).fill(false),
                    number,
                    ...JSON.parse(localStorage.getItem(number.toString())),
                });
            });
        };

        this.resetStorage = () => {
            localStorage.removeItem(this.state.number);
            this.setState({
                line: 0,
                index: 0,
                currentInput: '',
                finished: Array(this.state.body.length).fill(false),
            });
        }

        this.scrollToView = (elem) => {
            if(!elem) return;
            const top = elem.offsetTop;
            const height = window.innerHeight - 200;
            scroll.scrollTo(top - height / 2, {containerId: "__sent_wrapper"});
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onHandleKeydown);
    }

    componentWillUpdate(props, state) {
        const { number } = state;
        if(number){
            localStorage.setItem(number.toString(), JSON.stringify(state));
        }
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
                <Row type="flex" justify="space-between" style={{marginBottom: 20}}>
                    <List onChange={this.handleSelectChange}/>
                    <PointContainer>
                        { finishedNum } / { totalNum }
                        <Progress percent={finishedNum/totalNum * 100} showInfo={false}/>
                    </PointContainer>
                    <span>{number && <Button icon="reload" onClick={this.resetStorage}>Reset</Button>}</span>
                </Row>
                {number && <Row>
                    <Col span={12}>
                        <SentWrapper id="__sent_wrapper">
                            {Sents}
                        </SentWrapper>
                    </Col>
                    <Col span={12}>
                        <IframeWrapper>
                            <iframe title="embed" src={`https://tw.voicetube.com/embed/${number}`} frameBorder="0" allowFullScreen/>
                        </IframeWrapper>
                    </Col>
                </Row>}
            </Container>
        );
    }
}

export default Main;
