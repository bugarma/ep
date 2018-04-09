import React, { Component } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Icon } from 'antd';

const Wrapper = styled.div`
    font-size: 1.5em;
    width: 130px;

    .text {
        margin-right: 5px;
    }
    .btn {
        cursor: pointer;
    }
    .btn:hover {
        color: #64b3f4;
    }
`;



class Clock extends Component {
    state = {
        start: Date.now(),
        end: Date.now(),
        offset: 0,
        pause: false,
    }
    
    componentDidMount(){
        this.timer = setInterval(()=> {
            this.setState({
                end: Date.now(),
            });
        }, 500);
    }

    componentWillReceiveProps(props){
        if(props.stop) clearInterval(this.timer);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    handlePause = () => {
        clearInterval(this.timer);
        const { start, end } = this.state;
        this.setState({
            pause: true,
            offset: end-start,
        });
    }

    handleContinue = () => {
        const { offset } = this.state;
        this.setState({
            start: Date.now()-offset,
            end: Date.now(),
            offset: 0,
        });
        this.timer = setInterval(()=> {
            this.setState({
                end: Date.now(),
            });
        }, 500);
        this.setState({pause: false});
    }

    render() {
        const { start, end, pause } = this.state;
        return (
            <Wrapper>
                <span className="text">{ ((end - start)/1000).toFixed(2) } s</span>
                <span className="btn">
                    {pause && <Icon type="play-circle-o" onClick={this.handleContinue} />}
                    {!pause && <Icon type="pause-circle-o" onClick={this.handlePause} />}
                </span>
            </Wrapper>
        );
    }
}

Clock.propTypes = {
    stop: PropTypes.bool.isRequired,
};


function mapStateToStart(state){
    return {
        stop: state.control.stop
    }
}

export default connect(mapStateToStart)(Clock);