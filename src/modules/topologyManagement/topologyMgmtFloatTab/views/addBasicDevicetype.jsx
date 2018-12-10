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
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { TextField, InputLabel, Select } from "modules/common";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    paper: {},
    root: { backgroundColor: theme.palette.background.paper }
});

class AddBasicDevicetype extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basictypeObj: [
                {
                    basictype: "",
                    basictypeinstance: "",
                    basictypeRW: "",
                    basictypeunit: ""
                }
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab) {
            this.setState({
                basictypeObj: [
                    {
                        basictype: "",
                        basictypeinstance: "",
                        basictypeRW: "",
                        basictypeunit: ""
                    }
                ],
                basictype: "",
                basictypeinstance: "",
                basictypeinstance0validate: false,
                basictypeinstance0helperText: ""
            });
        }
    }

    handleDeleteBasictype(index) {
        let basic = this.state.basictypeObj.slice(0);
        basic.splice(index, 1);
        this.setState(
            Object.assign(this.state, {
                basictypeObj: basic,
                basictype: "",
                basictypeinstance: "",
                basictypeRW: "",
                basictypeunit: "",
                [`basictypeinstance${index}validate`]: "",
                [`basictypeinstance${index}helperText`]: ""
            })
        );
    }

    handleAddBasictype() {
        let basic = this.state.basictypeObj.slice(0);
        basic.push({
            basictype: "",
            basictypeinstance: "",
            basictypeRW: "",
            basictypeunit: ""
        });
        this.setState(
            Object.assign(this.state, {
                basictypeObj: basic,
                basictype: "",
                basictypeinstance: "",
                basictypeRW: "",
                basictypeunit: "",
                [`basictypeinstance${basic.length - 1}validate`]: "",
                [`basictypeinstance${basic.length - 1}helperText`]: ""
            })
        );
    }

    handleChanged(configKey, index, valueregex, mandatory, error, event) {
        this.setState(
            Object.assign(this.state, {
                [configKey]: event.target.value
            })
        );
        let basictypeObj = {
            basictype: configKey === "basictype" ? this.state.basictype : this.state.basictypeObj[index]["basictype"],
            basictypeinstance:
                configKey === "basictypeinstance"
                    ? this.state.basictypeinstance
                    : this.state.basictypeObj[index]["basictypeinstance"],
            basictypeRW:
                configKey === "basictypeRW" ? this.state.basictypeRW : this.state.basictypeObj[index]["basictypeRW"],
            basictypeunit:
                configKey === "basictypeunit"
                    ? this.state.basictypeunit
                    : this.state.basictypeObj[index]["basictypeunit"]
        };
        let validateFlag = true;
        if (valueregex) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(event.target.value);
            if (!mandatory && !event.target.value) {
                validateFlag = true;
            }
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}${index}validate`]: !validateFlag,
                    [`${configKey}${index}helperText`]: error || `Support ${valueregex}`
                })
            );
        }

        this.handleBasictypeChanged(configKey, index, basictypeObj, validateFlag, valueregex, error);
    }

    handleBasictypeChanged(configKey, index, basictypeDataObj, validateFlag, valueregex, error) {
        if (
            configKey === "basictype" ||
            configKey === "basictypeinstance" ||
            configKey === "basictypeunit" ||
            configKey === "basictypeRW"
        ) {
            let basictype = this.state.basictypeObj.slice(0);
            basictype.splice(index, 1, basictypeDataObj);
            this.setState(
                Object.assign(this.state, {
                    basictypeObj: basictype
                })
            );
        }

        let newValidateFlag = validateFlag;
        if (configKey !== "basictype") {
            let allKeys = [];
            for (let i = 0; i < this.state.basictypeObj.length; i++) {
                let multiple = false;
                let obj = this.state.basictypeObj[i];
                // for (let key in this.state.basictypeObj[i]) {
                for (let j = 0; j < allKeys.length; j++) {
                    if (allKeys[j] === obj[configKey]) {
                        multiple = true;
                    }
                }
                if (!multiple) {
                    allKeys.push(obj[configKey]);
                    let validateFlag = true;
                    if (valueregex && obj[configKey]) {
                        let reg = new RegExp("^[" + valueregex + "]+$");
                        validateFlag = reg.test(obj[configKey]);
                        this.setState(
                            Object.assign(this.state, {
                                [`${configKey}${i}validate`]: !validateFlag,
                                [`${configKey}${i}helperText`]: error || `Support ${valueregex}`
                            })
                        );
                    }
                    this.props.handleBasicTypeChanged(this.state.basictypeObj, configKey, i, validateFlag);
                } else if (configKey === "basictypeinstance") {
                    newValidateFlag = false;
                    this.setState(
                        Object.assign(this.state, {
                            [`${configKey}${index}validate`]: !newValidateFlag,
                            [`${configKey}${index}helperText`]: "Name can't be multiple."
                        })
                    );
                    this.props.handleBasicTypeChanged(this.state.basictypeObj, configKey, index, newValidateFlag);
                }
                // }
            }
        }

        // this.props.handleBasicTypeChanged(this.state.basictypeObj, configKey, index, newValidateFlag);
    }

    render() {
        let { index, compType, formatBasicTypesList, formatValues } = this.props;
        let width = compType === "view" ? "100%" : "91%";
        // let listWidth = compType === "view" ? "47%" : "24%";
        return (
            <div className="edit-basic-type" key={index}>
                {this.state.basictypeObj &&
                    this.state.basictypeObj.map((basictype, innerKey) => {
                        return (
                            <div key={innerKey} style={{ lineHeight: "50px" }}>
                                <ListItem className="basic-type-list" style={{ width: width }}>
                                    {formatValues &&
                                        formatValues.map((config, num) => {
                                            let validate = `${config.currentKey}${innerKey}validate`;
                                            let helperText = `${config.currentKey}${innerKey}helperText`;
                                            let widthBasicType =
                                                config.currentKey === "basictypeinstance" ||
                                                config.currentKey === "basictype"
                                                    ? "30%"
                                                    : "18%";
                                            return (
                                                <FormControl
                                                    key={num}
                                                    className="list"
                                                    style={{ width: widthBasicType }}
                                                >
                                                    {config.comp === "input" && (
                                                        <Tooltip title={config.default}>
                                                            <TextField
                                                                label={config.displayname}
                                                                value={basictype[config.currentKey]}
                                                                fullWidth
                                                                onChange={this.handleChanged.bind(
                                                                    this,
                                                                    config.currentKey,
                                                                    innerKey,
                                                                    config.valueregex,
                                                                    config.mandatory,
                                                                    config.valueerror
                                                                )}
                                                                multiline={config.multiline}
                                                                required={config.mandatory}
                                                                inputProps={{ maxLength: config.size }}
                                                                error={this.state[validate]}
                                                                helperText={
                                                                    this.state[validate] ? this.state[helperText] : ""
                                                                }
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    {config.currentKey === "basictype" && (
                                                        // <Tooltip title={config.default}>
                                                        <FormControl
                                                            style={{ width: "100%" }}
                                                            required={config.mandatory}
                                                        >
                                                            <InputLabel htmlFor="select-multiple-checkbox">
                                                                {config.displayname}
                                                            </InputLabel>
                                                            <Select
                                                                value={basictype[config.currentKey]}
                                                                onChange={this.handleChanged.bind(
                                                                    this,
                                                                    config.currentKey,
                                                                    innerKey,
                                                                    config.valueregex,
                                                                    config.mandatory,
                                                                    config.valueerror
                                                                )}
                                                                className="basictype-select"
                                                            >
                                                                {formatBasicTypesList &&
                                                                    formatBasicTypesList.map((type, index) => {
                                                                        return (
                                                                            <MenuItem key={index} value={type.typeId}>
                                                                                <ListItemText
                                                                                    primary={type.displayName}
                                                                                />
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </Select>
                                                        </FormControl>
                                                        // </Tooltip>
                                                    )}
                                                    {config.currentKey === "basictypeRW" && (
                                                        // <Tooltip title={config.default}>
                                                        <FormControl
                                                            style={{ width: "100%" }}
                                                            required={config.mandatory}
                                                        >
                                                            <InputLabel htmlFor="select-multiple-checkbox">
                                                                {config.displayname}
                                                            </InputLabel>
                                                            <Select
                                                                value={basictype[config.currentKey]}
                                                                onChange={this.handleChanged.bind(
                                                                    this,
                                                                    config.currentKey,
                                                                    innerKey,
                                                                    config.valueregex,
                                                                    config.mandatory,
                                                                    config.valueerror
                                                                )}
                                                                className="basictype-select"
                                                            >
                                                                {this.props.operation &&
                                                                    this.props.operation.map((operation, index) => {
                                                                        return (
                                                                            <MenuItem key={index} value={operation.key}>
                                                                                <ListItemText
                                                                                    primary={operation.operate}
                                                                                />
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </Select>
                                                        </FormControl>
                                                        // </Tooltip>
                                                    )}
                                                </FormControl>
                                            );
                                        })}
                                </ListItem>
                                {innerKey < this.state.basictypeObj.length - 1 && (
                                    <Tooltip title="Delete">
                                        <IconButton onClick={this.handleDeleteBasictype.bind(this, innerKey)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {innerKey === this.state.basictypeObj.length - 1 && (
                                    <Tooltip title="Add">
                                        <IconButton onClick={this.handleAddBasictype.bind(this)}>
                                            <Icon>add</Icon>
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        );
                    })}
            </div>
        );
    }
}

AddBasicDevicetype.propTypes = {};

AddBasicDevicetype.defaultProps = {
    basictypeObj: [
        {
            basictype: "",
            basictypeinstance: ""
        }
    ],
    operation: [
        {
            operate: "Read Only",
            key: "R"
        },
        {
            operate: "Read-Write",
            key: "RW"
        },
        {
            operate: "Execute",
            key: "E"
        }
    ]
};

export default withStyles(styles)(AddBasicDevicetype);
