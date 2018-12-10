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
import { CardContent, Card, CardActions, Stepper, Step } from "@material-ui/core";
import { StepLabel } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "modules/theme";
import AppDetail from "./addAppDetail";
import Button from "@material-ui/core/Button";
import { createApplicationRequest } from "../funcs/actions";
import AppType from "./addAppType";
import _ from "lodash";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const styles = {
    paper: {},
    root: { backgroundColor: theme.palette.background.paper },
    footer: {
        margin: theme.spacing.unit * 0.5 + "px " + theme.spacing.unit + "px",
        textAlign: "right"
    }
};

class AddApplicationComp extends React.Component {
    state = { applicationDataObj: {}, validate: false, activeStep: 0, schema: [], disableType: false, type: "" };
    siteName =
        sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    componentDidMount() {
        // const { selectedData } = this.props;
        // const title = selectedData && selectedData.resourcetype === "root" ? "Application" : "Address";
        this.setDefaultState(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)) {
            return true;
        } else {
            return false;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
            return;
        }
        if (this.props.addAppSuccess !== nextProps.addAppSuccess && nextProps.addAppSuccess) {
            this.props.handleBackTree();
        }
        // this.setDefaultState(nextProps);
    }
    setDefaultState = props => {
        const { applicationSchema, selectedData } = props;
        const { address } = applicationSchema || {};
        const { resourcetype } = selectedData || {};
        const flag = resourcetype === "root" ? true : false;
        const schema = flag ? {} : address;
        this.setState({
            applicationDataObj: {},
            validate: false,
            activeStep: flag ? 0 : 1,
            disableType: !flag,
            schema,
            type: flag ? "" : { value: "address" }
        });
    };

    handleButtonClick(index) {
        const { activeStep, type, applicationDataObj } = this.state;
        const { selectedData, identify } = this.props;
        if (index === 1) {
            if (activeStep === 0) {
                this.setState({ activeStep: activeStep + 1 });
            } else if (type) {
                this.props.addApplication(identify, applicationDataObj, type.value, selectedData.id);
                // this.props.handleBackTree();
                // this.props.handleFloatTabClose(this.props.identify);
            }
        } else if (activeStep === 1) {
            this.setState({ activeStep: activeStep - 1 });
        } else if (activeStep === 0) {
            this.props.handleBackTree();
        }
    }

    handleAppConfigChange(configKey, value, validate) {
        let data = { [configKey]: value };
        this.setState({
            validate,
            applicationDataObj: Object.assign({}, this.state.applicationDataObj, data)
        });
    }
    onTypeChange = type => {
        const { applicationSchema } = this.props;
        const schema = applicationSchema[type.value] || {};
        this.setState({ schema, type });
    };

    render() {
        const { identify, steps, selectedData } = this.props;
        const { activeStep, schema, disableType, type } = this.state;
        return (
            <Card style={{ height: "100%" }}>
                <CardContent
                    className="topo-tab"
                    style={{ padding: "16px 24px", height: "calc(100% - 60px)", overflowY: "auto" }}
                >
                    <Stepper activeStep={activeStep} style={{ padding: "24px 0" }}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label} disabled={index === 0 ? disableType : false}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 ? (
                        <AppType onTypeChange={this.onTypeChange} value={type} selectedData={selectedData} />
                    ) : (
                        <AppDetail
                            identify={identify}
                            // deviceData={this.props.addressDetail}
                            sysconfigDeviceSchema={schema || undefined}
                            handleChange={this.handleAppConfigChange.bind(this)}
                            reset={!this.props.showFloatTab}
                        />
                    )}
                </CardContent>
                <CardActions style={{ justifyContent: "flex-end" }}>
                    <Button onClick={this.handleButtonClick.bind(this, 0)}>Back</Button>
                    <Button
                        disabled={activeStep === 0 ? (type ? false : true) : !this.state.validate}
                        variant="contained"
                        onClick={this.handleButtonClick.bind(this, 1)}
                        color="secondary"
                    >
                        {activeStep === 0 ? "Next" : "Save"}
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

AddApplicationComp.propTypes = {};

AddApplicationComp.defaultProps = {
    steps: ["Select Type", "Config Information"]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        // addressDetail: filterProps(state, identify, topoFloatTabReducer, "addressDetail"),
        applicationSchema: filterProps(state, identify, topoFloatTabReducer, "applicationSchema"),
        addAppSuccess: filterProps(state, identify, topoFloatTabReducer, "addAppSuccess")
        // getDetailSuccess: filterProps(state, identify, topoFloatTabReducer, "getDetailSuccess")
        // deviceSchema: filterProps(state, identify, topoFloatTabReducer, "deviceSchema"),
        // sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addApplication: (identify, application, type, parentid, location) => {
            dispatch(createApplicationRequest(identify, application, type, parentid, location));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddApplicationComp));
