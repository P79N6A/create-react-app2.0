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
import jp from "jsonpath";
import ImageComp from "./application-img";
import _ from "lodash";
import AddLocationComp from "./application-addLocation";
import SelectIconComp from "./application-selectIcon";

class AppDetail extends React.Component {
    state = { validate: {}, helperText: {}, values: {} };

    componentDidMount() {
        if (!this.props.deviceData || !this.props.sysconfigDeviceSchema) {
            return;
        }
        let values = this.matchDataSchema(this.props);
        this.setState({ values });
    }

    componentWillReceiveProps(nextProps) {
        if (
            !nextProps.deviceData ||
            !nextProps.sysconfigDeviceSchema ||
            _.isEqual(nextProps.deviceData, this.props.deviceData)
        ) {
            return;
        }
        let values = this.matchDataSchema(nextProps);
        this.setState({
            validate: {},
            helperText: {},
            values
        });
    }
    matchDataSchema(props) {
        let deviceData = props.deviceData;
        let deviceSchema = props.sysconfigDeviceSchema;
        let values = {};

        let locationData = deviceData["location.geometry"] && JSON.parse(deviceData["location.geometry"]);
        let coordinates = locationData ? jp.query(locationData, "$..coordinates")[0] : [];
        values.coordinates = coordinates ? coordinates : undefined;
        for (let i = 0; i < deviceSchema.length; i++) {
            for (let key in deviceSchema[i]) {
                let value = jp.query(deviceData, deviceSchema[i][key].jsonpath)[0];
                values[key] = value;
            }
        }
        return values;
    }
    shouldComponentUpdate(nextProps, nextStates) {
        return !_.isEqual(this.state, nextStates) || !_.isEqual(this.props, nextProps);
    }
    onChange(value) {
        this.props.handleChange(value, this.checkValidation());
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

    handleInputSelectChanged = (configKey, value, valueregex, error) => {
        this.setState({
            values: Object.assign(this.state.values, {
                [configKey]: value
            })
        });
        let validateFlag = true;
        if (valueregex && value) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(value);
            this.setState({
                validate: Object.assign(this.state.validate, { [`${configKey}validate`]: !validateFlag }),
                helperText: Object.assign(this.state.helperText, {
                    [`${configKey}helperText`]: error || `Support ${valueregex}`
                })
            });
        }
        this.onChange({ [configKey]: _.trim(value) });
    };

    handleLocationChange = (configKey, locationId, locationName) => {
        this.setState({
            values: {
                ...this.state.values,
                [configKey]: locationName
            }
        },()=>{
            this.onChange({ locationId: locationId, [configKey]: locationName });
        });
    };

    render() {
        const { sysconfigDeviceSchema } = this.props;
        const { handleInputSelectChanged, handleLocationChange } = this;
        const { values, validate, helperText } = this.state;
        return (
            <div className="detail-cont">
                {_.map(sysconfigDeviceSchema, (config, index) => {
                    let configKey = "";
                    for (let key in config) {
                        configKey = key;
                    }
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
                                    inputProps={{ maxLength: config[configKey].size }}
                                    disabled={config[configKey].operations.indexOf("W") < 0}
                                    error={validate[`${configKey}validate`]}
                                    helperText={
                                        validate[`${configKey}validate`] ? helperText[`${configKey}helperText`] : ""
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
                                    value={values[configKey] || ""}
                                    margin="normal"
                                    disabled={config[configKey].operations.indexOf("W") < 0}
                                    error={validate[`${configKey}validate`]}
                                    helperText={
                                        validate[`${configKey}validate`] ? helperText[`${configKey}helperText`] : ""
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
                                    coordinates={values.coordinates}
                                    locationName={values.addresslocation}
                                    deviceName={values.addressname}
                                    initSaveBtn={true}
                                    handleLocationChangedFunc={handleLocationChange}
                                />
                            )}
                            {config[configKey].comp === "imageUpload" && (
                                <ImageComp
                                    identify={this.props.identify}
                                    schemaKey={configKey}
                                    schema={config[configKey]}
                                    disableEdit={config[configKey].operations.indexOf("W") < 0}
                                    handleImageChange={handleInputSelectChanged}
                                    imageId={values[configKey] || ""}
                                    // deviceName={values.addressname}
                                />
                            )}
                            {config[configKey].comp === "iconpicker" && (
                                <SelectIconComp
                                    identify={this.props.identify}
                                    iconType={values[configKey] || ""}
                                    iconColor="white"
                                    editMode={true}
                                    onChange={e => {
                                        handleInputSelectChanged(configKey, e);
                                    }}
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
