/*
 * @Author: wplei
 * @Date: 2018-11-27 14:55:20
 * @Last Modified by: wplei
 * @Last Modified time: 2018-11-27 17:48:17
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@material-ui/core";
const PROP_BLACK_LIST = ["disabled"];

const defaultProps = {
    text: "",
    loading: false
};
const propTypes = {
    text: PropTypes.string,
    loading: PropTypes.bool
};

const LoadingButton = ({ text, loading, ...rest }) => {
    PROP_BLACK_LIST.forEach(g => {
        rest[g] && delete rest[g];
    });
    return (
        <Button {...rest} disabled={loading}>
            {loading ? <CircularProgress color="secondary" size={14} /> : { text }}
        </Button>
    );
};

LoadingButton.defaultProps = defaultProps;
LoadingButton.propTypes = propTypes;

export default LoadingButton;
