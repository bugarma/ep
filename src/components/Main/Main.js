import React, { Component } from 'react';
import { Progress, Col, Row, Button } from "antd";
import styled from 'styled-components';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Sentence from '../Sentence/Sentence';
import List from './List';
import Clock from "./Clock";
import Intro from "./Intro";


const Container = styled.div`
    padding: 40px;
`;

const PointContainer = styled.h2`
    margin: 0;
    width: 200px;
    text-align: center;
    color: #64b3f4;
`;

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

        this.sents = [];

        // this.resetStorage = () => {
        //     localStorage.removeItem(this.state.number);
        //     this.setState({
        //         line: 0,
        //         index: 0,
        //         currentInput: '',
        //         finished: Array(this.state.body.length).fill(false),
        //     });
        // }
    }

    render() {
        const { list, number, finished } = this.props;

        if(number === "") return <Intro/>;

        const finishedNum = finished.reduce((a, b) => a + b, 0);
        const totalNum = finished.length;

        return (
            <Container ref={ref => { this.con = ref; }}>
                <Row type="flex" justify="space-between" style={{marginBottom: 20}}>
                    <List number={number} list={list} onChange={this.handleSelectChange}/>
                    {/* <Clock/> */}
                    <PointContainer>
                        已完成 { finishedNum } / { totalNum }
                        <Progress percent={finishedNum/totalNum * 100} showInfo={false}/>
                    </PointContainer>
                    <span><Button icon="reload" onClick={this.resetStorage}>Reset</Button></span>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <IframeWrapper>
                            <iframe title="embed" src={`https://tw.voicetube.com/embed/${number}`} frameBorder="0" allowFullScreen/>
                        </IframeWrapper>
                    </Col>
                    <Col span={12}>
                        <Sentence/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Main.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    number: PropTypes.string.isRequired,
    finished: PropTypes.arrayOf(PropTypes.bool).isRequired,
    // body: PropTypes.arrayOf(PropTypes.shape({
    //     cht: PropTypes.string.isRequired,
    //     eng: PropTypes.string.isRequired,
    // }),).isRequired,
};

function mapStateToProps(state){
    return {
        list: state.articleReducer.list,
        number: state.articleReducer.number,
        body: state.articleReducer.body,
        finished: state.articleReducer.finished,
    }
}

export default connect(mapStateToProps)(Main);
