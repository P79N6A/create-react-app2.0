import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "./link";
import * as FilterTypes from "../funcs/constants";
import { setFilter } from "../funcs/actions";
import { REDUCER_NAME as filterReducer } from "../funcs/constants";

import "../styles/style.less";

const Filters = ({ selected, onFilter }) => {
    const filters = [FilterTypes.ALL, FilterTypes.COMPLETED, FilterTypes.UNCOMPLETED];
    return (
        <p className="filters">
            {filters.map(item => (
                <Link key={item} active={selected === item} onClick={() => onFilter(item)}>
                    {item}
                </Link>
            ))}
        </p>
    );
};

Filters.propTypes = {
    selected: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired
};
//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    return { selected: state[filterReducer] || "all" };
};

const mapDispatchToProps = dispatch => {
    return {
        onFilter: filter => {
            dispatch(setFilter(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
