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
import TopoTree from "./topoTree";
// import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { topoTreeReset } from "../funcs/actions";
import { reducerName as topoTreeReducerName } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import { getSysconfigDeviceTypes } from "../funcs/actions";
import jp from "jsonpath";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

class TopologyTreeCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sysDevicetypes: []
        };
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
        this.props.getSysconfigDeviceTypes(this.props.identify, this.siteName, "sysconfigDeviceTypes");
    }

    componentWillMount() {
        // this.props.getSysconfigDeviceTypes(this.props.identify, this.siteName, "sysconfigDeviceTypes");
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.needReset !== nextProps.needReset && !nextProps.resetTopoTree) {
            this.props.topoTreeReset(this.props.identify);
        }
        if (JSON.stringify(this.props.sysconfigDeviceTypes) !== JSON.stringify(nextProps.sysconfigDeviceTypes)) {
            let sysconfigDeviceTypes = nextProps.sysconfigDeviceTypes;
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

                    let sysDevicetypeId = sysDevicetypes[j]["configname"];
                    let deviceType = {
                        deviceTypeId: sysDevicetypeId,
                        deviceTypeIcon: icon
                    };
                    deviceTypeArr.push(deviceType);
                }
                this.setState({
                    sysDevicetypes: deviceTypeArr
                });
                console.log("topo tree deviceTypeArr: ", deviceTypeArr);
            }
        }
    }
    getSelectNodeFunc = selectNode => {
        this.props.getSelectNodeFunc && this.props.getSelectNodeFunc(selectNode);
    };

    render() {
        const {
            identify,
            treeMode,
            pagination,
            needDefaultSelect,
            currentDevice,
            disableSearch,
            selectAppId,
            selectAppRespath
        } = this.props;
        const { sysDevicetypes } = this.state;
        return (
            <div className="topo-tree-cont">
                <TopoTree
                    identify={identify}
                    getCurrentSelectNode={this.getSelectNodeFunc.bind(this)}
                    treeMode={treeMode}
                    pagination={pagination}
                    needDefaultSelect={needDefaultSelect}
                    currentDevice={currentDevice}
                    disableSearch={disableSearch}
                    sysDevicetypes={sysDevicetypes}
                    selectAppId={selectAppId}
                    selectAppRespath={selectAppRespath}
                />
            </div>
        );
    }
}

TopologyTreeCont.propTypes = {
    identify: PropTypes.string
};

TopologyTreeCont.defaultProps = {
    identify: "topologyTree",
    title: "Topology Filter",
    treeMode: "device",
    needDefaultSelect: true,
    pagination: {
        totalrecords: 10,
        limit: 20,
        currentpage: 1
    },
    currentDevice: "",
    disableSearch: false
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        title: filterProps(state, identify, topoTreeReducerName, "title") || ownProps.title,
        resetTopoTree: filterProps(state, identify, topoTreeReducerName, "resetTopoTree"),
        sysconfigDeviceTypes: filterProps(state, identify, topoTreeReducerName, "sysconfigDeviceTypes")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        topoTreeReset: identify => {
            dispatch(topoTreeReset(identify));
        },
        getSysconfigDeviceTypes: (identify, siteName, dataType) => {
            dispatch(getSysconfigDeviceTypes(identify, siteName, dataType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyTreeCont);
