import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Icon } from 'antd';

const EngContainer = styled.h3`
    white-space: pre-line;
    
    .check {
        color: #46C8AE;
    }
    .finised {
        color: #000;
    }
    .not-finished {
        color: #B1B1B1;
    }
    .wrong {
        color: red;
    }
`;

const Sentence = (props) => {
    const {
        cht,
        eng,
        index,
        currentInput,
        isCurrentLine,
        isFinished,
    } = props;

    const sent = (
        <EngContainer>
            {isCurrentLine && !isFinished && (
                <span>
                    <span className="finished">{eng.slice(0, index - currentInput.length)}</span>
                    <span className="wrong">{currentInput}</span>
                    <span className="not-finished">{eng.slice(index)}</span>
                </span>
            )}
            {isFinished &&
                <span className="finished">{eng}<Icon className="check" type="check-circle-o" /></span>
            }
            {!isCurrentLine && !isFinished && <span className="not-finished">{eng}</span>}
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

Sentence.propTypes = {
    cht: PropTypes.string.isRequired,
    eng: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    currentInput: PropTypes.string.isRequired,
    isCurrentLine: PropTypes.bool.isRequired,
    isFinished: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Sentence;
