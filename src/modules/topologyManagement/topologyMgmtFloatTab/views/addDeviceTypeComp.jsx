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
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import {
    formatBaiscTypes,
    formatDeviceTypesSchemaForAdd,
    formatDeviceTypesSchemaInitValueForAdd,
    renderMustAttrbutes
} from "../funcs/renderSchema";
import { handlePropertyChanged, addNewDevicetype } from "../funcs/actions";
import AddDeviceTypeDefault from "./addDevicetypeDefault";
import AddBasicDeviceType from "./addBasicDevicetype";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

class AddDeviceTypeComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValues: {},
            additionalProperty: {
                manufacturer: "",
                description: "",
                icon: "default"
            },
            totalValidate: true,
            validateCheck: [],
            basicTypeInstances: [],
            propertyObj: {}
        };
        this.validateCheck = [];
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.sysconfigDeviceTypeSchema || !nextProps.sysconfigBasicTypes) {
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
            this.validateCheck = [];
            this.setState(
                Object.assign(this.state, {
                    totalValidate: true,
                    defaultValues: {},
                    additionalProperty: { icon: "default" },
                    basicTypeInstances: []
                })
            );
        }
        let sysconfigDeviceTypeSchema = nextProps.sysconfigDeviceTypeSchema;
        let sysconfigBasicTypes = nextProps.sysconfigBasicTypes || [];
        let defaultValues = sysconfigDeviceTypeSchema.defaultvalues || [];
        let additionalproperty = sysconfigDeviceTypeSchema.additionalproperty || [];
        let basictypesSchema = sysconfigDeviceTypeSchema.basictypes || [];

        let formatBasicTypesList = formatBaiscTypes(sysconfigBasicTypes);
        let formatDefaultValues = formatDeviceTypesSchemaForAdd(defaultValues);
        let { mustObj, validateObj } = renderMustAttrbutes(sysconfigDeviceTypeSchema);
        let defaultInitValue = formatDeviceTypesSchemaInitValueForAdd(defaultValues);
        let formatAdditionalproperty = formatDeviceTypesSchemaForAdd(additionalproperty);
        let additionalInitValue = formatDeviceTypesSchemaInitValueForAdd(additionalproperty);
        let formatBasictypesSchema = formatDeviceTypesSchemaForAdd(basictypesSchema);

        this.setState(
            Object.assign(this.state, {
                formatDefaultValues: formatDefaultValues,
                defaultInitValue: defaultInitValue,
                formatAdditionalproperty: formatAdditionalproperty,
                additionalInitValue: additionalInitValue,
                formatBasicTypesList: formatBasicTypesList,
                formatBasictypesSchema: formatBasictypesSchema,
                mustObj: mustObj,
                validateObj: validateObj
            })
        );
    }

    handleDefaultAdditionalValueChange(groupKey, configKey, value, validateFlag) {
        if (!value) {
            let data = this.state[groupKey];
            delete data[configKey];
            this.setState(
                Object.assign(this.state, {
                    [groupKey]: data,
                    [configKey]: value
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    [groupKey]: Object.assign(this.state[groupKey], {
                        [configKey]: value
                    })
                })
            );
        }
        if (groupKey === "defaultValues") {
            this.props.handlePropertyChanged(this.props.identify, "defaultValues", this.state[groupKey]);
        } else if (groupKey === "additionalProperty") {
            this.props.handlePropertyChanged(this.props.identify, "additionalProperty", this.state[groupKey]);
        }

        if (!validateFlag) {
            let validateCheck = this.validateCheck.slice(0);
            let findFlag = false;
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(configKey) !== -1) {
                    findFlag = true;
                }
            }
            if (!findFlag) {
                this.validateCheck.push(configKey);
            }
        } else {
            let validateCheck = this.validateCheck.slice(0);
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(configKey) !== -1) {
                    this.validateCheck.splice(i, 1);
                }
            }
        }
        let mustObj = this.state.mustObj;
        this.checkMustDataValidate(mustObj);
    }

    checkMustDataValidate(obj, validateFlag) {
        let validate = false;
        for (let key in obj) {
            let config = obj[key];
            for (let i = 0; i < config.length; i++) {
                if (this.state[key] instanceof Array) {
                    for (let j = 0; j < this.state[key].length; j++) {
                        let value = this.state[key][j];
                        for (let innerKey in value) {
                            // if (
                            //     !innerKey ||
                            //     (value[innerKey] &&
                            //         (!value[innerKey].type || !value[innerKey].operations || !value[innerKey].units))
                            // ) {
                            //     validate = true;
                            // }
                            if (value[innerKey] && !value[innerKey][config[i]]) {
                                validate = true;
                            }
                        }
                    }
                    if (!this.state[key].length) {
                        validate = true;
                    }
                } else if (this.state[key] instanceof Object && !this.state[key][config[i]]) {
                    validate = true;
                }
            }
        }

        if (!validate && !this.validateCheck.length) {
            this.setState(
                Object.assign(this.state, {
                    totalValidate: false
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    totalValidate: true
                })
            );
        }
    }

    handleButtonClick(type) {
        if (type === "save") {
            let basicTypeInstancesObj = _.cloneDeep(this.state.basicTypeInstances);
            let basicTypeObj = [];
            _.forEach(basicTypeInstancesObj, obj => {
                for (let key in obj) {
                    let basicType = obj[key];
                    let newBasicType = {
                        [basicType.basictypeinstance]: {
                            type: basicType.basictype,
                            units: basicType.basictypeunit,
                            operations: basicType.basictypeRW
                        }
                    };
                    basicTypeObj.push(newBasicType);
                }
            });
            let basicTypeInstances = {
                basicTypeInstances: basicTypeObj
            };
            let propertySchema = this.props.sysconfigDeviceTypeSchema.deviceproperty;
            let newDeviceProperty = {};
            _.forEach(propertySchema, function(property) {
                for (let key in property) {
                    newDeviceProperty[key] = property[key];
                }
            });
            let deviceProperty = {
                deviceProperty: newDeviceProperty
            };
            let additionalProperty = {
                additionalProperty: this.state.additionalProperty
            };
            this.props.addNewDevicetype(
                this.props.identify,
                this.state.defaultValues,
                basicTypeInstances,
                additionalProperty,
                deviceProperty,
                this.state.propertyObj,
                this.siteName,
                this.props.userid
            );
        }
        this.props.handleFloatTabClose(this.props.identify);
    }

    handleBasicTypeChanged(basictypes, configKey, index, validateFlag) {
        let formatBasicTypesList = this.state.formatBasicTypesList;
        let basicTypeInstances = [];
        let propertyObj = {};
        _.forEach(basictypes, function(type) {
            let obj = {};
            _.forEach(formatBasicTypesList, function(list) {
                if (type.basictype === list.typeId) {
                    obj[type.basictypeinstance] = {
                        basictypeinstance: type.basictypeinstance,
                        basictype: list.typeId,
                        basictypeunit: type.basictypeunit,
                        basictypeRW: type.basictypeRW
                    };
                    propertyObj[type.basictypeinstance] = {
                        basictypeinstance: type.basictypeinstance,
                        type: list.typeId,
                        basictypeunit: type.basictypeunit,
                        basictypeRW: type.basictypeRW
                    };
                    basicTypeInstances.push(obj);
                }
            });
        });
        this.setState(
            Object.assign(this.state, {
                basicTypeInstances: basicTypeInstances,
                propertyObj: propertyObj
            })
        );

        let key = `${configKey}${index}`;
        if (!validateFlag) {
            let validateCheck = this.validateCheck.slice(0);
            let findFlag = false;
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(key) !== -1) {
                    findFlag = true;
                }
            }
            if (!findFlag) {
                this.validateCheck.push(key);
            }
        } else {
            let validateCheck = this.validateCheck.slice(0);
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(key) !== -1) {
                    this.validateCheck.splice(i, 1);
                }
            }
        }
        let mustObj = this.state.mustObj;
        this.checkMustDataValidate(mustObj);
    }

    render() {
        const { showFloatTab } = this.props;
        const {
            formatBasicTypesList,
            formatBasictypesSchema,
            defaultInitValue,
            formatDefaultValues,
            formatAdditionalproperty,
            additionalInitValue
        } = this.state;
        return (
            <div className="float-tab-cont">
                <div className="edit-device-type-info">
                    {formatDefaultValues && (
                        <AddDeviceTypeDefault
                            identify={this.props.identify}
                            showFloatTab={showFloatTab}
                            formatValues={formatDefaultValues}
                            initValue={defaultInitValue}
                            tooltipValues={defaultInitValue}
                            groupKey="defaultValues"
                            handleDefaultAdditionalValueChange={this.handleDefaultAdditionalValueChange.bind(this)}
                        />
                    )}
                    {formatAdditionalproperty && (
                        <AddDeviceTypeDefault
                            identify={this.props.identify}
                            showFloatTab={showFloatTab}
                            formatValues={formatAdditionalproperty}
                            initValue={additionalInitValue}
                            tooltipValues={additionalInitValue}
                            groupKey="additionalProperty"
                            handleDefaultAdditionalValueChange={this.handleDefaultAdditionalValueChange.bind(this)}
                        />
                    )}
                    <AddBasicDeviceType
                        identify={this.props.identify}
                        showFloatTab={showFloatTab}
                        formatBasicTypesList={formatBasicTypesList}
                        formatValues={formatBasictypesSchema}
                        compType="add"
                        // basicTypeObj={{basic}}
                        initValue={additionalInitValue}
                        groupKey="basicTypeInstances"
                        handleBasicTypeChanged={this.handleBasicTypeChanged.bind(this)}
                    />
                </div>

                <div className="add-device-type-footer">
                    <Button
                        variant="contained"
                        onClick={this.handleButtonClick.bind(this, "save")}
                        color="secondary"
                        disabled={this.state.totalValidate}
                    >
                        Save
                    </Button>
                    <Button onClick={this.handleButtonClick.bind(this, "cancel")}>Cancel</Button>
                </div>
            </div>
        );
    }
}

AddDeviceTypeComp.propTypes = {};

AddDeviceTypeComp.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        sysconfigDeviceTypeSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypeSchema"),
        sysconfigBasicTypes: filterProps(state, identify, topoReducerName, "sysconfigBasicTypes"),
        userid: state[authName].userid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handlePropertyChanged: (identify, propertyType, propertyData) => {
            dispatch(handlePropertyChanged(identify, propertyType, propertyData));
        },
        addNewDevicetype: (
            identify,
            defaultvalues,
            basicTypeInstances,
            additionalProperty,
            deviceProperty,
            propertyFromat,
            siteName,
            userid
        ) => {
            dispatch(
                addNewDevicetype(
                    identify,
                    defaultvalues,
                    basicTypeInstances,
                    additionalProperty,
                    deviceProperty,
                    propertyFromat,
                    siteName,
                    userid
                )
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeviceTypeComp);
