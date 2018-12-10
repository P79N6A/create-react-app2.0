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
import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";

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

    rowSelect(event, rowKey) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.target.nodeName === "INPUT") {
            return;
        }
        let deviceId = rowKey.split("_")[0];
        let resourcePath = rowKey.split("_")[1];
        // // let geo = JSON.parse(record.Geo).features[0].geometry.coordinates;
        let geo = null;
        let selectDeviceName = rowKey.split("_")[2];
        this.setState({ selected: deviceId });
        this.props.openFloatTab(deviceId, resourcePath, geo, selectDeviceName, this.props.identify);
    }

    handleRowCheck(iotId, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { checked } = this.state;
        const checkdIndex = checked.indexOf(iotId);
        let newChecked = [];

        if (checkdIndex === -1) {
            newChecked = newChecked.concat(checked, iotId);
        } else if (checkdIndex === 0) {
            newChecked = newChecked.concat(checked.slice(1));
        } else if (checkdIndex === checked.length - 1) {
            newChecked = newChecked.concat(checked.slice(0, -1));
        } else if (checkdIndex > 0) {
            newChecked = newChecked.concat(checked.slice(0, checkdIndex), checked.slice(checkdIndex + 1));
        }

        this.props.multipleChecked(this.props.identify, newChecked);
        this.setState({ checked: newChecked });
    }

    isChecked = key => this.state.checked.indexOf(key) !== -1;
    isSelected = key => {
        const { selected } = this.state;
        const { showFloatTab } = this.props;
        return selected && showFloatTab && key.indexOf(selected) !== -1;
    };

    render() {
        const { datas, defaultColumns, multipleSelect, pagination } = this.props;
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
                        return (
                            <TableRow
                                hover
                                onClick={event => this.rowSelect(event, topoData.key)}
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
                                    let icon = false;
                                    if (column.label === "Icon") {
                                        icon = !icon;
                                    }
                                    let currentUri = formatIconPath("iconInTopology", topoData[column.label][0]);
                                    return (
                                        <TableCell title={topoData[column.label]} key={column.label}>
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
                                            {!icon && <span className="topology-pre">{topoData[column.label]}</span>}
                                            {/* {topoData[column.label]} */}
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
    showFloatTab: PropTypes.bool
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        showFloatTab: filterProps(state, identify, topoReducerName, "showFloatTab") || ownProps.showFloatTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openFloatTab: (deviceId, resourcePath, geo, deviceName, identify) => {
            dispatch(openFloatTab(deviceId, resourcePath, geo, deviceName, identify));
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
