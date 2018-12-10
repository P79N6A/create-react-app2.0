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
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { columnFilterChange } from "../funcs/actions";
import ColumnFilterMapping from "../columnFilterMapping";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: "100%"
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

class ColumnFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: this.props.columnConfig,
            defaultSelectColumns: [],
            selectedColumns: []
        };
    }

    componentWillMount() {
        let { defaultSelectColumns, selectedColumns, currentSelect } = this.configColumnsData(ColumnFilterMapping, this.props.columnConfig);

        this.setState({
            currentSelect: currentSelect,
            defaultSelectColumns: defaultSelectColumns,
            selectedColumns: selectedColumns
        });
        this.props.columnFilterChange(this.props.identify, defaultSelectColumns);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.columnConfig) {
            let { defaultSelectColumns, selectedColumns, currentSelect } = this.configColumnsData(ColumnFilterMapping, newProps.columnConfig);

            this.setState({
                currentSelect: currentSelect,
                defaultSelectColumns: defaultSelectColumns,
                selectedColumns: selectedColumns
            });
            this.props.columnFilterChange(this.props.identify, defaultSelectColumns);
        }
    }

    configColumnsData(columnsArr, columnConfig) {
        let defaultSelectColumns = [];
        let selectedColumns = [];
        let currentSelect = [];
        let stateSelect = columnConfig;
        for (let j = 0; j < stateSelect.length; j++) {
            for (let i = 0; i < columnsArr.length; i++) {
                if (stateSelect[j].columnName === columnsArr[i].columnName) {
                    if (stateSelect[j].defaultSelect) {
                        defaultSelectColumns.push(columnsArr[i].columnConfig);
                        currentSelect.push(columnsArr[i].columnName);
                    } else {
                        selectedColumns.push(columnsArr[i].columnConfig);
                    }
                }
            }
        }
        return { defaultSelectColumns, selectedColumns, currentSelect };
    }

    handleChange(event) {
        this.setState({ currentSelect: event.target.value });
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        let selectValue = event.target.value;
        let currentColumns = [];
        for (let i = 0; i < selectValue.length; i++) {
            for (let j = 0; j < ColumnFilterMapping.length; j++) {
                if (selectValue[i] === ColumnFilterMapping[j].columnName) {
                    currentColumns.push(ColumnFilterMapping[j].columnConfig);
                }
            }
        }
        for (let i = 0; i < currentColumns.length; i++) {
            currentColumns[i].width = (1 / currentColumns.length) * 100 + "%";
        }
        this.props.columnFilterChange(this.props.identify, currentColumns);
    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Columns</InputLabel>
                <Select
                    multiple
                    value={this.state.currentSelect}
                    onChange={this.handleChange.bind(this)}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {this.state.defaultSelectColumns &&
                        this.state.defaultSelectColumns.map(item => (
                            <MenuItem key={item.id} value={item.label}>
                                <Checkbox checked={this.state.currentSelect.indexOf(item.label) > -1} />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                    {this.state.selectedColumns &&
                        this.state.selectedColumns.map(item => (
                            <MenuItem key={item.id} value={item.label}>
                                <Checkbox checked={this.state.currentSelect.indexOf(item.label) > -1} />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        columnFilterChange: (identify, currentColumns) => {
            dispatch(columnFilterChange(identify, currentColumns));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ColumnFilter));
