import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { mute } from "../funcs/actions";
import _ from "lodash";

class Func extends React.Component {
    muteTimer = null;
    componentWillReceiveProps(nextProps) {
        if(_.isEqual(nextProps.config,this.props)){
            return;
        }
        this.onMuteStart(nextProps);
    }
    onMuteStart(props) {
        let { config, applyMuteMsg } = props;
        let { muteDuration } = config;
        clearTimeout(this.muteTimer);
        this.muteTimer = setTimeout(() => {
            applyMuteMsg(false);
        }, muteDuration);
    }
    render() {
        return null;
    }
}

Func.propTypes = {
    // messages: PropTypes.array,
    config: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    let store = state[reducerName];
    return {
        config: store && store.config
    };
};

const mapDispatchToProps = dispatch => {
    return {
        applyMuteMsg: value => {
            dispatch(mute(value));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Func);
