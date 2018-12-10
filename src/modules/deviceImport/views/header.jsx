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
 * Created by Krishalee on 26/10/18.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Uploadfile from "./importForm";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Search from "./search";
import "../styles/style.less";
import { connect } from "react-redux";
import { actions as msg } from "modules/messageCenter";
import moment from "moment";
import { getFileHistory } from "../funcs/actions";

const styles = {
    // drawer : {
    //     width:550
    // }
    root: {
        marginBottom: "10px"
    }
};

class TemporaryHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            inProgress: this.props.inProgress
        };
    }

    toggleDrawer = (side, open) => () => {
        if (open === true && this.props.inProgress === true) {
            this.props.warnMessage("Already a process running in progress, Try again after it complete.");
        } else {
            this.setState({
                [side]: open
            });
        }
    };

    refresh = () => {
        // console.log("page refresh");
        let postData = this.props.postData;
        postData.paginator.pageno = this.props.pageNo;
        postData.paginator.limit = this.props.pageLimit;

        this.setState({
            isLoading: true
        });

        let currentDatetime = new Date();
        let toDatetime = moment(currentDatetime).format("YYYY-MM-DD HH:mm:ss.SSS");
        let fromDatetime = moment(new Date(currentDatetime - 6.04e8)).format("YYYY-MM-DD HH:mm:ss.SSS");

        postData.predicate = this.props.datePredicate;
        postData.predicate.values = [fromDatetime, toDatetime];
        this.props.callFileHistory(postData);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <Typography variant="h6" className="typotitle">
                                {this.props.subTitle}
                            </Typography>
                            <Search {...this.props} />
                            <Button variant="fab" onClick={this.toggleDrawer("right", true)} className="iconButton">
                                <i className="fa fa-upload" onClick={this.toggleDrawer()} />
                            </Button>
                            <Button variant="fab" onClick={this.refresh.bind(this)} className="iconButton">
                                <i className="fa fa-refresh" onClick={this.refresh.bind(this)} />
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer("right", false)}>
                    <Uploadfile onClose={this.toggleDrawer("right", false)} {...this.props} />
                </Drawer>
            </div>
        );
    }
}

TemporaryHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        warnMessage: (val, name) => {
            dispatch(msg.warn(val, name));
        },
        callFileHistory: param => {
            dispatch(getFileHistory(param));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(TemporaryHeader));
