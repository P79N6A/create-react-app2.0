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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow } from "modules/common";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { openFloatTab, multipleChecked } from "../funcs/actions";
import Checkbox from "@material-ui/core/Checkbox";
import DateUtility from "commons/utils/dateUtility.js";
import classnames from "classnames";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import _ from "lodash";
class RuleListBody extends React.Component {
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
    handleEditButtonClick(configname, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({ selected: configname });
        const addMode = false;
        this.props.changeAddMode(addMode, this.props.identify);
        this.props.openFloatTab(configname, "edit", this.props.identify);
    }

    rowSelect(event, rowKey) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if (event.target.nodeName === "INPUT") {
            return;
        }
        const addMode = false;
        this.props.changeAddMode(addMode, this.props.identify);
        let configname = rowKey;
        this.setState({ selected: configname });
        this.props.openFloatTab(configname, "view", this.props.identify);
    }

    handleRowCheck(iotId, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { checked } = this.state;
        const checkedIndex = checked.indexOf(iotId);
        let newChecked = [];

        if (checkedIndex === -1) {
            newChecked = newChecked.concat(checked, iotId);
        } else if (checkedIndex === 0) {
            newChecked = newChecked.concat(checked.slice(1));
        } else if (checkedIndex === checked.length - 1) {
            newChecked = newChecked.concat(checked.slice(0, -1));
        } else if (checkedIndex > 0) {
            newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));
        }

        this.props.multipleChecked(this.props.identify, newChecked);
        this.setState({ checked: newChecked });
    }

    isChecked = key => this.state.checked.indexOf(key) !== -1;
    isSelected = key => {
        const { selected } = this.state;
        const { showFloatTab, addMode } = this.props;
        return selected && showFloatTab && key === selected && !addMode;
    };
    render() {
        const { datas, defaultColumns, multipleSelect, pagination } = this.props;
        const { clearAllColumns } = this.state;
        const rowsPerPage = pagination.limit;
        const page = pagination.currentpage - 1;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);
        const emptyDisplay = datas.length > 0 ? "data-display" : "empty-display";
        return (
            <TableBody className={classnames("rule-list-body", emptyDisplay)}>
                {datas &&
                    datas.map(ruleData => {
                        const isChecked = this.isChecked(ruleData.key);
                        const isSelected = this.isSelected(ruleData.key);
                        return (
                            <TableRow
                                hover
                                onClick={event => this.rowSelect(event, ruleData.key)}
                                tabIndex={-1}
                                key={ruleData.key}
                                selected={isSelected}
                            >
                                {clearAllColumns || !multipleSelect ? null : (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onChange={this.handleRowCheck.bind(this, ruleData.key)}
                                            checked={isChecked}
                                        />
                                    </TableCell>
                                )}
                                {defaultColumns.map(column => {
                                    let action = false;
                                    if (column.label === "Action") {
                                        action = !action;
                                    }
                                    if (column.label === "Last Modified") {
                                        ruleData[column.label] = DateUtility(ruleData[column.label]);
                                    }
                                    return (
                                        <TableCell title={ruleData[column.label]} key={column.label}>
                                            {action && (
                                                <IconButton
                                                    onClick={this.handleEditButtonClick.bind(this, ruleData.key)}
                                                >
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            )}
                                            {!action && <span className="rule-pre">{ruleData[column.label]}</span>}
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

RuleListBody.propTypes = {
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
        showFloatTab: filterProps(state, identify, ruleReducerName, "showFloatTab") || ownProps.showFloatTab,
        addMode: filterProps(state, identify, ruleReducerName, "addMode") || ownProps.addMode
    };
};
const mapDispatchToProps = dispatch => {
    return {
        openFloatTab: (configname, floatType, identify) => {
            dispatch(openFloatTab(configname, floatType, identify));
        },
        multipleChecked: (identify, multipleSelected) => {
            dispatch(multipleChecked(identify, multipleSelected));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleListBody);
