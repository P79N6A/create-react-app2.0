import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { changeProperty, getServiceListRequest } from "../funcs/actions";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ServiceTable from "./tableForService";
import ServiceDetailDrawer from "./drawerForDetail";
import "../styles/style.less";

class View extends Component {
    componentWillMount() {
        this.props.onGetServiceList(this.props.identify);
    }

    render() {
        let { onPropertyChange, identify } = this.props;
        // let { identify, type, name, description, format, onPropertyChange, onGetPreview, queryScript } = this.props;
        return (
            <Paper className="kpiQuery-drawer">
                <Card>
                    <CardHeader
                        action={
                            <IconButton>
                                <Icon onClick={() => onPropertyChange(identify, "addMode", true)}>add</Icon>
                            </IconButton>
                        }
                        title="Kpi List Table"
                    />
                    <Paper className="cardWithTitle-paper" elevation={5}>
                        <ServiceTable {...this.props} />
                    </Paper>
                </Card>
                <ServiceDetailDrawer {...this.props} />
            </Paper>
        );
    }
}
View.defaultProps = {
    serviceList: [],
    showDetail: false
};

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let { identify, serviceList, showDetail } = ownProps;
    return {
        serviceDetail: state[reducerName] && state[reducerName][identify] && state[reducerName][identify].serviceDetail,
        showDetail:
            (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].showDetail) ||
            showDetail,
        serviceList:
            (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].serviceList) ||
            serviceList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetServiceList: identify => {
            dispatch(getServiceListRequest(identify));
        },
        onPropertyChange: (identify, parameterName, value) => {
            dispatch(changeProperty(identify, parameterName, value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
