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
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { deleteDataItems, deleteTypeDataItems } from "../funcs/actions";
import DeleteDialog from "./deleteDialog";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const styles = Theme => ({
    highlight: {
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.secondary.dark
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        display: "flex",
        color: Theme.palette.text.primary
    },
    title: {
        flex: "0 0 auto"
    },
    root: {
        position: "sticky",
        top: 0,
        zIndex: 1,
        color: "#fff"
    }
});
class SelectedRowInfo extends React.Component {
    state = {
        open: false
    };
    constructor(props) {
        super(props);
        this.handleConfimation = this.handleConfimation.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    handleConfimation(open) {
        this.setState({ open });
    }

    handleDeleteClick(selected) {
        let identify = this.props.identify;
        this.setState({ open: false }, () => {
            if (!this.props.checkedTab) {
                let allSelected = [];
                for (let i = 0; i < selected.length; i++) {
                    let iotId = selected[i].split("_")[0];
                    allSelected.push(iotId);
                    // this.props.deleteDataItems(identify, iotId);
                }
                this.props.deleteDataItems(identify, allSelected);
            } else {
                let allSelected = [];
                for (let i = 0; i < selected.length; i++) {
                    let iotId = selected[i].split("_")[0];
                    allSelected.push(iotId);
                    // this.props.deleteTypeDataItems(identify, iotId, this.siteName);
                }
                this.props.deleteTypeDataItems(identify, allSelected, this.siteName);
            }
        });
    }

    render() {
        const { classes, selected } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: selected.length > 0
                })}
            >
                <div className={classes.title}>
                    {selected.length > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {selected.length} selected
                        </Typography>
                    ) : null}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {selected.length > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="Delete"
                                onClick={() => {
                                    this.handleConfimation(true);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </div>
                <DeleteDialog
                    open={this.state.open}
                    type={this.props.checkedTab}
                    onClick={value => {
                        if (value) {
                            this.handleDeleteClick(selected);
                        } else {
                            this.handleConfimation(false);
                        }
                    }}
                    identify={this.props.identify}
                />
            </Toolbar>
        );
    }
}

SelectedRowInfo.defaultProps = {};

const mapDispatchToProps = dispatch => {
    return {
        deleteDataItems: (identify, iotId) => {
            dispatch(deleteDataItems(identify, iotId));
        },
        deleteTypeDataItems: (identify, iotId, siteName) => {
            dispatch(deleteTypeDataItems(identify, iotId, siteName));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(SelectedRowInfo));
