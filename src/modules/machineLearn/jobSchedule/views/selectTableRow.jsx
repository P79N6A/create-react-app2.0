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
 * Created by HuLin on 03/08/2018.
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Drawer } from "modules/common";
import CardHeader from "@material-ui/core/CardHeader";
import Icon from "@material-ui/core/Icon";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

const listHeight = 100;
const styles = theme => ({
    floatTabContainer: {
        width: "100%",
        height: "100%",
        overFlow: "hidden"
    },
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        height: "100%",
        maxHeight: `calc(${listHeight}% - 120px)`
    },
    listSection: {
        backgroundColor: "inherit"
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0
    }
});

class SelectTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: this.props.showFloatTab,
            modelInfoKey: ["Task ID", "Task Name", "Task Description", "Job Type", "Engine Type", "Created On", "Trigger User", "Job Status"],
            modelInfoValue: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.dataProcessInfo !== this.props.dataProcessInfo &&
            JSON.stringify(nextProps.dataProcessInfo) !== "{}"
        ) {
            
            let modelValue = [];
            modelValue[0] = nextProps.dataProcessInfo["taskId"];
            modelValue[1] = nextProps.dataProcessInfo["taskName"];
            modelValue[2] = nextProps.dataProcessInfo["taskDesc"];
            modelValue[3] = nextProps.dataProcessInfo["jobType"];
            modelValue[4] = nextProps.dataProcessInfo["engineType"];
            modelValue[5] = nextProps.dataProcessInfo["startJobTime"];
            modelValue[6] = nextProps.dataProcessInfo["userId"];
            modelValue[7] = nextProps.dataProcessInfo["jobStatus"];

            this.setState({
                modelInfoValue: modelValue
            });

        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });

        this.props.getDrawerValue(open);
    };

    render() {
        const { classes, anchor, refreshInfoSuccess } = this.props;
        const { modelInfoKey, modelInfoValue } = this.state;
        return (
            <Drawer
                anchor={anchor}
                open={this.props.showFloatTab}
                variant="persistent"
            >
                <div className={classes.floatTabContainer}>
                    <CardHeader
                        action={
                            <Tooltip title="Close">
                                <IconButton aria-label="Close" onClick={this.toggleDrawer("right", false)}>
                                    <Icon>clear</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        title="Jobs Overview"
                    />
                    <List className={classes.root} subheader={<li />}>
                        {!refreshInfoSuccess ? (
                            <div className="progress-cont">
                                <CircularProgress color="secondary" />
                            </div>
                        ) : (
                            modelInfoKey &&
                            modelInfoKey.map((items, indexs) => (
                                <li key={indexs} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <ListSubheader>{items}</ListSubheader>
                                        {modelInfoValue &&
                                            modelInfoValue.map((item, index) =>
                                                index === indexs ? (
                                                    <ListItem key={index}>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                ) : null
                                            )}
                                    </ul>
                                </li>
                            ))
                        )}
                    </List>
                </div>
            </Drawer>
        );
    }
}

SelectTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    showFloatTab: PropTypes.bool
};

SelectTableRow.defaultProps = {
    showFloatTab: false,
    defaultTab: 0,
    anchor: "right",
    refreshInfoSuccess: false,
    dataProcessInfo: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            refreshInfoSuccess: state[REDUCER_NAME].machineLearn.refreshInfoSuccess || false,
            dataProcessInfo: state[REDUCER_NAME].machineLearn.dataProcessInfo || {}
        };
    }
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(SelectTableRow));
