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
        };

        this.onHandleKeydown = this
            .onHandleKeydown
            .bind(this);
        this.fetchData = () => { };
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
        const { key } = e;
        let { index, line, currentInput } = this.state;
        if (line >= data.length) { return; }

        const { eng } = data[line];
        if (key.length === 1) {
            if (!currentInput) {
                if (key !== eng[index]) {
                    currentInput = key;
                }
                index += 1;
                if (index === eng.length && !currentInput) {
                    index = 0;
                    line += 1;
                }
                this.setState({ currentInput, index, line });
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
        const { line, index, currentInput } = this.state;
        let keyCounter = 0;
        const Sents = data.map((e, i) => {
            const { cht, eng } = e;
            return (<Sentence
                currentInput={currentInput}
                key={keyCounter++}
                cht={cht}
                eng={eng}
                line={line}
                index={index}
                i={i}
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
