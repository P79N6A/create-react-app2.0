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
// import TableRow from "@material-ui/core/TableRow";
import { TableRow } from "modules/common";
import { connect } from "react-redux";
import { openFloatTab, multipleChecked } from "../funcs/actions";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import _ from "lodash";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";

class TopologyListBody extends React.Component {
    state = {
        clearAllColumns: false,
        checked: this.props.checked || [],
        selected: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(this.props, nextProps)) {
            return;
        }
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
    handleEditButtonClick(iotId, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        let id = iotId.split("_")[0];
        let resourcePath = iotId.split("_")[1];
        this.setState({ selected: id });
        this.props.openFloatTab(this.props.identify, "edit", id, resourcePath);
    }

    rowSelect = (event, rowKey) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.target.nodeName === "INPUT") {
            return;
        }
        let deviceId = rowKey.split("_")[0];
        let resourceType = rowKey.split("_")[1];
        // // let geo = JSON.parse(record.Geo).features[0].geometry.coordinates;
        let geo = null;
        let selectDeviceName = rowKey.split("_")[2];
        this.setState({ selected: deviceId });
        this.props.openFloatTab(this.props.identify, "view", deviceId, resourceType, geo, selectDeviceName);
    };

    handleRowCheck(iotId, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { checked } = this.state,
            { datas } = this.props,
            checkdIndex = checked.indexOf(iotId);
        let newChecked = [],
            unChecked = true;

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

        console.log(newChecked);
        this.props.multipleChecked(this.props.identify, newChecked);
        this.setState({ checked: newChecked });
    }

    isChecked = key => this.state.checked.indexOf(key) !== -1;
    isSelected = key => {
        const { selected } = this.state,
            { floatTabType, showFloatTab } = this.props;
        return (
            selected &&
            showFloatTab &&
            key.indexOf(selected) !== -1 &&
            (floatTabType === "view" || floatTabType === "edit")
        );
    };

    render() {
        const { datas, defaultColumns, multipleSelect, pagination } = this.props,
            { clearAllColumns } = this.state,
            rowsPerPage = pagination.limit,
            page = pagination.currentpage - 1,
            emptyRows = rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);
        return (
            <TableBody className="topology-list-body" style={{ height: "calc(100% - 56px)", overflowY: "auto" }}>
                {_.map(datas, topoData => {
                    const isChecked = this.isChecked(topoData.key),
                        isSelected = this.isSelected(topoData.key),
                        disableCheck = topoData.key.split("_")[1] === "device" ? true : false;
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
                                        disabled={disableCheck}
                                        onChange={this.handleRowCheck.bind(this, topoData.key)}
                                        checked={isChecked}
                                    />
                                </TableCell>
                            )}
                            {defaultColumns.map(column => {
                                let action = false;
                                let icon = false;
                                if (column.label === "Action" && !disableCheck) {
                                    action = !action;
                                } else if (column.label === "Icon") {
                                    icon = !icon;
                                }
                                const currentUri = formatIconPath("iconInTopology", topoData[column.label][0]);
                                return (
                                    <TableCell title={topoData[column.label]} key={column.label}>
                                        {column.label === "Action" && (
                                            <IconButton
                                                disabled={!action}
                                                onClick={this.handleEditButtonClick.bind(this, topoData.key)}
                                            >
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        )}
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
        openFloatTab: (identify, floatTabType, applicationId, resourcePath, geo, applicationName) => {
            dispatch(openFloatTab(identify, floatTabType, applicationId, resourcePath, geo, applicationName));
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
