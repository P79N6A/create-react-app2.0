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
 * Created by KaiDi on 25/05/2018.
 */

import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import { Chip, TextField } from "modules/common";
import { Typography, Checkbox, MenuItem, Tooltip } from "@material-ui/core";
// import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import classnames from "classnames";
import "../../styles/searchSelect.less";
let multi = false;
let timer = null;
const menuHeight = 4.5 * 50;
// const ITEM_HEIGHT = 48;
const styles = Theme => ({
    root: {
        flexGrow: 1
    },
    chip: {
        margin: Theme.spacing.unit / 4
    },
    "@global": {
        ".iscSearchSelect .Select-noresults": {
            padding: Theme.spacing.unit * 2
        },
        ".iscSearchSelect .Select-placeholder, .Select--single .Select-value": {
            fontFamily: Theme.typography.fontFamily,
            fontSize: Theme.typography.pxToRem(16)
        },
        ".iscSearchSelect .Select-placeholder": {
            color: Theme.palette.text.primary
        },
        ".iscSearchSelect .Select-menu-outer": {
            backgroundColor: Theme.palette.background.paper,
            boxShadow: Theme.shadows[8],
            // top: `calc(100% + ${Theme.spacing.unit}px)`,
            left: `${Theme.spacing.unit}px`,
            width: `calc(100% - ${2 * Theme.spacing.unit}px)`
        },
        ".iscSearchSelect .Select-clear-zone": {
            color: Theme.palette.action.active
        },
        ".iscSearchSelect .Select-arrow-zone": {
            color: Theme.palette.text.secondary
        }
    }
});

const Ops = props => {
    const { tooltip, children } = props;
    return tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : <React.Fragment>{children}</React.Fragment>;
};

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus, option } = this.props;
        return (
            <Ops tooltip={option.tooltip || ""}>
                <MenuItem
                    onFocus={onFocus}
                    selected={isSelected}
                    onClick={this.handleClick}
                    component="div"
                    style={{
                        fontWeight: isFocused ? 500 : 400
                    }}
                >
                    {multi ? <Checkbox checked={isSelected} /> : null}
                    {children}
                </MenuItem>
            </Ops>
        );
    }
}

class SelectWrapped extends React.Component {
    state = { top: 0,width:200,left:0 };
    onOpen = () => {
        const dom = ReactDOM.findDOMNode(this.refs.searchSelectInput);
        const client = dom.getBoundingClientRect();
        const bottom = document.body.clientHeight - client.bottom;
        const clientTop = client.top + client.height;
        const top = bottom > menuHeight ? clientTop : clientTop - menuHeight;
        this.setState({ top,width:client.width+20,left:client.left });
    };
    render() {
        const { classes,setLeft, ...other } = this.props;
        const { top,width,left } = this.state;
        const contianerStyle = setLeft?{top,width,left}:{top,width};
        return (
            <Select
                ref="searchSelectInput"
                optionComponent={Option}
                noResultsText={<Typography>{"No results found"}</Typography>}
                arrowRenderer={arrowProps => {
                    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
                }}
                clearRenderer={() => <ClearIcon />}
                filterOptions={options => options}
                onOpen={this.onOpen}
                menuContainerStyle={contianerStyle}
                valueComponent={valueProps => {
                    const { value, children, onRemove } = valueProps;

                    const onDelete = event => {
                        event.preventDefault();
                        event.stopPropagation();
                        onRemove(value);
                    };

                    if (onRemove) {
                        return (
                            <Chip
                                tabIndex={-1}
                                label={children}
                                className={classes.chip}
                                // deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                                onDelete={onDelete}
                            />
                        );
                    }

                    return <div className="Select-value">{children}</div>;
                }}
                {...other}
            />
        );
    }
}

const Selecter = props => {
    let {
        classes,
        placeholder,
        onSearch,
        options,
        value,
        selectProps,
        label,
        onChange,
        required,
        tooltip,
        ...otherProps
    } = props;
    multi = selectProps.multi;
    return (
        <div className={classnames(classes.root, "iscSearchSelect")}>
            <Tooltip title={tooltip || ""}>
                <TextField
                    fullWidth
                    onChange={onChange}
                    placeholder={placeholder}
                    name="react-select-chip-label"
                    label={label}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required={required}
                    InputProps={{
                        inputComponent: SelectWrapped,
                        inputProps: {
                            classes,
                            onInputKeyDown: evt => {
                                let target = evt.target;
                                clearTimeout(timer);
                                timer = setTimeout(() => {
                                    onSearch(target.value);
                                }, 500);
                            },
                            options,
                            value,
                            ...selectProps
                        }
                    }}
                    {...otherProps}
                />
            </Tooltip>
        </div>
    );
};

Selecter.propTypes = {
    classes: PropTypes.object,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array,
    selectProps: PropTypes.object
};

export default withStyles(styles)(Selecter);
