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
import { CardContent, Card, CardActions } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppDetail from "./application-editDetail";
import Button from "@material-ui/core/Button";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import { CircularProgress } from "@material-ui/core";
import { setFloatTabTitle, updateApplicationRequest, getAddressDetail } from "../funcs/actions";
import _ from "lodash";

const styles = theme => ({
    paper: {},
    root: { backgroundColor: theme.palette.background.paper },
    footer: {
        margin: theme.spacing.unit * 0.5 + "px " + theme.spacing.unit + "px",
        textAlign: "right"
    }
});

class AddApplicationComp extends React.Component {
    state = { applicationDataObj: {}, validate: false };
    siteName =
        sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    componentDidMount() {
        this.searchAppDetail(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getDetailSuccess || nextProps.isLoading) {
            return;
        }
        this.searchAppDetail(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)) {
            return nextProps.showFloatTab ? true : false;
        } else {
            return false;
        }
    }
    searchAppDetail(props) {
        const { selectApplicationId, applicationType } = props;
        if (!selectApplicationId || !applicationType) {
            return;
        }
        this.props.setFloatTabTitle(props.identify, "Edit " + _.capitalize(applicationType));
        this.props.getAddressDetail(this.props.identify, selectApplicationId, applicationType);
    }

    handleButtonClick(type) {
        const { identify, applicationType, selectApplicationId, addressDetail, updateApplication } = this.props;
        const { applicationDataObj } = this.state;
        type === "save" &&
            updateApplication(
                identify,
                applicationType,
                selectApplicationId,
                applicationDataObj,
                addressDetail["location.iotTopologyId"]
            );
        this.props.handleFloatTabClose(identify);
    }

    handleAppConfigChange(data, validate) {
        this.setState({
            validate,
            applicationDataObj: Object.assign({}, this.state.applicationDataObj, data)
        });
    }

    render() {
        const { isLoading, applicationSchema, addressDetail, identify } = this.props;
        const recordType = addressDetail ? addressDetail["address.recordType"] : undefined;
        return (
            <Card style={{ height: "calc(100% - 72px)" }}>
                {isLoading ? (
                    <div className="application-progress">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <React.Fragment>
                        <CardContent className="topo-tab" style={{ padding: "16px 24px", height: "calc(100% - 84px)" }}>
                            <AppDetail
                                identify={identify}
                                deviceData={addressDetail}
                                sysconfigDeviceSchema={applicationSchema ? applicationSchema[recordType] : undefined}
                                handleChange={this.handleAppConfigChange.bind(this)}
                                // reset={!this.props.showFloatTab}
                            />
                        </CardContent>
                        <CardActions style={{ justifyContent: "flex-end" }}>
                            <Button onClick={this.handleButtonClick.bind(this, "cancel")}>Cancel</Button>
                            <Button
                                variant="contained"
                                disabled={!this.state.validate}
                                onClick={this.handleButtonClick.bind(this, "save")}
                                color="secondary"
                            >
                                Save
                            </Button>
                        </CardActions>
                    </React.Fragment>
                )}
            </Card>
        );
    }
}

AddApplicationComp.propTypes = {};

AddApplicationComp.defaultProps = {};

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
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        },
        updateApplication: (identify, type, addressId, application, removeLoc) => {
            dispatch(updateApplicationRequest(identify, type, addressId, application, removeLoc));
        },
        getAddressDetail: (identify, selectApplicationId, applicationType) => {
            dispatch(getAddressDetail(identify, selectApplicationId, applicationType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddApplicationComp));
