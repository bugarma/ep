import React, {Component} from 'react';
import styled from 'styled-components';

const data = [
    {
        eng: 'The greatest people are self-managing.',
        cht: '偉大的人總是能夠自我管理'
    }, {
        eng: `They don't need to be managed.`,
        cht: '他們不需要被管理'
    }
]

const NotFinish = styled.span `
    color: #D0D9DB;
`;

const Finish = styled.span `
    color: #000;
`;

const Wrong = styled.span `
    color: red;
`;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: 0,
            index: 0,
            currentInput: ""
        };

        this.onHandleKeydown = this
            .onHandleKeydown
            .bind(this);
    }

    onHandleKeydown(e) {
        const {key} = e;
        console.log(key);
        let {index, line, currentInput} = this.state;
        const {eng} = data[line];
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
                this.setState({currentInput, index, line});
            } else if (key !== eng[index - 1]) {
                this.setState({currentInput: key});
            } else {
                this.setState({currentInput: ""});
            }
        } else if (key === "Backspace") {
            index -= 1;
            this.setState({
                currentInput: "",
                index: index >= 0
                    ? index
                    : 0
            });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onHandleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onHandleKeydown);
    }

    render() {
        const {line, index, currentInput} = this.state;
        const Sents = data.map((e, i) => {
            const {cht, eng} = e;
            let sent;
            if (i < line) {
                sent = (
                    <p>
                        <Finish>{eng}</Finish>
                    </p>
                )
            } else if (i > line) {
                sent = (
                    <p>
                        <NotFinish>{eng}</NotFinish>
                    </p>
                )
            } else {
                sent = (
                    <p>
                        <Finish>{eng.slice(0, index - currentInput.length)}</Finish>
                        <Wrong>{currentInput}</Wrong>
                        <NotFinish>{eng.slice(index)}</NotFinish>
                    </p>
                )
            }

            return (
                <div key={i}>
                    <h3>{cht}</h3>
                    {sent}
                </div>
            )
        })
        return (
            <div>
                {Sents}
            </div>
        )
    }
}

export default Main;