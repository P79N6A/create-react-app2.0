import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { read, clear, mute } from "../funcs/actions";
import Snacker from "./snackbar";
import Func from "./funcs";
import _ from "lodash";

class View extends Component {
    timer = null;
    onMsgClose(id) {
        let { applyOnRead, applyClear } = this.props;
        applyOnRead(id);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            applyClear();
        }, 5000);
    }
    render() {
        let { messages, config, applyMuteMsg } = this.props;
        let { autoHideDuration, mute } = config;
        // let msgs = _.filter(messages, ["unread", true]);
        return _.map(messages, msg => {
            let { type, message, source, id, unread, zIndex } = msg;
            return (
                <div className="isc-message" key={id}>
                    <Snacker
                        message={message}
                        source={source}
                        type={type}
                        onClose={this.onMsgClose.bind(this)}
                        open={unread}
                        id={id}
                        mute={mute}
                        onMute={applyMuteMsg}
                        zIndex={zIndex}
                        autoHideDuration={autoHideDuration}
                    />
                    <Func />
                </div>
            );
        });
    }
}

View.propTypes = {
    messages: PropTypes.array,
    config: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    let store = state[reducerName];
    return {
        config: store && store.config,
        messages: store && store.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        applyOnRead: identify => {
            dispatch(read(identify));
        },
        applyMuteMsg: value => {
            dispatch(mute(value));
        },
        applyClear: () => {
            dispatch(clear());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
