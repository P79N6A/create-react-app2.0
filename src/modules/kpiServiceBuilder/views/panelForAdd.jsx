import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { getDblistRequest, changeProperty, saveKpiRequest, getPreviewRequest } from "../funcs/actions";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import AddTable from "./tableForAdd";
import SnackBar from "./component/snackbar";
import "../styles/style.less";

// const Option = Select.Option;

const styles = theme => ({
    drawerPaper: {
        position: "absolute",
        width: "100%",
        height: "90%",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    }
});
class View extends Component {
    componentWillMount() {
        this.props.onGetDbList(this.props.identify);
    }

    render() {
        let { onPropertyChange, identify } = this.props;
        // let { identify, type, name, description, format, onPropertyChange, onGetPreview, queryScript } = this.props;
        return (
            <div className="kpiQuery-all">
                <Card className="kpiQuery-all">
                    <CardHeader
                        action={
                            <IconButton>
                                <Icon onClick={() => onPropertyChange(identify, "addMode", false)}>
                                    keyboard_arrow_left
                                </Icon>
                            </IconButton>
                        }
                        title="Add Kpi"
                    />
                    <Paper className="kpiQuery-title" elevation={5}>
                        <AddTable {...this.props} />
                    </Paper>
                </Card>
                <SnackBar {...this.props}/>
            </div>
        );
    }
}
View.defaultProps = {
    name: "",
    type: "",
    description: "",
    format: "KpiQuery",
    dbList: {},
    queryScript:
        "select top 500 parameter_name,numeric_value, sent_datetime, sender_id, alarm_type  from (dbo.alm_capinfo_parameters  inner join dbo.alm_capinfo on dbo.alm_capinfo.capinfo_id=dbo.alm_capinfo_parameters.capinfo_id) inner join dbo.alm_alarm on dbo.alm_alarm.alarm_id=dbo.alm_capinfo.alarm_id where (parameter_name like 'AC_Voltage%'  and numeric_value>239) or (parameter_name like 'MeterConsumption%'  and numeric_value>5000) and sent_datetime>'2017-06-12' order by sent_datetime",
    modifiedby: "admin"
};

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let { identify, format, type, dbList, queryScript,name } = ownProps;
    return {
        message:state[reducerName] && state[reducerName][identify] && state[reducerName][identify].message,
        name:(state[reducerName] && state[reducerName][identify] && state[reducerName][identify].name) || name,
        showPreviewTable:
            state[reducerName] && state[reducerName][identify] && state[reducerName][identify].showPreviewTable,
        // showTable: state[reducerName] && state[reducerName][identify] && state[reducerName][identify].showTable,
        format: (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].format) || format,
        dbList: (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].dbList) || dbList,
        type: (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].type) || type,
        queryScript:
            (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].queryScript) ||
            queryScript
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDbList: identify => {
            dispatch(getDblistRequest(identify));
        },
        onPropertyChange: (identify, parameterName, value) => {
            dispatch(changeProperty(identify, parameterName, value));
        },
        onSaveKpi: (identify, serviceId, modifiedby, kpiType, format, queryScript) => {
            dispatch(saveKpiRequest(identify, serviceId, modifiedby, kpiType, format, queryScript));
        },
        onGetPreview: (identify, type, format, queryScript) => {
            dispatch(getPreviewRequest(identify, type, format, queryScript));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(View));
