import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import theme from "commons/components/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ServicePanel from "./panelForService";
import AddPanel from "./panelForAdd";
import "../styles/style.less";

class View extends Component {
    render() {
        let { addMode } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="kpiQuery-contaniner">
                    {addMode ? <AddPanel {...this.props} /> : <ServicePanel {...this.props} />}
                </div>
            </MuiThemeProvider>
        );
    }
}

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let { identify } = ownProps;
    return { addMode: state[reducerName] && state[reducerName][identify] && state[reducerName][identify].addMode };
};

export default connect(mapStateToProps)(View);
