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
    formatDeviceTypesBasictypeObjForView
} from "../funcs/renderSchema";
import { connect } from "react-redux";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import ViewDeviceTypeCont from "./viewDeviceTypeCont";
import ViewBasicTypeComp from "./viewBasicTypeComp";
import { getDeviceTypeDetail } from "../funcs/actions";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const styles = Theme => ({
    headerBG: {
        backgroundColor: Theme.palette.primary.light
    }
});

class ViewDeviceTypeComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentDidMount() {
        this.props.getDeviceTypeDetail(this.props.identify, this.props.selectDeviceId, this.siteName);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.sysconfigDeviceTypeSchema || !nextProps.sysconfigBasicTypes) {
            return;
        }
        if (this.props.selectDeviceId !== nextProps.selectDeviceId && nextProps.selectDeviceId) {
            this.props.getDeviceTypeDetail(this.props.identify, nextProps.selectDeviceId, this.siteName);
        }

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
        let { formatDefaultValues } = formatDeviceTypesSchemaValueForView(defaultValues, devicetypeDetail);
        let { formatAdditionalproperty } = formatDeviceTypesAdditionSchemaValueForView(
            additionalproperty,
            sysconfigDevicetypeDetail
        );

        // format basic type data obj
        let currentBasictypes = formatDeviceTypesBasictypeForView(sysconfigDevicetypeDetail);
        let formatBasicTypesDataObj = formatDeviceTypesBasictypeObjForView(currentBasictypes, sysconfigBasicTypes);

        this.setState(
            Object.assign(this.state, {
                formatDefaultValues: formatDefaultValues,
                formatAdditionalproperty: formatAdditionalproperty,
                formatBasicTypesDataObj: formatBasicTypesDataObj,
                basictypesSchema: formatBasictypesSchema
            })
        );
    }

    render() {
        const { showFloatTab, classes } = this.props;
        const { formatAdditionalproperty, formatDefaultValues, formatBasicTypesDataObj, basictypesSchema } = this.state;
        return (
            <div className="float-tab-cont" style={{ padding: "16px 0" }}>
                <div className="edit-device-type-info">
                    <ul style={{ padding: 0 }}>
                        <ListSubheader className={classes.headerBG}>Device Type Info</ListSubheader>
                        {formatDefaultValues && (
                            <ViewDeviceTypeCont
                                identify={this.props.identify}
                                showFloatTab={showFloatTab}
                                formatValues={formatDefaultValues}
                            />
                        )}
                        {formatAdditionalproperty && (
                            <ViewDeviceTypeCont
                                identify={this.props.identify}
                                showFloatTab={showFloatTab}
                                formatValues={formatAdditionalproperty}
                            />
                        )}
                    </ul>
                    {formatBasicTypesDataObj && (
                        <ViewBasicTypeComp
                            identify={this.props.identify}
                            showFloatTab={showFloatTab}
                            formatBasicTypesDataObj={formatBasicTypesDataObj}
                            basictypesSchema={basictypesSchema}
                        />
                    )}
                </div>
            </div>
        );
    }
}

ViewDeviceTypeComp.propTypes = {};

ViewDeviceTypeComp.defaultProps = {};

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
        sysconfigDevicetypeDetail: filterProps(state, identify, topoFloatTabReducer, "sysconfigDevicetypeDetail")
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDeviceTypeDetail: (identify, selectDeviceId, siteName) => {
            dispatch(getDeviceTypeDetail(identify, selectDeviceId, siteName));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ViewDeviceTypeComp));
