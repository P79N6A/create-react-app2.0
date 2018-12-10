import { Icon, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
// import { connect } from "react-redux";
// import { actions } from "../../widgetsBoard";

class FullScreenButton extends Component {
    state = {
        full: 0
    };
    static defaultProps = {
        identify: "",
        onFullscreen: () => {},
        onFullScreenExit: () => {}
    };
    static propTypes = {
        identify: PropTypes.string,
        full: PropTypes.bool,
        onFullscreen: PropTypes.func,
        onFullScreenExit: PropTypes.func
    };
    handleFullScreen = () => {
        const { identify, onFullScreen } = this.props;
        let { full } = this.state;
        this.setState(
            {
                full: ++full % 2
            },
            () => {
                if (full) {
                    onFullScreen(identify);
                }
            }
        );
    };
    render = () => {
        const { full } = this.state;
        return (
            <React.Fragment>
                <IconButton title={!!full ? "EXIT" : "FULL"} onClick={this.handleFullScreen}>
                    <Icon>{!!full ? "fullscreen_exit" : "fullscreen"}</Icon>
                </IconButton>
            </React.Fragment>
        );
    };
}

export default FullScreenButton;
