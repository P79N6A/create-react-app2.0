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
import PropTypes from "prop-types";
import "../styles/style.less";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow } from "modules/common";
import { connect } from "react-redux";
import { openFloatTab, multipleChecked } from "../funcs/actions";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import Tooltip from "@material-ui/core/Tooltip";
import _ from "lodash";
import { formatIconPath } from "../../topologyMgmtFloatTab/funcs/iconsNew";
// import TopoTreeDialog from "./viewTopoTreeDialog";
import $ from "jquery";

class TopologyListBody extends React.Component {
    state = {
        clearAllColumns: false,
        checked: this.props.checked || [],
        selected: undefined
    };

    componentWillReceiveProps(nextProps) {
        let defaultColumns = nextProps.defaultColumns;
        let checked = nextProps.checked;
        if (!defaultColumns.length) {
            this.setState({
                clearAllColumns: true,
                checked
            });
        } else {
            this.setState({
                clearAllColumns: false,
                checked
            });
        }
    }

    rowSelect(event, rowKey, deviceIcon) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.target.nodeName === "INPUT" || $(event.target).parent(".tree-dialog").length) {
            return;
        }
        this.handleOpenFloatTab("view", rowKey, deviceIcon);
    }

    handleRowCheck(iotId, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { checked } = this.state;
        const { datas } = this.props;
        const checkdIndex = checked.indexOf(iotId);
        let newChecked = [];
        let unChecked = true;

        if (checkdIndex === -1) {
            newChecked = newChecked.concat(checked, iotId);
            unChecked = false;
        } else if (checkdIndex === 0) {
            newChecked = newChecked.concat(checked.slice(1));
        } else if (checkdIndex === checked.length - 1) {
            newChecked = newChecked.concat(checked.slice(0, -1));
        } else if (checkdIndex > 0) {
            newChecked = newChecked.concat(checked.slice(0, checkdIndex), checked.slice(checkdIndex + 1));
        }

        let selectedAllData = true;
        _.forEach(datas, data => {
            let find = false;
            _.forEach(newChecked, check => {
                if (data.key === check) {
                    find = true;
                }
            });
            if (!find) {
                selectedAllData = false;
            }
        });

        if (!unChecked && selectedAllData) {
            this.props.unCheckedRows(true);
        } else {
            this.props.unCheckedRows(false);
        }

        this.props.multipleChecked(this.props.identify, newChecked);
        this.setState({ checked: newChecked });
    }

    isChecked = key => this.state.checked.indexOf(key) !== -1;
    isSelected = key => {
        const { selected } = this.state;
        const { floatTabType, showFloatTab } = this.props;
        return (
            selected &&
            showFloatTab &&
            key.indexOf(selected) !== -1 &&
            (floatTabType === "view" || floatTabType === "edit" || floatTabType === "subDevice")
        );
    };

    handleEditButtonClick(iotId, deviceIcon, hasParentDevice, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.handleOpenFloatTab("edit", iotId, deviceIcon, hasParentDevice);
    }

    handleOpenFloatTab = (floatTabType, rowKey, deviceIcon, hasParentDevice) => {
        let id = rowKey.split("_")[0];
        let resourcePath = rowKey.split("_")[1];
        let geo = null;
        let selectDeviceName = rowKey.split("_")[2];
        let addressIotId = rowKey.split("_")[3];
        let addressName = rowKey.split("_")[4];
        let deviceModelId = rowKey.split("_")[5];
        this.setState({ selected: id });
        this.props.openFloatTab(
            this.props.identify,
            floatTabType,
            id,
            resourcePath,
            geo,
            selectDeviceName,
            addressIotId,
            addressName,
            deviceModelId,
            deviceIcon,
            hasParentDevice
        );
    };

    handleSubTaskButtonClick = (iotId, hasParentDevice, event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (hasParentDevice !== "disabled") {
            this.handleOpenFloatTab("subDevice", iotId);
        }
    };

    handlePropertyButtonClick = (iotId, event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.handleOpenFloatTab("property", iotId);
    };

    handleLayerButtonClick = (iotId, event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({
            selectTree: iotId
        });
    };

    handleCloseAppTreeDialog(schemaKey, selectAppId, selectAppName) {
        this.setState({
            selectTree: ""
        });
    }

    render() {
        const { datas, defaultColumns, multipleSelect, pagination, checkedTab } = this.props;
        const { clearAllColumns } = this.state;
        const rowsPerPage = pagination.limit;
        const page = pagination.currentpage - 1;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);
        return (
            <TableBody className="topology-list-body" style={{ height: "calc(100% - 56px)", overflowY: "auto" }}>
                {datas &&
                    datas.map(topoData => {
                        const isChecked = this.isChecked(topoData.key);
                        const isSelected = this.isSelected(topoData.key);
                        // const currentDevice = {
                        //     deviceName: topoData["Device Name"] && topoData["Device Name"][0],
                        //     deviceId: topoData["key"].split("_")[0]
                        // };
                        const deviceIcon = (topoData["Icon"] && topoData["Icon"][0]) || "default";
                        const hasParentDevice =
                            topoData["Parent Device"] && topoData["Parent Device"][0] ? "disabled" : "inherit";
                        return (
                            <TableRow
                                hover
                                onClick={event => this.rowSelect(event, topoData.key, deviceIcon)}
                                tabIndex={-1}
                                key={topoData.key}
                                selected={isSelected}
                            >
                                {clearAllColumns || !multipleSelect ? null : (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onChange={this.handleRowCheck.bind(this, topoData.key)}
                                            checked={isChecked}
                                        />
                                    </TableCell>
                                )}
                                {defaultColumns.map(column => {
                                    let action = false;
                                    let icon = false;
                                    if (column.label === "Action") {
                                        action = !action;
                                    } else if (column.label === "Icon") {
                                        icon = !icon;
                                    }
                                    let currentUri = formatIconPath("iconInTopology", topoData[column.label][0]);
                                    return (
                                        <TableCell title={topoData[column.label]} key={column.label}>
                                            {action && (
                                                <div>
                                                    {!checkedTab && (
                                                        <span>
                                                            {/* <Tooltip title="Tree">
                                                                <div
                                                                    style={{
                                                                        display: "inline-block"
                                                                    }}
                                                                >
                                                                    <IconButton
                                                                        onClick={this.handleLayerButtonClick.bind(
                                                                            this,
                                                                            topoData.key
                                                                        )}
                                                                    >
                                                                        <Icon>layers</Icon>
                                                                    </IconButton>
                                                                    <TopoTreeDialog
                                                                        open={
                                                                            topoData.key === this.state.selectTree
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        onClose={this.handleCloseAppTreeDialog.bind(
                                                                            this
                                                                        )}
                                                                        currentDevice={currentDevice}
                                                                        needDefaultSelect={false}
                                                                        selectAppName={topoData["Device Name"]}
                                                                    />
                                                                </div>
                                                            </Tooltip> */}
                                                            <Tooltip title="Sub-Device">
                                                                <IconButton
                                                                    onClick={this.handleSubTaskButtonClick.bind(
                                                                        this,
                                                                        topoData.key,
                                                                        hasParentDevice
                                                                    )}
                                                                >
                                                                    <Icon color={hasParentDevice}>link</Icon>
                                                                </IconButton>
                                                            </Tooltip>
                                                            {/* <Tooltip title="property">
                                                                <IconButton
                                                                    onClick={this.handlePropertyButtonClick.bind(
                                                                        this,
                                                                        topoData.key
                                                                    )}
                                                                >
                                                                    <Icon>details</Icon>
                                                                </IconButton>
                                                            </Tooltip> */}
                                                        </span>
                                                    )}
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            onClick={this.handleEditButtonClick.bind(
                                                                this,
                                                                topoData.key,
                                                                deviceIcon,
                                                                hasParentDevice
                                                            )}
                                                        >
                                                            <Icon>edit</Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            )}
                                            {/* {icon && <Icon>{topoData[column.label]}</Icon>} */}
                                            {icon && currentUri && (
                                                <img
                                                    alt={currentUri.alt}
                                                    src={currentUri.uri}
                                                    title={currentUri.title}
                                                    width="36"
                                                    height="36"
                                                />
                                            )}
                                            {!action && !icon && (
                                                <span className="topology-pre">{topoData[column.label]}</span>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} style={{ borderBottom: "none" }} />
                    </TableRow>
                )}
            </TableBody>
        );
    }
}

TopologyListBody.propTypes = {
    datas: PropTypes.array.isRequired,
    defaultColumns: PropTypes.array.isRequired,
    showFloatTab: PropTypes.bool,
    floatTabType: PropTypes.string
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        showFloatTab: filterProps(state, identify, topoReducerName, "showFloatTab") || ownProps.showFloatTab,
        floatTabType: filterProps(state, identify, topoReducerName, "floatTabType") || ownProps.floatTabType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openFloatTab: (
            identify,
            floatTabType,
            deviceId,
            resourcePath,
            geo,
            deviceName,
            addressIotId,
            addressName,
            deviceModelId,
            deviceIcon,
            hasParentDevice
        ) => {
            dispatch(
                openFloatTab(
                    identify,
                    floatTabType,
                    deviceId,
                    resourcePath,
                    geo,
                    deviceName,
                    addressIotId,
                    addressName,
                    deviceModelId,
                    deviceIcon,
                    hasParentDevice
                )
            );
        },
        multipleChecked: (identify, multipleSelected) => {
            dispatch(multipleChecked(identify, multipleSelected));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyListBody);
