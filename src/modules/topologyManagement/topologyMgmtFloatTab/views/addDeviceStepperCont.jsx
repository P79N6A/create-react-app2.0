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
import SelectDeviceType from "./selectDeviceType";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import AddDeviceDetail from "./addDeviceDetail";
import _ from "lodash";

class AddDeviceStepperCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        // go to next step
        if (
            nextProps.sysconfigDeviceSchema &&
            nextProps.sysconfigIntegrationSystems &&
            nextProps.sysconfigDevicePropertySchema
        ) {
            let sysconfigDeviceSchema = nextProps.sysconfigDeviceSchema;
            let sysconfigDevicePropertySchema = nextProps.sysconfigDevicePropertySchema;
            let sysconfigIntegrationSystems = nextProps.sysconfigIntegrationSystems;
            let integrationArr = [];
            _.forEach(sysconfigIntegrationSystems, function(integrationSchema) {
                let integration = integrationSchema.configval;
                integrationArr.push(integration);
            });
            _.forEach(sysconfigDevicePropertySchema, function(deviceSchema) {
                for (let key in deviceSchema) {
                    if (deviceSchema[key].enum) {
                        let listArr = deviceSchema[key].enum.split(",");
                        deviceSchema[key].listArr = listArr;
                    }
                    if (key === "realworldresintsystname") {
                        deviceSchema[key].listArr = integrationArr;
                    }
                }
            });

            this.setState(
                Object.assign(this.state, {
                    sysconfigDeviceSchema: sysconfigDeviceSchema,
                    sysconfigDevicePropertySchema: sysconfigDevicePropertySchema
                })
            );
        }
    }
    render() {
        const {
            activeStep,
            selectDeviceId,
            selectDeviceName,
            selectAddressName,
            selectAddressIotId,
            selectAppId,
            selectAppRespath
        } = this.props;
        const { sysconfigDeviceSchema, sysconfigDevicePropertySchema } = this.state;
        return (
            <div className="stepper-cont">
                {activeStep === 0 ? (
                    <SelectDeviceType identify={this.props.identify} showFloatTab={this.props.showFloatTab} />
                ) : (
                    <AddDeviceDetail
                        identify={this.props.identify}
                        liveSearchSelectFunc={this.props.liveSearchSelectFunc}
                        addParentDeviceIdFunc={this.props.addParentDeviceIdFunc}
                        inputSelectChangedFunc={this.props.inputSelectChangedFunc}
                        handleLocationChangedFunc={this.props.handleLocationChangedFunc}
                        sysconfigDeviceSchema={sysconfigDeviceSchema}
                        sysconfigDevicePropertySchema={sysconfigDevicePropertySchema}
                        showFloatTab={this.props.showFloatTab}
                        handleFloatTabClose={this.props.handleFloatTabClose}
                        selectDeviceId={selectDeviceId}
                        selectDeviceName={selectDeviceName}
                        selectAddressName={selectAddressName}
                        selectAddressIotId={selectAddressIotId}
                        selectAppId={selectAppId}
                        selectAppRespath={selectAppRespath}
                    />
                )}
            </div>
        );
    }
}

AddDeviceStepperCont.propTypes = {};

AddDeviceStepperCont.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        deviceTypeSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypeSchema"),
        sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema"),
        sysconfigDevicePropertySchema: filterProps(state, identify, topoReducerName, "sysconfigDevicePropertySchema"),
        sysconfigIntegrationSystems: filterProps(state, identify, topoReducerName, "sysconfigIntegrationSystems")
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeviceStepperCont);
