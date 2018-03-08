import React, { Component } from 'react';
import styled from 'styled-components';
import Sentence from './Sentence';
import data from './data';

const Container = styled.div`
    margin: 40px;
`;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: 0,
            index: 0,
            currentInput: '',
            finished: Array(data.length).fill(false),
        };

        this.onHandleKeydown = this
            .onHandleKeydown
            .bind(this);
        this.fetchData = () => { };

        this.onHandleClick = (line) => {
            this.setState({line})
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
        e.preventDefault();
        let { index, line, currentInput } = this.state;
        if (line >= data.length) { return; }
        
        const { key } = e;
        const { finished } = this.state;
        const { eng } = data[line];
        
        if (key.length === 1) {
            if (index >= eng.length-1 && eng[eng.length-1] === key) {
                index = 0;
                const newFinished = finished.slice();
                newFinished[line] = true;
                line += 1;

                this.setState({ index, line, finished: newFinished, currentInput: "" })
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
                index: index >= 0 ? index: 0,
            });
        }
    }

    render() {
        const { line, index, currentInput, finished } = this.state;
        let keyCounter = 0;
        const Sents = data.map((e, i) => {
            const { cht, eng } = e;
            return (<Sentence
                currentInput={currentInput}
                key={keyCounter++}
                cht={cht}
                eng={eng}
                index={index}
                isCurrentLine={line === i}
                finished={finished[i]}
                onClick={() => this.onHandleClick(i)}
            />);
        });
        return (
            <Container>
                {Sents}
            </Container>
        );
    }
}

export default Main;
