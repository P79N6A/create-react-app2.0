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
 * Created by HuLin on 19/10/2018.
 */
import React from "react";
import "../styles/style.less";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { setOpenDrawer, setApplicationId } from "../funcs/actions";
//import Compute from "./compute";
import Models from "./models";
//import Images from "./images";
//import Deployments from "./deployments";
//import Activities from "./activities";
import managements from "./../management.json";

//const computes = managements.modules[0];
//const { compute } = computes;
const models = managements.modules[1];
const { model } = models;
// const images = managements.modules[2];
// const { image } = images;
// const deployments = managements.modules[3];
// const { deployment } = deployments;
// const activities = managements.modules[4];
// const { activity } = activities;

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    root: {
        width: "100%",
        height: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    tabs: {
        marginLeft: theme.spacing.unit * 3
    },
    card: {
        width: "100%",
        height: "100%"
    }
});

class MachineManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value }, ()=> {
            this.props.onSetOpenDrawer(false);
        });
    };

    componentDidMount() {
        const { currentApplicationInfo: app } = this.props;
        const appid = app && app["address.iotTopologyId"];
        this.props.onSetApplicationId(appid);
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classNames("container-machineManagement", { [classes.paper]: true })}>
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={
                                value === 0
                                    ? "Models"
                                    : value === 1
                                        ? "Models"
                                        : value === 2
                                            ? "Images"
                                            : value === 3
                                                ? "Deployments"
                                                : value === 4
                                                    ? "Activities"
                                                    : "unKnow"
                            }
                        />
                        <Tabs value={value} onChange={this.handleChange} className={classes.tabs}>
                            {/* <Tab label="Compute" /> */}
                            <Tab label="Models" />
                            {/* <Tab label="Images" />
                            <Tab label="Deployments" />
                            <Tab label="Activities" /> */}
                        </Tabs>
                        {/* {value === 0 ? <Compute {...compute} /> : null} */}
                        {value === 0 ? <Models {...model} /> : null}
                        {/* {value === 2 ? <Images {...image} /> : null}
                        {value === 3 ? <Deployments {...deployment} /> : null}
                        {value === 4 ? <Activities {...activity} /> : null} */}
                    </Card>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDrawer: open => {
            dispatch(setOpenDrawer(open, props.identify));
        },
        onSetApplicationId: appid => {
            dispatch(setApplicationId(appid, props.identify));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(MachineManagement));
