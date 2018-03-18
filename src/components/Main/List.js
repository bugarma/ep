import React from 'react';
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

const List = (props) => {
    const { onChange, placeholder, list, number } = props;
    return (
        <div>
            <Select value={number} onChange={onChange} style={{ width: 500 }} placeholder={placeholder}>
                {list.length && list.map((e) => (
                    <Option key={e.number} value={e.number}>{e.title}</Option>
                ))}
            </Select>
        </div>
    );
}

List.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    number: PropTypes.string.isRequired,
};

List.defaultProps = {
    placeholder: "Select an aritcle..."
};

export default List;