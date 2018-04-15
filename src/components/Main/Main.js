import React, { Component } from 'react';
import { Progress, Col, Row, Button, Spin } from "antd";
import styled from 'styled-components';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchArticle } from "../../actions/articleAction";
import { startTyping, resetTyping } from "../../actions/controlAction";
import Sentence from '../Sentence/Sentence';
import List from './List';
import Intro from "./Intro";
import Clock from "./Clock";


const Container = styled.div`
    padding: 40px;
`;

const PointContainer = styled.h2`
    margin: 0;
    width: 200px;
    text-align: center;
    color: #64b3f4;
`;

const MainWrapper = styled(Row)`
    height: calc(100vh - 200px);
`

const IframeWrapper = styled.div`
    position: relative;
    height: 100%;
    /* height: calc(100vh - 200px); */
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
        background: #c2e59c;
        background: -webkit-linear-gradient(to left, #64b3f4, #c2e59c);
        background: linear-gradient(to left, #64b3f4, #c2e59c);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 100%;
        text-align:center;
    }
`;

const ButtonWrapper = styled(Row)`
    height: 100%;
`;

const Loading = () => (
    <LoadingWrapper type="flex" justify="center" align="middle">
        <div className="text">
            Loading...  <Spin />
        </div>
    </LoadingWrapper>
);

const FakeClock = styled.div`
    font-size: 1.5em;
    width: 100px;
`;

class Main extends Component {
    constructor(props) {
        super(props);

        this.sents = [];
    }

    handleListChange = (number) => {
        this.props.fetchArticle(number);
        this.props.resetTyping();
    }

    render() {
        const {
            list,
            number,
            finished,
            loaded,
            start
        } = this.props;

        if(number === "") return (<Intro/>);

        const finishedNum = finished.reduce((a, b) => a + b, 0);
        const totalNum = finished.length;

        return (
            <Container ref={ref => { this.con = ref; }}>
                <Row type="flex" justify="space-between" style={{marginBottom: 20}}>
                    <List number={number} list={list} onChange={this.handleListChange}/>
                    {start? <Clock number={number} />: <FakeClock>0.00 s</FakeClock>}
                    <PointContainer>
                        已完成 { finishedNum } / { totalNum }
                        <Progress percent={finishedNum/totalNum * 100} showInfo={false}/>
                    </PointContainer>
                </Row>
                {!loaded && <Loading />}
                {loaded && <MainWrapper gutter={20} type="flex">
                    <Col span={12}>
                        <IframeWrapper>
                            <iframe title="embed" src={`https://tw.voicetube.com/embed/${number}`} frameBorder="0" allowFullScreen/>
                        </IframeWrapper>
                    </Col>
                    <Col span={12}>
                        {start? <Sentence/> : <ButtonWrapper type="flex" align="middle" justify="center">
                            <Button onClick={this.props.startTyping}>Click to Start</Button>
                        </ButtonWrapper>}
                    </Col>
                </MainWrapper>}
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
    fetchArticle: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    start: PropTypes.bool.isRequired,
    startTyping: PropTypes.func.isRequired,
    resetTyping: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return {
        list: state.articleReducer.list,
        number: state.articleReducer.number,
        body: state.articleReducer.body,
        finished: state.articleReducer.finished,
        loaded: state.articleReducer.loaded,
        start: state.control.start
    }
}

export default connect(mapStateToProps, { fetchArticle, startTyping, resetTyping })(Main);
