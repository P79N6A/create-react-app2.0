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
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { getDeviceDetail } from "../funcs/actions";
import ConfigMapping from "../topologyConfigMapping";
import { CardWithTitle } from "modules/basicCardComps";

class DetailExpandCard extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== parseInt(nextProps.currentTab, 10) || nextProps.getDetailSuccess) {
            return;
        }
        this.searchDeviceDetail(nextProps);
    }

    componentDidMount() {
        this.searchDeviceDetail(this.props);
    }

    searchDeviceDetail(props) {
        let deviceId = props.selectDeviceId;
        if (!deviceId) {
            return;
        }
        this.props.getDeviceDetail(deviceId, this.props.identify);
    }

    renderDeviceData() {
        let deviceData = this.props.deviceData;
        if (!deviceData) {
            return;
        }
        let configMapping = ConfigMapping.slice(0);
        if (!deviceData.properties) {
            for (let i = 0; i < configMapping.length; i++) {
                if (configMapping[i].expandTitle === "Property") {
                    configMapping.splice(i, 1);
                }
            }
        }

        return (
            <div>
                {configMapping.map((item, index) => {
                    return (
                        <ExpansionPanel defaultExpanded={item.defaultExpanded} className="expand-card" key={index}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{item.expandTitle}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="expand-card-cont">
                                <Table>
                                    <TableBody>
                                        {item.expandTitle !== "Property" &&
                                            Object.keys(item.keyFormatToDisplay).map(key => {
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell component="th" scope="row">
                                                            {item.keyFormatToDisplay[key]}
                                                        </TableCell>
                                                        <TableCell>{deviceData[key]}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {item.expandTitle === "Property" &&
                                            Object.keys(deviceData["properties"]).map(key => {
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell component="th" scope="row">
                                                            {key}
                                                        </TableCell>
                                                        <TableCell>{deviceData["properties"][key]}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="detail-expand-card">
                {/* <Typography variant="title">{this.props.selectDeviceName}</Typography> */}
                <CardWithTitle title={this.props.selectDeviceName} />
                {this.props.deviceData && this.renderDeviceData()}
            </div>
        );
    }
}

const filterProps = (state, identify, props) => {
    if (state[topoFloatTabReducer] && state[topoFloatTabReducer][identify]) {
        return state[topoFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        deviceData: filterProps(state, identify, "deviceData"),
        getDetailSuccess: filterProps(state, identify, "getDetailSuccess")
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
)(DetailExpandCard);
