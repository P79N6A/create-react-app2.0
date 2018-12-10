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
import {
    formatDeviceTypesSchemaForAdd,
    formatDeviceTypesSchemaValueForView,
    formatDeviceTypesAdditionSchemaValueForView,
    formatDeviceTypesBasictypeForView,
    formatDeviceTypesBasictypeObjForView,
    renderMustAttrbutes
} from "../funcs/renderSchema";
import { connect } from "react-redux";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import EditDeviceTypeCont from "./editDeviceTypeCont";
import ViewBasicTypeComp from "./viewBasicTypeComp";
import { getDeviceTypeDetail, handlePropertyChanged, editDevicetype } from "../funcs/actions";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

class EditDeviceTypeComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValues: {},
            additionalProperty: {
                icon: "default"
            },
            totalValidate: true,
            validateCheck: [],
            basicTypeInstances: [],
            propertyObj: {}
        };
        this.validateCheck = [];
        this.didDetailChanged = false;
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentDidMount() {
        this.props.getDeviceTypeDetail(this.props.identify, this.props.selectDeviceId, this.siteName);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.selectDeviceId !== nextProps.selectDeviceId && nextProps.selectDeviceId) ||
            (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab)
        ) {
            this.props.getDeviceTypeDetail(this.props.identify, nextProps.selectDeviceId, this.siteName);
        }

        if (
            !nextProps.sysconfigDeviceTypeSchema ||
            !nextProps.sysconfigBasicTypes ||
            !nextProps.devicetypeDetail ||
            !nextProps.sysconfigDevicetypeDetail
        ) {
            return;
        }

        this.didDetailChanged = false;
        // devicetype detail and sysconfig devicetype detail
        let devicetypeDetail = nextProps.devicetypeDetail || {};
        let sysconfigDevicetypeDetail =
            (nextProps.sysconfigDevicetypeDetail && JSON.parse(nextProps.sysconfigDevicetypeDetail.configval)) || {};

        // sysconfig devicetype schema and sysconfig basict types
        let sysconfigDeviceTypeSchema = nextProps.sysconfigDeviceTypeSchema;
        let sysconfigBasicTypes = nextProps.sysconfigBasicTypes || [];
        let defaultValues = sysconfigDeviceTypeSchema.defaultvalues || [];
        let additionalproperty = sysconfigDeviceTypeSchema.additionalproperty || [];
        let basictypesSchema = sysconfigDeviceTypeSchema.basictypes || [];

        // format basic type schema
        let formatBasictypesSchema = formatDeviceTypesSchemaForAdd(basictypesSchema);

        // format default values and additionalproperty
        let { formatDefaultValues, defaultInitValue } = formatDeviceTypesSchemaValueForView(
            defaultValues,
            devicetypeDetail
        );
        let { formatAdditionalproperty, addtionInitValue } = formatDeviceTypesAdditionSchemaValueForView(
            additionalproperty,
            sysconfigDevicetypeDetail
        );
        let { mustObj, validateObj } = renderMustAttrbutes(sysconfigDeviceTypeSchema);

        // format basic type data obj
        let currentBasictypes = formatDeviceTypesBasictypeForView(sysconfigDevicetypeDetail);
        let formatBasicTypesDataObj = formatDeviceTypesBasictypeObjForView(currentBasictypes, sysconfigBasicTypes);

        let checkChangedObj = {};
        for (let i = 0; i < formatDefaultValues.length; i++) {
            let value = formatDefaultValues[i];
            checkChangedObj[value.currentKey] = value.defaultValue;
        }
        for (let j = 0; j < formatAdditionalproperty.length; j++) {
            let value = formatAdditionalproperty[j];
            checkChangedObj[value.currentKey] = value.defaultValue;
        }

        this.setState(
            Object.assign(
                this.state,
                {
                    formatDefaultValues: formatDefaultValues,
                    formatAdditionalproperty: formatAdditionalproperty,
                    formatBasicTypesDataObj: formatBasicTypesDataObj,
                    basictypesSchema: formatBasictypesSchema,
                    defaultInitValue: defaultInitValue,
                    addtionInitValue: addtionInitValue,
                    checkChangedObj: checkChangedObj,
                    mustObj: mustObj,
                    validateObj: validateObj,
                    currentBasictypes: currentBasictypes
                },
                defaultInitValue,
                addtionInitValue
            )
        );
    }

    handleDefaultAdditionalValueChange(groupKey, configKey, value, validateFlag) {
        // if (!value) {
        //     let data = this.state[groupKey];
        //     delete data[configKey];
        //     this.setState(
        //         Object.assign(this.state, {
        //             [groupKey]: data,
        //             [configKey]: value
        //         })
        //     );
        // } else {
        let initValue = {};
        if (groupKey === "defaultValues") {
            initValue = this.state.defaultInitValue;
            initValue[configKey] = value;
            this.setState(
                Object.assign(this.state, {
                    [groupKey]: Object.assign(this.state[groupKey], {
                        [configKey]: value
                    }),
                    [configKey]: value,
                    defaultInitValue: initValue
                })
            );
        } else if (groupKey === "additionalProperty") {
            initValue = this.state.addtionInitValue;
            initValue[configKey] = value;
            this.setState(
                Object.assign(this.state, {
                    [groupKey]: Object.assign(this.state[groupKey], {
                        [configKey]: value
                    }),
                    [configKey]: value,
                    addtionInitValue: initValue
                })
            );
        }
        // }
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
        this.checkMustDataValidate();
    }

    checkMustDataValidate() {
        let checkChangedObj = this.state.checkChangedObj;
        let didDetailChanged = false;
        for (let key in checkChangedObj) {
            let configKey = key;
            if (this.state[configKey] !== checkChangedObj[key]) {
                didDetailChanged = true;
            }
        }
        this.didDetailChanged = didDetailChanged && !this.validateCheck.length ? true : false;
    }

    handleButtonClick(type) {
        if (type === "save") {
            let basicTypeInstances = {
                basicTypeInstances: this.state.currentBasictypes
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
                additionalProperty: Object.assign(this.state.additionalProperty, {
                    description: this.state.addtionInitValue.description,
                    manufacturer: this.state.addtionInitValue.manufacturer,
                    icon: this.state.addtionInitValue.icon,
                    timeout: this.state.addtionInitValue.timeout
                })
            };
            let defaultValues = Object.assign(this.state.defaultValues, {
                devicetypename: this.state.defaultInitValue.devicetypename,
                devicetypedisplayname: this.state.defaultInitValue.devicetypedisplayname
            });
            this.props.editDevicetype(
                this.props.identify,
                defaultValues,
                basicTypeInstances,
                additionalProperty,
                deviceProperty,
                this.state.propertyObj,
                this.siteName,
                this.props.userid,
                this.props.selectDeviceId
            );
        }
        this.props.handleFloatTabClose(this.props.identify);
    }

    render() {
        const { showFloatTab } = this.props;
        const {
            formatAdditionalproperty,
            formatDefaultValues,
            defaultInitValue,
            formatBasicTypesDataObj,
            basictypesSchema,
            addtionInitValue
        } = this.state;
        return (
            <div className="float-tab-cont" style={{ padding: "16px 0" }}>
                <div className="edit-device-type-info">
                    {formatDefaultValues && (
                        <EditDeviceTypeCont
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
                        <EditDeviceTypeCont
                            identify={this.props.identify}
                            showFloatTab={showFloatTab}
                            formatValues={formatAdditionalproperty}
                            initValue={addtionInitValue}
                            tooltipValues={addtionInitValue}
                            groupKey="additionalProperty"
                            handleDefaultAdditionalValueChange={this.handleDefaultAdditionalValueChange.bind(this)}
                        />
                    )}
                    {formatBasicTypesDataObj && (
                        <ViewBasicTypeComp
                            identify={this.props.identify}
                            showFloatTab={showFloatTab}
                            formatBasicTypesDataObj={formatBasicTypesDataObj}
                            basictypesSchema={basictypesSchema}
                        />
                    )}
                </div>
                <div className="add-device-type-footer">
                    <Button
                        variant="contained"
                        onClick={this.handleButtonClick.bind(this, "save")}
                        color="secondary"
                        disabled={!this.didDetailChanged}
                    >
                        Save
                    </Button>
                    <Button onClick={this.handleButtonClick.bind(this, "cancel")}>Cancel</Button>
                </div>
            </div>
        );
    }
}

EditDeviceTypeComp.propTypes = {};

EditDeviceTypeComp.defaultProps = {};

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
        selectDeviceId: filterProps(state, identify, topoReducerName, "selectDeviceId"),
        devicetypeDetail: filterProps(state, identify, topoFloatTabReducer, "devicetypeDetail"),
        sysconfigDevicetypeDetail: filterProps(state, identify, topoFloatTabReducer, "sysconfigDevicetypeDetail"),
        userid: state[authName].userid
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDeviceTypeDetail: (identify, selectDeviceId, siteName) => {
            dispatch(getDeviceTypeDetail(identify, selectDeviceId, siteName));
        },
        handlePropertyChanged: (identify, propertyType, propertyData) => {
            dispatch(handlePropertyChanged(identify, propertyType, propertyData));
        },
        editDevicetype: (
            identify,
            defaultvalues,
            basicTypeInstances,
            additionalProperty,
            deviceProperty,
            propertyFromat,
            siteName,
            userid,
            selectDeviceId
        ) => {
            dispatch(
                editDevicetype(
                    identify,
                    defaultvalues,
                    basicTypeInstances,
                    additionalProperty,
                    deviceProperty,
                    propertyFromat,
                    siteName,
                    userid,
                    selectDeviceId
                )
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDeviceTypeComp);
