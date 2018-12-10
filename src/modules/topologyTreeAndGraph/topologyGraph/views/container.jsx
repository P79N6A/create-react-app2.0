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
 * Created by xulu on 31/08/2018.
 */
import React from "react";
import "../styles/style.less";
import PropTypes from "prop-types";
import TopoGraph from "./topoGraph";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { closeFloatTab } from "../funcs/actions";
import { reducerName as topoGraphReducerName } from "modules/topologyTreeAndGraph/topologyGraph";
import { getSysconfigDeviceTypes } from "../funcs/actions";
import jp from "jsonpath";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

class TopologyGraphCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sysDevicetypes: []
        };
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentWillMount() {
        this.props.getSysconfigDeviceTypes(this.props.identify, this.siteName, "sysconfigDeviceTypes");
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.sysconfigDeviceTypes) !== JSON.stringify(nextProps.sysconfigDeviceTypes)) {
            let sysconfigDeviceTypes = nextProps.sysconfigDeviceTypes.deviceTypesData;
            let deviceTypeArr = [];
            if (sysconfigDeviceTypes) {
                let sysDevicetypes = sysconfigDeviceTypes;
                for (let j = 0; j < sysDevicetypes.length; j++) {
                    let value = JSON.parse(
                        sysDevicetypes[j]["configvals"] &&
                            sysDevicetypes[j]["configvals"][0] &&
                            sysDevicetypes[j]["configvals"][0]["configval"]
                    );
                    let icon = jp.query(value, "$..['additionalProperty'].icon")[0];
                    let deviceTypeName =
                        sysDevicetypes[j]["configvals"] && sysDevicetypes[j]["configvals"][0].configvalname;

                    let sysDevicetypeId = sysDevicetypes[j]["configname"];
                    let deviceType = {
                        deviceTypeId: sysDevicetypeId,
                        deviceTypeIcon: icon,
                        deviceTypeName: deviceTypeName
                    };
                    deviceTypeArr.push(deviceType);
                }
                this.setState({
                    sysDevicetypes: deviceTypeArr
                });
                console.log("topo graph deviceTypeArr: ", deviceTypeArr);
            }
        }
    }

    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }

    render() {
        return (
            <Card className="topo-graph-cont">
                <TopoGraph
                    identify={this.props.identify}
                    sysDevicetypes={this.state.sysDevicetypes}
                    handleFloatTabOpen={this.props.handleFloatTabOpen}
                />
            </Card>
        );
    }
}

TopologyGraphCont.propTypes = {
    identify: PropTypes.string
};

TopologyGraphCont.defaultProps = {
    identify: "topologyGraph",
    title: "Topology Graph"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        title: filterProps(state, identify, topoGraphReducerName, "title") || ownProps.title,
        sysconfigDeviceTypes: filterProps(state, identify, topoGraphReducerName, "sysconfigDeviceTypes")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        },
        getSysconfigDeviceTypes: (identify, siteName, dataType) => {
            dispatch(getSysconfigDeviceTypes(identify, siteName, dataType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyGraphCont);
