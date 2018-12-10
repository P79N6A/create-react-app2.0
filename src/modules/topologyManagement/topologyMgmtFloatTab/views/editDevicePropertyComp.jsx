/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import { connect } from "react-redux";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { getDeviceDetail } from "../funcs/actions";
import { TextField } from "modules/common";
import ListItem from "@material-ui/core/ListItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";

class EditDevicePropertyComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { initValue: this.props.propertyInitValue, expandedRW: true, expandedR: false, expandedE: false };
        this.didDetailChanged = false;
        this.validateCheck = [];
    }
    componentDidMount() {
        this.setState(this.props.propertyInitValue);
    }
    componentWillReceiveProps = nextProps => {
        // init value
        if (
            JSON.stringify(this.props.basicTypeValues) !== JSON.stringify(nextProps.basicTypeValues) ||
            JSON.stringify(this.props.propertyInitValue) !== JSON.stringify(nextProps.propertyInitValue) ||
            (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab)
        ) {
            this.setState(Object.assign(this.state, nextProps.propertyInitValue));
        }
    };

    handleInputSelectChanged(configKey, event) {
        this.setState(
            Object.assign(this.state, {
                [configKey]: event.target.value,
                initValue: Object.assign(this.state.initValue, {
                    [configKey]: event.target.value
                })
            })
        );

        this.props.propertyInputSelectChangedFunc(configKey, event.target.value);
    }

    onChange = type => {
        let expandType = `expanded${type}`;
        this.setState({
            [expandType]: !this.state[expandType]
        });
    };

    render() {
        const { basicTypeValues } = this.props;
        const { expandedRW, expandedE, expandedR } = this.state;
        return (
            <div className="float-tab-cont" style={{ padding: "16px 0" }}>
                <ExpansionPanel expanded={expandedRW}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.onChange.bind(this, "RW")} />}>
                        <Typography variant="subtitle1" className="title" title="Readwrite">
                            Read Write
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        style={{
                            display: "block",
                            padding: "0 24px "
                        }}
                    >
                        {basicTypeValues &&
                            basicTypeValues.readWrite.map((basicType, index) => {
                                const disable = basicType.operations === "RW" ? false : true;
                                return (
                                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={basicType.displayname}>
                                        <TextField
                                            label={basicType.displayname}
                                            value={this.state[basicType.displayname] || ""}
                                            fullWidth
                                            onChange={this.handleInputSelectChanged.bind(this, basicType.displayname)}
                                            disabled={disable}
                                        />
                                    </ListItem>
                                );
                            })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expandedR}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.onChange.bind(this, "R")} />}>
                        <Typography variant="subtitle1" className="title" title="Readonly">
                            Read Only
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        style={{
                            display: "block",
                            padding: "0"
                        }}
                    >
                        {basicTypeValues &&
                            basicTypeValues.readOnly.map((basicType, index) => {
                                return (
                                    <ListItem button key={basicType.displayname}>
                                        <ListItemText
                                            primary={<span>{this.state[basicType.displayname] || ""}</span>}
                                            secondary={
                                                <span className="topology-pre">{basicType.displayname || ""}</span>
                                            }
                                            title={this.state[basicType.displayname] || ""}
                                            style={{ wordBreak: "break-all" }}
                                        />
                                    </ListItem>
                                );
                            })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expandedE}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.onChange.bind(this, "E")} />}>
                        <Typography variant="subtitle1" className="title" title="Execute">
                            Execute
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        style={{
                            display: "block",
                            padding: "0"
                        }}
                    >
                        {basicTypeValues &&
                            basicTypeValues.execute.map((basicType, index) => {
                                return (
                                    <ListItem button key={basicType.displayname}>
                                        <ListItemText
                                            primary={<span>{this.state[basicType.displayname] || ""}</span>}
                                            secondary={
                                                <span className="topology-pre">{basicType.displayname || ""}</span>
                                            }
                                            title={this.state[basicType.displayname] || ""}
                                            style={{ wordBreak: "break-all" }}
                                        />
                                    </ListItem>
                                );
                            })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

EditDevicePropertyComp.propTypes = {};

EditDevicePropertyComp.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        selectDeviceModelId: filterProps(state, identify, topoReducerName, "selectDeviceModelId"),
        selectDeviceId: filterProps(state, identify, topoReducerName, "selectDeviceId")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDeviceDetail: (deviceId, identify) => {
            dispatch(getDeviceDetail(deviceId, identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDevicePropertyComp);
