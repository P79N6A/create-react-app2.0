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
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Select, InputLabel } from "modules/common";
import { topologyTypeRequest, selectDeviceTypeFunc, getDeviceTypeDetail } from "../funcs/actions";
import ListItem from "@material-ui/core/ListItem";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const styles = theme => ({
    paper: {},
    root: { backgroundColor: theme.palette.background.paper }
});

class SelectDeviceType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: this.props.devicetypeId || ""
        };
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentDidMount() {
        this.props.searchTopoType(this.props.identify);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // get current all device types
        if (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab) {
            this.props.searchTopoType(this.props.identify);
            this.setState(
                Object.assign(this.state, {
                    currentSelect: ""
                })
            );
        }
        // set currentSelect when select a device type
        if (this.props.devicetypeId !== nextProps.devicetypeId && nextProps.devicetypeId) {
            this.setState(
                Object.assign(this.state, {
                    currentSelect: nextProps.devicetypeId
                })
            );
        }
    }

    handleSelectClick(event) {
        let datas = this.props.topoTypeData;
        let devicetypeName = "";
        let devicetypeId = event.target.value;
        for (var i = 0; i < datas.length; i++) {
            if (event.target.value === datas[i]["devicemodel.iotTopologyId"]) {
                devicetypeName = datas[i]["devicemodel.displayName"];
            }
        }
        this.setState(
            Object.assign(this.state, {
                currentSelect: devicetypeId
            })
        );
        this.props.selectDeviceTypeFunc(this.props.identify, devicetypeName, devicetypeId);
        this.props.getDeviceTypeDetail(this.props.identify, devicetypeId, this.siteName);
    }

    render() {
        return (
            <div>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <FormControl
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                    >
                        <InputLabel htmlFor="select-multiple-checkbox">Device Type</InputLabel>
                        <Select value={this.state.currentSelect} onChange={this.handleSelectClick.bind(this)} required>
                            {this.props.topoTypeData &&
                                this.props.topoTypeData.map(item => (
                                    <MenuItem
                                        key={item["devicemodel.iotTopologyId"]}
                                        value={item["devicemodel.iotTopologyId"] || ""}
                                    >
                                        <ListItemText primary={item["devicemodel.displayName"]} />
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </ListItem>
            </div>
        );
    }
}

SelectDeviceType.propTypes = {};

SelectDeviceType.defaultProps = {
    selectDevicetype: ""
};

const filterProps = (state, identify, props) => {
    if (state[topoFloatTabReducer] && state[topoFloatTabReducer][identify]) {
        return state[topoFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        topoTypeData: filterProps(state, identify, "topoTypeData"),
        selectDevicetype: filterProps(state, identify, "selectDevicetype"),
        devicetypeId: filterProps(state, identify, "devicetypeId")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchTopoType: identify => {
            dispatch(topologyTypeRequest(identify));
        },
        selectDeviceTypeFunc: (identify, selectDeviceType, devicetypeId) => {
            dispatch(selectDeviceTypeFunc(identify, selectDeviceType, devicetypeId));
        },
        getDeviceTypeDetail: (identify, selectDeviceId, siteName) => {
            dispatch(getDeviceTypeDetail(identify, selectDeviceId, siteName));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SelectDeviceType));
