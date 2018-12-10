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
// import ReactDOM from "react-dom";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import { Chip, TextField } from "modules/common";
import { Typography, Paper, MenuItem, Tooltip, NoSsr } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    input: {
        display: "flex",
        padding: 0,
        color: theme.palette.text.primary
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        overflowX: "hidden",
        alignItems: "center"
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: theme.palette.background.paper
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: "absolute",
        left: 2,
        fontSize: 16,
        bottom:5
    },
    paper: {
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

const NoOptionsMessage = props => {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
            {props.children}
        </Typography>
    );
};

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
};

const Control = props => {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
};

const OpsContainer = props => {
    const { tooltip, children } = props;
    return tooltip ? <Tooltip title={tooltip}>{children}</Tooltip> : <React.Fragment>{children}</React.Fragment>;
};

const Option = props => {
    const { data } = props;
    return (
        <OpsContainer tooltip={data.tooltip || ""}>
            <MenuItem
                buttonRef={props.innerRef}
                selected={props.isFocused}
                component="div"
                style={{
                    fontWeight: props.isSelected ? 500 : 400
                }}
                {...props.innerProps}
            >
                {props.children}
            </MenuItem>
        </OpsContainer>
    );
};

const Placeholder = props => {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
            {props.children}
        </Typography>
    );
};

const SingleValue = props => {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
};

const ValueContainer = props => {
    const {selectProps} = props;
    return <div className={selectProps.classes.valueContainer} style={selectProps.valueContainerStyle}>{props.children}</div>;
};

const MultiValue = props => {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
};

const Menu = props => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
};

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

const customStyles = {
    input: base => ({
        ...base,
        color: "inherit",
        "& input": {
            font: "inherit"
        }
    }),
    menuPortal: base => ({
        ...base,
        zIndex: 1300
    })
};

class Selecter extends React.Component {
    render() {
        const { classes, label, className, required } = this.props;
        return (
            <div className={classNames(classes.root,className)}>
                <NoSsr>
                    <Select
                        styles={customStyles}
                        textFieldProps={{
                            label,
                            required,
                            InputLabelProps: {
                                shrink: true
                            }
                        }}
                        menuPlacement="auto"
                        menuPosition="fixed"
                        menuPortalTarget={document.body}
                        components={components}
                        {...this.props}
                        className={null}
                    />
                </NoSsr>
            </div>
        );
    }
}

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
