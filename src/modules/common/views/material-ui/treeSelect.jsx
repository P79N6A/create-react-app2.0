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
 * Created by Wangrui on 25/06/2018.
 */
import React from "react";
import { connect } from "react-redux";
// import {theme as Theme} from "modules/theme";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { Select, Chip, InputLabel, Input } from "modules/common";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";

const styles = Theme => {
    return {
        active: {
            color: Theme.palette.secondary.dark
        },
        inactive: {
            color: ""
        }
    };
};

class CommonSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: [],
            activeColor: true
        };
    }

    componentWillMount() {
        let selectItems = this.props.selectItems;
        if (!selectItems) {
            return;
        }
        let currentSelect = [];
        for (let i = 0; i < selectItems.length; i++) {
            if (selectItems[i].defaultSelect) {
                currentSelect.push(selectItems[i].columnName);
            }
        }

        this.setState({
            currentSelect: currentSelect
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectItems !== nextProps.selectItems) {
            let currentSelect = [];
            let selectItems = nextProps.selectItems;
            for (let i = 0; i < selectItems.length; i++) {
                if (selectItems[i].defaultSelect) {
                    currentSelect.push(selectItems[i].columnName);
                }
            }

            this.setState({
                currentSelect: currentSelect
            });
        }
    }

    handleSelectClick(event) {
        let keyWord = event.nativeEvent.target.getAttribute("data-key");
        let selectItems = this.props.selectItems;
        let currentSelect = [];
        if (!selectItems) {
            return;
        }
        if (keyWord === "all") {
            for (let i = 0; i < selectItems.length; i++) {
                currentSelect.push(selectItems[i].columnName);
            }
            this.setState(
                Object.assign(this.state, {
                    activeColor: true,
                    currentSelect: currentSelect
                })
            );
        } else if (keyWord === "clear") {
            this.setState(
                Object.assign(this.state, {
                    activeColor: false,
                    currentSelect: currentSelect
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    currentSelect: event.target.value
                })
            );
        }
        this.props.handleColumnSelectChange(this.props.selectTypeName, this.state.currentSelect);
    }

    handleDelete(deleteValue) {
        let selected = this.state.currentSelect;
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === deleteValue) {
                selected.splice(i, 1);
            }
        }
        this.setState(
            Object.assign(this.state, {
                currentSelect: selected
            })
        );
        this.props.handleColumnSelectChange(this.props.selectTypeName, selected);
    }

    render() {
        const { activeColor } = this.state;
        const { classes } = this.props;
        // const active = activeColor ? Theme.palette.secondary.dark : "";
        // const inactive = activeColor ? "" : Theme.palette.secondary.dark;
        // const { classes } = this.props;
        return (
            <FormControl
                style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap"
                }}
                // className={classes.formControl}
            >
                <InputLabel htmlFor="select-multiple-checkbox">{this.props.selectTypeName}</InputLabel>
                <Select
                    multiple
                    value={this.state.currentSelect}
                    onChange={this.handleSelectClick.bind(this)}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap"
                            }}
                        >
                            {selected.map(value => (
                                <Chip
                                    key={value}
                                    label={value}
                                    // className={classes.chip}
                                    // classes={{
                                    //     deleteIcon: classes.deleteIcon,
                                    //     root: classes.root,
                                    //     deletable: classes.deletable
                                    // }}
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap"
                                    }}
                                    deleteIcon={<Icon>clear</Icon>}
                                    onDelete={this.handleDelete.bind(this, value)}
                                />
                            ))}
                        </div>
                    )}
                >
                    <MenuItem key="all-clear" value="all-clear">
                        <ListItemText style={{ textAlign: "center" }}>
                            <span
                                data-key="all"
                                className={activeColor ? classes.active : classes.inactive}
                                // style={{ color: active }}
                            >
                                Select All
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span
                                data-key="clear"
                                className={activeColor ? classes.active : classes.inactive}
                                // style={{ color: inactive }}
                            >
                                Clear
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {this.props.selectItems &&
                        this.props.selectItems.map(item => (
                            <MenuItem key={item.columnName} value={item.columnName}>
                                <Checkbox
                                    checked={
                                        this.state.currentSelect &&
                                        this.state.currentSelect.indexOf(item.columnName) > -1
                                    }
                                />
                                <ListItemText primary={item.columnName} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        );
    }
}

CommonSelect.defaultProps = {};

const mapDispatchToProps = dispatch => {
    return {
        // ccmsControlProps: (identify, columnConfig, filterConfig) => {
        //     dispatch(ccmsControl(identify, columnConfig, filterConfig));
        // }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(CommonSelect));
