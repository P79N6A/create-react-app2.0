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
 * Created by SongCheng on 20/05/2018.
 */
import React from "react";
import "../styles/style.less";

import { Dropdown } from "antd";
import { RangePicker } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { Select, Input } from "modules/common/index";

// const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const styles = theme => ({
    dropDown: {
        padding: "10px",
        backgroundColor: theme.palette.background.paper,
        boxShadow:
            "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)"
    },
    clickable: {
        "&:focus": {
            background: theme.palette.primary.dark
        }
    },
    deleteIcon: {
        color: theme.palette.secondary.main,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    root: {
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            background: theme.palette.primary.dark
        },
        "&:active": {
            background: theme.palette.primary.dark
        }
    },
    deletable: {
        "&:focus": {
            background: theme.palette.primary.dark
        }
    }
});

class FilterItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            optionSelect: "EQ",
            inpValue: "",
            inpName: "",
            startDate: "",
            endDate: "",
            severity: "1",
            anchorEl: null
        };
    }

    handleVisibleChange = flag => {
        this.setState({ visible: flag });
    };

    //package generateBasic() data
    handleTypeChange = (num, e) => {
        let key = num;
        this.setState(
            {
                visible: true,
                optionSelect: e.target.value,
                [e.target.name]: e.target.value
            },
            () => {
                let inpValueT = null;
                if (this.state.optionSelect === "IN") {
                    inpValueT = this.state.inpValue.split(",");
                } else {
                    inpValueT = this.state.inpValue;
                }
                this.props.content[key] = {
                    key: key,
                    field: this.props.fieldValue,
                    option: e.target.value,
                    inpValue: inpValueT
                };
                this.props.handleSubmit();
            }
        );
    };
    handleInput = (num, e) => {
        let key = num;
        this.setState({ inpValue: e.target.value }, () => {
            let inpValueT = null;
            if (this.state.optionSelect === "IN") {
                inpValueT = this.state.inpValue.split(",");
            } else {
                inpValueT = this.state.inpValue;
            }
            this.props.content[key] = {
                key: key,
                field: this.props.fieldValue,
                option: this.state.optionSelect,
                inpValue: inpValueT
            };
            this.props.handleSubmit();
        });
    };
    //package generateParameters() data
    handleParametersInputName = e => {
        let key = this.props.number;
        this.setState({ inpName: e.target.value }, () => {
            this.props.content[key] = {
                key: key,
                field: this.props.fieldValue,
                option: "LIKE",
                valType: "string",
                inpName: this.state.inpName,
                inpValue: this.state.inpValue
            };
            this.props.handleSubmit();
        });
    };
    handleParametersInput = e => {
        let key = this.props.number;
        this.setState({ inpValue: e.target.value }, () => {
            this.props.content[key] = {
                key: key,
                field: this.props.fieldValue,
                option: "LIKE",
                valType: "string",
                inpName: this.state.inpName,
                inpValue: this.state.inpValue
            };
            this.props.handleSubmit();
        });
    };

    //package generateSentdatetime() data
    handleCalendar = date => {
        let key = this.props.number;
        this.setState(
            {
                startDate: date[0] && date[0]._d.toISOString().replace("Z", "+0000"),
                endDate: date[1] && date[1]._d.toISOString().replace("Z", "+0000")
            },
            () => {
                this.props.content[key] = {
                    key: key,
                    field: this.props.fieldValue,
                    option: "LIKE",
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                };
                this.props.handleSubmit();
            }
        );
    };

    //package generateSeverity() data
    handleSeverityChange = e => {
        let key = this.props.number;
        this.setState(
            {
                visible: true,
                severity: e.target.value,
                optionSelect: e.target.value,
                [e.target.name]: e.target.value
            },
            () => {
                this.props.content[key] = {
                    key: key,
                    field: this.props.fieldValue,
                    option: "EQ",
                    severityNum: this.state.severity
                };
                this.props.handleSubmit();
            }
        );
    };

    //delete this query condition
    handleRemoveItem = e => {
        this.props.RemoveItem(e);
    };

    generateDom() {
        let dom = <div />;
        if (this.props.fieldValue === "parameters") {
            dom = this.generateParameters();
        } else if (this.props.fieldValue === "sentdatetime") {
            dom = this.generateSentdatetime();
        } else if (this.props.fieldValue === "severity") {
            dom = this.generateSeverity();
        } else {
            dom = this.generateBasic();
        }
        return dom;
    }

    generateBasic = () => {
        return (
            <div className={this.props.classes.dropDown} id={"selectArea" + this.props.number}>
                <FormControl>
                    <Select
                        value={this.state.optionSelect}
                        onChange={this.handleTypeChange.bind(this, this.props.number)}
                        displayEmpty
                    >
                        {/* <MenuItem value="">
                            <em>-Select-</em>
                        </MenuItem> */}
                        {this.props.optiontype &&
                            this.props.optiontype.map((item, i) => (
                                <MenuItem value={item.value} key={i}>
                                    {item.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Input
                    placeholder="Search for..."
                    onChange={this.handleInput.bind(this, this.props.number)}
                    onKeyUp={this.handleInputKeyUp.bind(this)}
                />
            </div>
        );
    };
    generateParameters() {
        return (
            <div className={this.props.classes.dropDown} id={"selectArea" + this.props.number}>
                <div className="row no-gutters">
                    <Input placeholder="Enter a name..." onChange={this.handleParametersInputName.bind(this)} />
                    <Button color="default">like</Button>
                    <Input
                        placeholder="Search for..."
                        onChange={this.handleParametersInput.bind(this)}
                        onKeyUp={this.handleInputKeyUp.bind(this)}
                    />
                </div>
            </div>
        );
    }
    generateSentdatetime() {
        return (
            <div className={this.props.classes.dropDown} id={"selectArea" + this.props.number}>
                <div className="row no-gutters">
                    <RangePicker
                        showTime={{ format: "HH:mm:ss" }}
                        format={dateFormat}
                        onChange={this.handleCalendar.bind(this)}
                        // onOk={this.props.handleGetData()}
                    />
                </div>
            </div>
        );
    }
    generateSeverity() {
        return (
            <div className={this.props.classes.dropDown} id={"selectArea" + this.props.number}>
                <div className="row no-gutters">
                    <Button color="default">equals</Button>
                    <FormControl>
                        <Select value={this.state.optionSelect} onChange={this.handleSeverityChange} displayEmpty>
                            <MenuItem value="">
                                <em>-Select-</em>
                            </MenuItem>
                            <MenuItem value="1">Critical</MenuItem>
                            <MenuItem value="2">Major</MenuItem>
                            <MenuItem value="3">Minor</MenuItem>
                            <MenuItem value="4">Info</MenuItem>
                            <MenuItem value="5">Clear</MenuItem>
                            <MenuItem value="6">Reading</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }
    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleInputKeyUp = event => {
        if (event.keyCode === 13) {
            this.props.handleGetData();
        }
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="item" id={"dropdownArea" + this.props.number}>
                <Dropdown
                    overlay={this.generateDom()}
                    trigger={["click"]}
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                    getPopupContainer={() => document.getElementById("dropdownArea" + this.props.number)}
                >
                    <Chip
                        label={this.props.fieldName}
                        onClick={this.handleClick}
                        onDelete={this.handleRemoveItem.bind(this, this.props.number)}
                        classes={{
                            deleteIcon: classes.deleteIcon,
                            root: classes.root,
                            deletable: classes.deletable
                        }}
                        deleteIcon={<Icon>clear</Icon>}
                    />
                </Dropdown>
            </div>
        );
    }
}

export default withStyles(styles)(FilterItem);
