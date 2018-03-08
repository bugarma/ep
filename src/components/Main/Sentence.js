import React from 'react';
import styled from 'styled-components';
import { Divider, Icon } from 'antd';

const NotFinish = styled.span`
    color: #D0D9DB;
`;

const Finish = styled.span`
    color: #000;
`;

const Wrong = styled.span`
    color: red;
`;

const EngContainer = styled.h3`
    
`;

const Sentence = (props) => {
    const {
        cht,
        eng,
        index,
        currentInput,
        isCurrentLine,
        finished,
    } = props;

    const sent = (
        <EngContainer>
            {isCurrentLine && (
                <div>
                    <Finish>{eng.slice(0, index - currentInput.length)}</Finish>
                    <Wrong>{currentInput}</Wrong>
                    <NotFinish>{eng.slice(index)}</NotFinish>
                </div>
            )}
            {!isCurrentLine && finished && <div>
                <Finish>{eng}</Finish><Icon type="check-circle-o" />
            </div>}
            {!isCurrentLine && !finished && <NotFinish>{eng}</NotFinish>}
        </EngContainer>
    );

    return (
        <div onClick={props.onClick}>
            <h3>{cht}</h3>
            {sent}
            <Divider />
        </div>
    );
};

export default Sentence;
