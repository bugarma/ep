import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 60px;
    background-color: #f0f2f5;
    text-align: center;
    padding: 10px;
`;

const Footer = () => (
    <Wrapper>
        <div>
            All Right Reserved
        </div>
        <div>
            All the resources are retrieved from <a href="https://tw.voicetube.com/">Voicetube</a>
        </div>
    </Wrapper>
);

export default Footer;