import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Select } from "antd";
import axios from "axios";


const { Option } = Select;

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [],
        };
        this.fetchList = () => {
            axios.get(`https://cors.io/?https://tw.voicetube.com/channel/translated?time=short&order-type=collect&ref=nav-sub&accent=us`).then(res => {
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
    }

    componentDidMount(){
        this.fetchList();
    }

    render() {
        const { options } = this.state;
        const { onChange } = this.props;
        
        return (
            <Select onChange={onChange} style={{ width: 500 }}>
                {options.length && options.map((e) => (
                    <Option key={e.number} value={e.number}>{e.title}</Option>
                ))}
            </Select>
        );
    }
}

List.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default List;