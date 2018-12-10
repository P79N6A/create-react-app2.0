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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { REDUCER_NAME } from "../funcs/constants";

import { view as DataProcess } from "modules/machineLearn/jobSchedule";
import { view as ModelManagement } from "modules/machineLearn/modelManagement";
import { setOpenDrawer } from "../../modelManagement/funcs/actions";
import { setAddOpenDrawer } from "../../jobSchedule/funcs/actions";

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value }, ()=> {
            this.props.onSetAddOpenDrawer(false, 0);
            this.props.onSetOpenDrawer(false);
        });
    };

    render() {
        const { classes, ...other } = this.props;
        const { value } = this.state;
        return (
            <div className={classNames("container-machine", { [classes.paper]: true })}>
                <Card style={{
                    width: "100%",
                    height: "100%"
                }}>
                    <CardContent>
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Data Processing" />
                            <Tab label="Model Management" />
                        </Tabs>
                    </CardContent>
                    {value === 0 && <DataProcess {...other} />}
                    {value === 1 && <ModelManagement {...other} />}
                </Card>
            </div>
        );
    }
}

Jobs.propTypes = {
    title: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDrawer: open => {
            dispatch(setOpenDrawer(open, "Management"));
        },
        onSetAddOpenDrawer: (open, activeStep) => {
            dispatch(setAddOpenDrawer(open, activeStep, "machineLearn"));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Jobs));

