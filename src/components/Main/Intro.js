import React, { Component } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { Row, Dropdown, Menu, Icon } from 'antd';
import { connect } from "react-redux";
import { fetchList } from "../../actions/articleAction";

const Wrapper = styled(Row)`
    height: 100%;
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
    handleClick: PropTypes.func.isRequired,
};

MyMenu.defaultProps = {
    options: []
}

class Intro extends Component {
    constructor(props){
        super(props);

        this.handleClick = ({ key }) => {
            this.props.onChange(key);
        }
    }

    componentDidMount(){
        this.props.fetchList();
    }

    render() {
        const { list } = this.props;

        const menu = (<MyMenu options={list} handleClick={this.handleClick}/>);

        return (
            <Wrapper type="flex" justify="center" align="middle">
                <div className="text">
                    Practing English by Typing
                </div>
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
    list: PropTypes.arrayOf({
        number: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    fetchList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        list: state.articleReducer.list
    }
}

export default connect(mapStateToProps, { fetchList })(Intro);