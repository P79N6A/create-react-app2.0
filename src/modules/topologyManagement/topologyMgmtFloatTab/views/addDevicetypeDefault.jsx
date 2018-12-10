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
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import { TextField } from "modules/common";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import SelectIconComp from "./selectIconComp";
import Tooltip from "@material-ui/core/Tooltip";

class AddDeviceTypeDefault extends React.Component {
    constructor(props) {
        super(props);
        this.state = { icon: "default" };
    }

    componentDidMount() {
        this.setState(Object.assign(this.state, this.props.initValue));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.formatValues || !nextProps.initValue) {
            return;
        }

        if (this.props.iconType !== nextProps.iconType) {
            this.setState(
                Object.assign(this.state, {
                    icon: nextProps.iconType
                })
            );
        }
        if (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab) {
            this.setState(Object.assign(this.state, nextProps.initValue));
        }
        // if (nextProps.formatValues) {
        //     this.setState(Object.assign(this.state, nextProps.initValue));
        // }
    }

    handleChanged(configKey, valueregex, mandatory, error, event) {
        this.setState(
            Object.assign(this.state, {
                [configKey]: event.target.value
            })
        );
        let validateFlag = true;
        if (valueregex && event.target.value) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(event.target.value);
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: !validateFlag,
                    [`${configKey}helperText`]: error || `Support ${valueregex}`
                })
            );
        }
        if (!event.target.value) {
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: false
                })
            );
        }
        this.props.handleDefaultAdditionalValueChange(this.props.groupKey, configKey, event.target.value, validateFlag);
    }
    render() {
        const { formatValues, handleDefaultAdditionalValueChange, tooltipValues } = this.props;
        return (
            <div>
                {formatValues &&
                    formatValues.map((config, index) => {
                        return (
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
                                {config.comp === "input" && (
                                    <Tooltip title={tooltipValues[`${config["currentKey"]}tooltip`]}>
                                        <TextField
                                            label={config.displayname}
                                            value={this.state[config["currentKey"]] || ""}
                                            // defaultValue={config.default}
                                            onChange={this.handleChanged.bind(
                                                this,
                                                config.currentKey,
                                                config.valueregex,
                                                config.mandatory,
                                                config.valueerror
                                            )}
                                            multiline={config.multiline}
                                            required={config.mandatory}
                                            fullWidth
                                            inputProps={{ maxLength: config.size }}
                                            error={this.state[`${config.currentKey}validate`]}
                                            helperText={
                                                this.state[`${config.currentKey}validate`]
                                                    ? this.state[`${config.currentKey}helperText`]
                                                    : ""
                                            }
                                        />
                                    </Tooltip>
                                )}
                                {config.comp === "textarea" && (
                                    <Tooltip title={tooltipValues[`${config["currentKey"]}tooltip`]}>
                                        <TextField
                                            id="multiline-flexible"
                                            label={config.displayname}
                                            // defaultValue={config.default}
                                            multiline
                                            required={config.mandatory}
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state[config["currentKey"]] || ""}
                                            onChange={this.handleChanged.bind(
                                                this,
                                                config.currentKey,
                                                config.valueregex,
                                                config.mandatory,
                                                config.valueerror
                                            )}
                                            margin="normal"
                                            error={this.state[`${config.currentKey}validate`]}
                                            helperText={
                                                this.state[`${config.currentKey}validate`]
                                                    ? this.state[`${config.currentKey}helperText`]
                                                    : ""
                                            }
                                        />
                                    </Tooltip>
                                )}
                                {config.comp === "iconpicker" && (
                                    <SelectIconComp
                                        identify={this.props.identify}
                                        iconType={this.state[config["currentKey"]]}
                                        iconColor="white"
                                        editMode={true}
                                        handleDefaultAdditionalValueChange={handleDefaultAdditionalValueChange}
                                    />
                                )}
                            </ListItem>
                        );
                    })}
            </div>
        );
    }
}

AddDeviceTypeDefault.propTypes = {};

AddDeviceTypeDefault.defaultProps = {};
const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        iconType: filterProps(state, identify, topoFloatTabReducer, "defaultIcon")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeAvtiveStep: (identify, activeStep) => {
        //     dispatch(changeAvtiveStep(identify, activeStep));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeviceTypeDefault);
