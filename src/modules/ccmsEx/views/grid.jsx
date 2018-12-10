import React, { Component } from "react";
import PropTypes from "prop-types";
import WidgetsView from "./components/gridEx";
import $ from "jquery";
// import { loadavg } from "os";

class Grid extends Component {
    state = {
        // doms: []
    };
    static defaultProps = {
        draggableCancel: ""
    };
    static propTypes = {
        draggableCancel: PropTypes.string
    };
    handleLayoutChange = () => {};
    onResize = currItem => {
        $.publish("WIDGET-RESIZE", currItem);
    };
    render = () => {
        const { draggableCancel, doms, onLayoutChange } = this.props;
        return (
            <WidgetsView
                getLayouts={onLayoutChange}
                onResize={this.onResize}
                isBreakpoints
                draggableCancel={draggableCancel}
            >
                {doms}
            </WidgetsView>
        );
    };
}

export default Grid;
