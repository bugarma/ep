import React, { Component } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
    font-size: 1.5em;
    width: 100px;
`;



class Clock extends Component {
    state = {
        start: new Date(),
        end: new Date(),
    }
    
    componentDidMount(){
        this.timer = setInterval(()=> {
            this.setState({
                end: new Date(),
            });
        }, 1000);
    }

    componentWillReceiveProps(props){
        if(props.stop) clearInterval(this.timer);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        const { start, end } = this.state;
        return (
            <Wrapper>
                { (end.getTime() - start.getTime())/1000 } s
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