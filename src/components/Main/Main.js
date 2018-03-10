import React, { Component } from 'react';
import { animateScroll as scroll } from "react-scroll";
import { Progress } from "antd";
import styled from 'styled-components';
import Sentence from './Sentence';
import data from './data';

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
            finished: Array(data.length).fill(false),
        };

        this.sents = [];

        this.onHandleKeydown = this
            .onHandleKeydown
            .bind(this);
        this.fetchData = () => { };

        this.onHandleClick = (line) => {
            this.setState({ line });
        };

        this.scrollToView = (elem) => {
            const top = elem.offsetTop;
            const { innerHeight } = window;
            scroll.scrollTo(top - innerHeight / 2);
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onHandleKeydown);
        this.fetchData();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onHandleKeydown);
    }

    onHandleKeydown(e) {
        const { key } = e;
        if(key === " ") {
            e.preventDefault();
        }

        let { index, line, currentInput } = this.state;
        if (line >= data.length) { return; }

        
        const { finished } = this.state;
        const { eng } = data[line];

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
    }

    render() {
        const { line, index, currentInput, finished } = this.state;
        let keyCounter = 0;
        const Sents = data.map((e, i) => {
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

        const finishedNum = finished.reduce((a, b) => a + b, 0);
        const totalNum = finished.length;

        return (
            <Container ref={ref => { this.con = ref; }}>
                <PointContainer style={{ position: 'fixed', right: 40, top: 40 }}>
                    { finishedNum } / { totalNum }
                    <Progress percent={finishedNum/totalNum * 100} showInfo={false}/>
                </PointContainer>
                {Sents}
            </Container>
        );
    }
}

export default Main;
