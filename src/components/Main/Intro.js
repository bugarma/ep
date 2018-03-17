import React, { Component } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Row, Dropdown, Menu, Icon } from 'antd';
import axios from "axios";

const Wrapper = styled(Row)`
    height: 100vh;
    width: 100%;
    font-size: 4em;

    .drop {
        position: relative;
        top: -25%;
    }

    .button {
        font-size: 4em;
        color: #64b3f4 !important;
        -webkit-text-fill-color: none;
    }

    .text {
        background: #c2e59c;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .box {
        background: linear-gradient(to left, #64b3f4, #c2e59c);
        padding: 1.5px;
    }
`;

const StyledMenu = styled(Menu)`
    height: 40vh;
    overflow-y: auto;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) !important;
`;

const MyMenu = ({ options, handleClick }) => {
    const items = options.map(e => (
        <Menu.Item key={e.number}>
            {e.title}
        </Menu.Item>
    ));

    return (
        <StyledMenu onClick={handleClick}>
            {items}
        </StyledMenu>
    );
};

MyMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.string,
        title: PropTypes.string,
    })),
};

MyMenu.defaultProps = {
    options: []
}

class Intro extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: []
        };
        this.fetchList = () => {
            axios.get(`https://cors-anywhere.herokuapp.com/https://tw.voicetube.com/channel/translated?time=short&order-type=collect&ref=nav-sub&accent=us`).then(res => {
                const parser = new DOMParser().parseFromString(res.data, "text/html");
                const links = [...parser.querySelectorAll('div.photo')];

                const options = links.map((e) => {
                    const { href } = e.querySelector("a");
                    const number = href.split('/')[4].split('?')[0];
                    const { alt } = e.querySelector("img");
                    
                    return { number, title: alt };
                });
                this.setState({options});
            });
        }

        this.handleClick = ({ key }) => {
            this.props.onChange(key);
        }
    }

    componentDidMount(){
        this.fetchList();
    }

    render() {
        const { options } = this.state;

        const menu = (<MyMenu options={options} handleClick={this.handleClick}/>);

        return (
            <Wrapper type="flex" justify="center" align="middle">
                <div className="drop">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <div>
                            <span className="text">Select an Article to Start !</span> <Icon type="down" style={{fontSize: 'inherit'}} className="button" />
                            <div className="box" />
                        </div>
                    </Dropdown>
                </div>
            </Wrapper>
        );
    }
}

Intro.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Intro;