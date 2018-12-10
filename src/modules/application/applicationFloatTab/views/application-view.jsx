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
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppDetail from "./application-viewDetail";
import { getAddressDetail, setFloatTabTitle } from "../funcs/actions";
import _ from "lodash";
import jp from "jsonpath";
import { CircularProgress } from "@material-ui/core";
import { MapApplication } from "modules/map";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const styles = theme => ({
    paper: {},
    root: { backgroundColor: theme.palette.background.paper },
    footer: {
        margin: theme.spacing.unit * 0.5 + "px " + theme.spacing.unit + "px",
        textAlign: "right"
    }
});

class OverviewDeviceComp extends React.Component {
    siteName = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    state = { locationInfo: {} };
    componentDidMount() {
        this.searchAppDetail(this.props);
        // this.props.getDeviceSchema(this.props.identify, siteName, "deviceSchema");
    }

    componentWillReceiveProps(nextProps) {
        const { addressDetail } = nextProps;
        let locationInfo;
        if (!nextProps.getDetailSuccess && !nextProps.isLoading) {
            this.searchAppDetail(nextProps);
        } else if (!_.isEmpty(addressDetail)) {
            if (addressDetail && addressDetail["location.geometry"]) {
                const coordinates = jp.query(JSON.parse(addressDetail["location.geometry"]), "$..coordinates")[0];
                const locationName = addressDetail["location.name"];
                locationInfo = [
                    {
                        center: coordinates,
                        id: coordinates && `${coordinates[0]},${coordinates[1]}`,
                        lable: locationName
                    }
                ];
            } else {
                locationInfo = [];
            }
            this.setState({ locationInfo });
        }
    }

    searchAppDetail(props) {
        const { selectApplicationId, applicationType } = props;
        if (!selectApplicationId) {
            return;
        }
        this.props.setFloatTabTitle(props.identify, "Overview");
        this.props.getAddressDetail(this.props.identify, selectApplicationId, applicationType);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps, this.props)) {
            return nextProps.showFloatTab ? true : false;
        } else {
            return false;
        }
    }

    render() {
        const { identify, addressDetail, isLoading, applicationSchema } = this.props;
        const { locationInfo } = this.state;
        const { center, id } = locationInfo[0] || {};
        const recordType = addressDetail ? addressDetail["address.recordType"] : undefined;
        return (
            <Paper className="topo-tab" style={{ height: "calc(100% - 72px)" }}>
                {isLoading ? (
                    <div className="application-progress">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <React.Fragment>
                        <AppDetail
                            identify={identify}
                            deviceData={addressDetail}
                            sysconfigDeviceSchema={applicationSchema && applicationSchema[recordType]}
                        />
                        {!_.isEmpty(locationInfo) && (
                            <div style={{ height: "250px", padding: "0 24px" }}>
                                <MapApplication
                                    identify={id}
                                    dataSource={locationInfo}
                                    zoom={12}
                                    center={center}
                                    needToolBar={false}
                                />
                            </div>
                        )}
                    </React.Fragment>
                )}
            </Paper>
        );
    }
}

OverviewDeviceComp.propTypes = {};

OverviewDeviceComp.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        addressDetail: filterProps(state, identify, topoFloatTabReducer, "addressDetail"),
        applicationSchema: filterProps(state, identify, topoFloatTabReducer, "applicationSchema"),
        getDetailSuccess: filterProps(state, identify, topoFloatTabReducer, "getDetailSuccess"),
        isLoading: filterProps(state, identify, topoFloatTabReducer, "isLoadingAddressDetail")
        // deviceSchema: filterProps(state, identify, topoFloatTabReducer, "deviceSchema"),
        // sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAddressDetail: (identify, selectApplicationId, applicationType) => {
            dispatch(getAddressDetail(identify, selectApplicationId, applicationType));
        },
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        }
        // getApplicationSchema: (identify, siteName, schemaType) => {
        //     dispatch(getApplicationSchema(identify, siteName, schemaType));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OverviewDeviceComp));
