import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { changeProperty } from "../funcs/actions";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import TextField from "@material-ui/core/TextField";


import "../styles/style.less";

class View extends Component {
    onChange(name, value) {
        let { identify, onPropertyChange, kpiQuery } = this.props;
        onPropertyChange(identify, "kpiQuery", { ...kpiQuery, [name]: value });
    }
    render() {
        let { kpiQuery } = this.props;
        let { queryScript } = kpiQuery||{};
        return (
            <div>
                {/* <TextField
                    label="dbName"
                    defaultValue={dbName}
                    onChange={value => {
                        this.onChange("dbName", value);
                    }}
                    margin="normal"
                />
                <TextField
                    label="dbType"
                    defaultValue={dbType}
                    onChange={value => {
                        this.onChange("dbType", value);
                    }}
                    margin="normal"
                />
                <TextField
                    label="dbURL"
                    defaultValue={dbURL}
                    onChange={value => {
                        this.onChange("dbURL", value);
                    }}
                    margin="normal"
                />
                <TextField
                    label="dbPort"
                    defaultValue={dbPort}
                    onChange={value => {
                        this.onChange("dbPort", value);
                    }}
                    margin="normal"
                /> */}
                <TextField
                    label="queryScript*"
                    defaultValue={queryScript}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={value => {
                        this.onChange("queryScript", value);
                    }}
                    placeholder="Input Your Query Script"
                    fullWidth
                    margin="normal"
                />
            </div>
        );
    }
}

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        kpiQuery: state[reducerName] && state[reducerName][identify] && state[reducerName][identify].kpiQuery
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onPropertyChange: (identify, name, value) => {
        //     dispatch(changeProperty(identify, name.value));
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
