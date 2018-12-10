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
 * Created by Deng Xiaolong on 24/07/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { Select, InputLabel, Chip, Input } from "modules/common";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

const styles = theme => {
    return {
        form_control: {
            width: "100%"
        },
        select_render: {
            display: "flex",
            flexWrap: "wrap"
        },
        list_item_text: {
            textAlign: "center"
        },
        list_header: {
            display: "flex"
        },
        active_color: {
            color: theme.palette.secondary.dark
        }
    };
};

class MultipleSelect extends Component {
    static defaultProps = {
        label: "Select Some",
        selectOptions: [],
        defaultValue: [],
        identify: Math.random(),
        onSelect: () => {
        }
    };
    static propTypes = {
        label: PropTypes.string,
        selectOptions: PropTypes.array,
        defaultValue: PropTypes.array,
        onSelect: PropTypes.func.isRequired,
        identify: PropTypes.any
    };
    state = {
        activeIndex: -1
    };

    // select change
    handleChange = event => {
        const { value } = event.target;
        this.setState({
            activeIndex: -1
        });
        this.props.onSelect(value);
    };
    // delete
    handleDelete = (e, event) => {
        const { onSelect, defaultValue } = this.props;
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        defaultValue.splice(defaultValue.indexOf(e), 1);
        onSelect(defaultValue);
    };

    // the condition change
    conditonChange(e, index, event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { onSelect, selectOptions } = this.props;
        if (1 === index) return;
        this.setState({
            activeIndex: index
        });
        switch (e) {
            case "Select All":
                onSelect(selectOptions);
                break;
            case "Clear":
                onSelect([]);
                break;
            default:
                break;
        }
    };

    conditionWrapperClick = (event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };

    render() {
        const {
            label,
            identify,
            classes,
            selectOptions,
            defaultValue
        } = this.props;
        const {
            activeIndex
        } = this.state;
        return (
            <FormControl className={classes.form_control}>
                <InputLabel
                    htmlFor={`multiple_select_${identify}`}
                >
                    {label}
                </InputLabel>
                <Select
                    multiple
                    value={defaultValue}
                    onChange={this.handleChange}
                    input={<Input id={`multiple_select_${identify}`}/>}
                    renderValue={selected => (
                        <div className={classes.select_render}>
                            {selected.map(value => (
                                <Chip
                                    key={value}
                                    label={value}
                                    className={classes.select_render}
                                    deleteIcon={<Icon>clear</Icon>}
                                    onDelete={this.handleDelete.bind(this, value)}
                                />
                            ))}
                        </div>
                    )}
                >
                    <MenuItem
                        onClick={this.conditionWrapperClick.bind(this)}
                    >
                        <ListItemText
                            className={classes.list_item_text}
                            onClick={this.conditionWrapperClick.bind(this)}
                        >
                            {
                                selectOptions.length ? (
                                    <div className={classes.list_header}>
                                        {
                                            ["Select All", " - ", "Clear"].map((item, index) => {
                                                return (
                                                    <div
                                                        style={{
                                                            flex: index !== 1 ? 1 : 0,
                                                            textAlign: index === 0 ? "right" : "left",
                                                            margin: "0 2px"
                                                        }}
                                                        key={item}
                                                        onClick={this.conditonChange.bind(this, item, index)}
                                                        className={
                                                            index === activeIndex ||
                                                            (selectOptions.length === defaultValue.length
                                                                &&
                                                                index === 0) ? classes.active_color : ""
                                                        }
                                                    >{item}</div>
                                                );
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div>No Columns Selected</div>
                                )
                            }
                        </ListItemText>
                    </MenuItem>
                    {
                        selectOptions.map((item, index) => (
                            <MenuItem key={item || String(index)} value={item}>
                                <Checkbox
                                    checked={defaultValue.includes(item)}
                                />
                                <ListItemText primary={item}/>
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(MultipleSelect);
