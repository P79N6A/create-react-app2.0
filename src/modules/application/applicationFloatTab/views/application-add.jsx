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
import AppDetail from "./application-addAppDetail";
import Button from "@material-ui/core/Button";
import { setFloatTabTitle, createApplicationRequest } from "../funcs/actions";
import AppType from "./application-addType";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
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
    state = { applicationDataObj: {}, validate: false, activeStep: 0, schema: [], disableType: false, type: "" };
    siteName =
        sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    componentDidMount() {
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
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.setDefaultState(nextProps);
    }
    setDefaultState = props => {
        const { applicationSchema, selectedData } = props,
            { address } = applicationSchema || {},
            { resourcetype } = selectedData || {},
            flag = resourcetype === "root" ? true : false,
            schema = flag ? {} : address;
        this.setState(
            {
                applicationDataObj: {},
                validate: false,
                activeStep: flag ? 0 : 1,
                disableType: !flag,
                schema,
                type: flag ? "" : { value: "address" }
            },
            () => {
                !flag && this.props.setFloatTabTitle(this.props.identify, "Add Address");
            }
        );
    };

    handleButtonClick(index) {
        const { activeStep, type, applicationDataObj } = this.state,
            { selectedData, identify } = this.props;
        if (index === 1) {
            if (activeStep === 0) {
                this.setState({ activeStep: activeStep + 1 });
            } else if (type) {
                this.props.addApplication(identify, applicationDataObj, type.value, selectedData.id);
                this.props.handleFloatTabClose(this.props.identify);
            }
        } else {
            this.setState({ activeStep: activeStep - 1 });
        }
    }

    handleAppConfigChange(data, validate) {
        // let data = { [configKey]: value };
        this.setState({
            validate,
            applicationDataObj: Object.assign({}, this.state.applicationDataObj, data)
        });
    }
    onTypeChange = type => {
        const { applicationSchema } = this.props,
            schema = applicationSchema[type.value] || {};
        this.props.setFloatTabTitle(this.props.identify, "Add " + type.label);
        this.setState({ schema, type });
    };

    render() {
        const { identify, steps } = this.props,
            { activeStep, schema, disableType, type } = this.state;
        return (
            <Card style={{ height: "calc(100% - 72px)" }}>
                <CardContent className="topo-tab" style={{ padding: "16px 24px", height: "calc(100% - 84px)" }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label} disabled={index === 0 ? disableType : false}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 ? (
                        <AppType onTypeChange={this.onTypeChange} value={type} />
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
                    <Button disabled={activeStep === 0 || disableType} onClick={this.handleButtonClick.bind(this, 0)}>
                        Back
                    </Button>
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
        applicationSchema: filterProps(state, identify, topoFloatTabReducer, "applicationSchema")
        // getDetailSuccess: filterProps(state, identify, topoFloatTabReducer, "getDetailSuccess")
        // deviceSchema: filterProps(state, identify, topoFloatTabReducer, "deviceSchema"),
        // sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        },
        addApplication: (identify, application, type, parentid) => {
            dispatch(createApplicationRequest(identify, application, type, parentid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddApplicationComp));
