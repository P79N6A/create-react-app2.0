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
import {theme as Theme} from "modules/theme";
import "../../styles/sop.less";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { Select, Chip, InputLabel, Input } from "modules/common";
import Icon from "@material-ui/core/Icon";

class CommonSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: [],
            activeColor: true,
        };
    }

    componentWillMount() {
        let selectItems = this.props.selectItems;
        if (!selectItems) {
            return;
        }
        let currentSelect = [];
        for (let i = 0; i < selectItems.length; i++) {
            if (selectItems[i].show) {
                currentSelect.push(selectItems[i].label);
            }
        }

        this.setState({
            currentSelect: currentSelect
        });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.selectItems !== nextProps.selectItems){
            let currentSelect = [];
            let selectItems = nextProps.selectItems;
            for (let i = 0; i < selectItems.length; i++) {
                if (selectItems[i].show) {
                    currentSelect.push(selectItems[i].label);
                }
            }

            this.setState({
                currentSelect: currentSelect,
            });
        }
        // if (
        //     this.props.selectItems !== nextProps.selectItems &&
        //     nextProps.selectTypeName === "Default Selected Columns"
        // ) {
        //     let currentSelect = [];
        //     let selectItems = nextProps.selectItems;
        //     for (let i = 0; i < selectItems.length; i++) {
        //         if (selectItems[i].show) {
        //             currentSelect.push(selectItems[i].label);
        //         }
        //     }

        //     this.setState({
        //         currentSelect: currentSelect
        //     });
        // }
    }

    handleSelectClick(event) {
        // console.log(event);
        let keyWord = event.nativeEvent.target.getAttribute("data-key");
        let selectItems = this.props.selectItems;
        let currentSelect = [];
        if (!selectItems) {
            return;
        }
        if (keyWord === "all") {
            for (let i = 0; i < selectItems.length; i++) {
                currentSelect.push(selectItems[i].label);
            }
            this.setState(
                Object.assign(this.state, {
                    activeColor: true,
                    currentSelect: currentSelect
                })
            );
        } else if (keyWord === "clear") {
            for (let i = 0; i < selectItems.length; i++) {
                currentSelect = [];
            }
            this.setState(
                Object.assign(this.state, {
                    activeColor: false,
                    currentSelect: currentSelect
                })
            );
        } else {
            let k = event.target.value;
            this.setState(
                Object.assign(this.state, {
                    currentSelect: k
                })
            );
        }
        // console.log(this.state.currentSelect);
        this.props.handleColumnSelectChange(this.props.selectTypeName, keyWord, event.target.value);
    }

    handleDelete(deleteValue) {
        let selected = this.state.currentSelect;
        // console.log(selected);
        // console.log(deleteValue);
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === deleteValue) {
                // selected.splice(i, 1);
                selected.splice(i, 1);
            }
        }
        this.setState(
            Object.assign(this.state, {
                currentSelect: selected
            })
        );
        this.props.handleColumnSelectChange(this.props.selectTypeName, "delet", deleteValue);
    }
    handleChange = indexKey => {
        // console.log(this.props.selectItems);
        // console.log(this.props.selectItems);
        let select  = this.props.selectItems;
        select.map(n => {
            if(n.label === indexKey ){
                n.show = !n.show;
            }
            return null;
        });
        this.props.handlecolumnConfigSelectChange(this.props.selectTypeName, select);
    };
    columnCheck(Boolean){
        if(Boolean){
            return true;
        }else{
            return false;
        }
    }
    render() {
        const { activeColor } = this.state;
        const active = activeColor ? Theme.palette.secondary.dark : "";
        const inactive = activeColor ? "" : Theme.palette.secondary.dark;
        // const { classes } = this.props;
        return (
            <FormControl
                style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap"
                }}
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
                            <span data-key="all" style={{ color: active }}>
                                Select All
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span data-key="clear" style={{ color: inactive }}>
                                Clear
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {this.props.selectItems &&
                        this.props.selectItems.map(item => (
                            // console.log(item),
                            <MenuItem key={item.indexKey} value={item.label}>
                                <Checkbox
                                    onChange={this.handleChange.bind(this, item.label)}
                                    checked={
                                        this.columnCheck(item.show)
                                    }
                                />
                                <ListItemText primary={item.label} />
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
)(CommonSelect);
