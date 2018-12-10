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
import { TextField } from "modules/common";
import ListItem from "@material-ui/core/ListItem";
import AddLocationComp from "./addLocationCompTwo";
// import jp from "jsonpath";
import _ from "lodash";
import ImageComp from "./upLoadAppImage";

class AppDetail extends React.Component {
    state = { validate: {}, helperText: {}, values: {} };

    componentWillReceiveProps(nextProps) {
        nextProps.reset &&
            this.setState({
                validate: {},
                helperText: {},
                values: {}
            });
    }
    onChange(key, value) {
        this.props.handleChange(key, value, this.checkValidation());
    }

    checkValidation() {
        const { sysconfigDeviceSchema } = this.props;
        const { values } = this.state;
        return (
            _.every(sysconfigDeviceSchema, schema => {
                return _.every(schema, (config, name) => {
                    return config.mandatory ? (values[name] ? true : false) : true;
                });
            }) && _.every(this.state.validate, item => !item)
        );
        // return _.every(this.state.validate, item => !item);
    }

    checkMandatory = () => {
        const { sysconfigDeviceSchema } = this.props;
        const { values } = this.state;
        return _.every(sysconfigDeviceSchema, schema => {
            return _.every(schema, (config, name) => {
                return config.mandatory ? (values[name] ? true : false) : true;
            });
        });
    };

    handleInputSelectChanged = (configKey, value, valueregex, error) => {
        this.setState({
            values: Object.assign(this.state.values, {
                [configKey]: value
            })
        });
        let validateFlag = true;
        if (valueregex) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(value);
            this.setState({
                validate: Object.assign(this.state.validate, { [`${configKey}validate`]: !validateFlag }),
                helperText: Object.assign(this.state.helperText, {
                    [`${configKey}helperText`]: error || `Support ${valueregex}`
                })
            });
        }
        this.onChange(configKey, value);
    };
    handleLocationChange = (configKey, value) => {
        this.setState({
            values: Object.assign(this.state.values, {
                [configKey]: value
            })
        });
    };

    render() {
        const { handleInputSelectChanged } = this;
        const { sysconfigDeviceSchema } = this.props;
        const { values } = this.state;
        return (
            <div className="detail-cont">
                {_.map(sysconfigDeviceSchema, (config, index) => {
                    let configKey = "";
                    for (let key in config) {
                        configKey = key;
                    }
                    // let defaultLabel =
                    //     config[configKey] && config[configKey].currentValue ? config[configKey].currentValue[0] : "";
                    return (
                        <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
                            {config[configKey].comp === "input" && (
                                <TextField
                                    label={config[configKey].displayname}
                                    value={values[configKey] || ""}
                                    // defaultValue={defaultLabel || ""}
                                    fullWidth
                                    multiline={config[configKey].multiline}
                                    required={config[configKey].mandatory}
                                    // size={config[configKey].size}
                                    inputProps={{ maxLength: config[configKey].size }}
                                    error={this.state.validate[`${configKey}validate`]}
                                    helperText={
                                        this.state.validate[`${configKey}validate`]
                                            ? this.state.helperText[`${configKey}helperText`]
                                            : ""
                                    }
                                    onChange={e => {
                                        handleInputSelectChanged(
                                            configKey,
                                            e.target.value,
                                            config[configKey].valueregex,
                                            config[configKey].valueerror
                                        );
                                    }}
                                />
                            )}
                            {config[configKey].comp === "textarea" && (
                                <TextField
                                    id="multiline-flexible"
                                    label={config[configKey].displayname}
                                    // defaultValue={defaultLabel || ""}
                                    multiline
                                    required={config[configKey].mandatory}
                                    rowsMax="4"
                                    fullWidth
                                    // value={defaultLabel || ""}
                                    value={values[configKey] || ""}
                                    margin="normal"
                                    error={this.state.validate[`${configKey}validate`]}
                                    helperText={
                                        this.state.validate[`${configKey}validate`]
                                            ? this.state.helperText[`${configKey}helperText`]
                                            : ""
                                    }
                                    onChange={e => {
                                        handleInputSelectChanged(
                                            configKey,
                                            e.target.value,
                                            config[configKey].valueregex,
                                            config[configKey].valueerror
                                        );
                                    }}
                                />
                            )}
                            {config[configKey].comp === "locationSelect" && (
                                <AddLocationComp
                                    identify={this.props.identify}
                                    schemaKey={configKey}
                                    schema={config[configKey]}
                                    handleLocationChangedFunc={handleInputSelectChanged}
                                    deviceName={values.addressname}
                                />
                            )}
                            {config[configKey].comp === "imageUpload" && (
                                <ImageComp
                                    identify={this.props.identify}
                                    schemaKey={configKey}
                                    schema={config[configKey]}
                                    handleImageChange={handleInputSelectChanged}
                                    imageId={values[configKey] || ""}
                                    // deviceName={values.addressname}
                                />
                            )}
                        </ListItem>
                    );
                })}
            </div>
        );
    }
}

AppDetail.propTypes = {};

AppDetail.defaultProps = {};

export default AppDetail;
