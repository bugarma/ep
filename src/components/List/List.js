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
            axios.get(`/api/article`).then(res => {
                this.setState({
                    options: res.data,
                })
            })
        }
    }

    componentDidMount(){
        this.fetchList();
    }

    render() {
        const { options } = this.state;
        const { onChange } = this.props;
        
        return (
            <Select onChange={onChange} style={{ width: 300 }}>
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