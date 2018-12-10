// eslint-disable-next-line
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { keepAliveRequest } from "../funcs/actions";
import { REDUCER_NAME as reducerName } from "../funcs/constants";

class Authorization extends Component {
    componentDidMount() {
        this.keepAlive();
    }

    keepAlive() {
        this.interval = setTimeout(async () => {
            if (this.props.isValid) {
                await this.props.keepAlive();
            }
            this.keepAlive();
        }, 30 * 1000);
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }
}

Authorization.propTypes = {
    isValid: PropTypes.bool,
    keepAlive: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return { isValid: state[reducerName] && state[reducerName].isValid };
};

const mapDispatchToProps = dispatch => {
    return {
        keepAlive: () => {
            dispatch(keepAliveRequest());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authorization);
