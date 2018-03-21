import React, { Component } from 'react';
import { Progress, Col, Row, Button, Spin } from "antd";
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

const LoadingWrapper = styled(Row)`
    font-size: 4em;
    height: calc(100vh - 200px);

    .text {
        background: #c2e59c;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 100%;
        text-align:center;
    }
`;

const Loading = () => (
    <LoadingWrapper type="flex" justify="center" align="middle">
        <div className="text">
            Loading...  <Spin />
        </div>
    </LoadingWrapper>
)

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
        const { list, number, finished, loaded } = this.props;

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
                {!loaded && <Loading />}
                {loaded && <Row gutter={20}>
                    <Col span={12}>
                        <IframeWrapper>
                            <iframe title="embed" src={`https://tw.voicetube.com/embed/${number}`} frameBorder="0" allowFullScreen/>
                        </IframeWrapper>
                    </Col>
                    <Col span={12}>
                        <Sentence/>
                    </Col>
                </Row>}
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
};

function mapStateToProps(state){
    return {
        list: state.articleReducer.list,
        number: state.articleReducer.number,
        body: state.articleReducer.body,
        finished: state.articleReducer.finished,
        loaded: state.articleReducer.loaded,
    }
}

export default connect(mapStateToProps)(Main);
