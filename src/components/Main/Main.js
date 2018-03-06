import React, {Component} from 'react';

const data = {
    eng: 'The greatest people are self-managing.',
    cht: '偉大的人總是能夠自我管理'
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };

        this.onHandleKeydown = this
            .onHandleKeydown
            .bind(this);
    }

    onHandleKeydown(e) {
        let {input} = this.state;

        switch (e.key) {
            case "Enter":
            case "Shift":
            case "Alt":
            case "Ctrl":
            case "Meta":
                break;
            case "Backspace":
                input = input.slice(0, -1);
                break;
            default:
                input += e.key;
                break;
        }

        this.setState({input});
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onHandleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onHandleKeydown);
    }

    render() {
        const { input } = this.state;
        return (
            <div>
                <h3>{data.cht}</h3>
                <p>{input}<span style={{color: 'grey'}}>{data.eng.slice(input.length)}</span></p>
                
            </div>
        );
    }

}

export default Main;
