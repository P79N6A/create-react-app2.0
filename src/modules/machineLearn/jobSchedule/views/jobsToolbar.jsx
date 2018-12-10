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
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import Theme from "commons/components/theme";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import { setAddOpenDrawer, setReflashJobSchedule } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";

const ITEM_HEIGHT = 48;
const drawerWidth = 600;

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%"
    },
    list: {
        width: "100%",
        height: "100%"
    },
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
    }
});

class JobsToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCheck: this.props.currentCheck,
            columnConfig: this.props.columnConfig,
            anchorEl: null,
            activeColor: true,
            activeStep: 0
        };
    }

    componentWillMount = () => {
        let columnConfig = this.props.columnConfig;
        if (!columnConfig) {
            return;
        }
        this.setState(
            {
                columnConfig
            },
            () => {
                let currentCheck = [];
                for (let i = 0; i < columnConfig.length; i++) {
                    if (columnConfig[i].defaultSelect) {
                        currentCheck.push(columnConfig[i].title);
                    }
                }
                this.setState({
                    currentCheck: currentCheck
                });
            }
        );
    };

    //filter columns
    handleChange = column => {
        let currentCheck = this.state.currentCheck;
        let isChecked = false;
        for (let i = 0; i < currentCheck.length; i++) {
            if (currentCheck[i] === column) {
                isChecked = true;
                currentCheck.splice(i, 1);
            }
        }
        if (!isChecked) {
            currentCheck.push(column);
        }
        this.setState({ currentCheck: currentCheck });
        this.handleCurrentColumns(currentCheck);
    };

    handleCurrentColumns = arr => {
        let columnConfig = this.state.columnConfig;

        for (let i = 0; i < columnConfig.length; i++) {
            columnConfig[i].defaultSelect = false;
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] === columnConfig[i].title) {
                    columnConfig[i].defaultSelect = true;
                }
            }
        }

        let selectedColumn = columnConfig.filter(item => {
            return ~arr.indexOf(item.title);
        });

        this.props.handleSelectColumns(selectedColumn);
    };

    //columns menus open or close
    handleColumns = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    //columns select all or clear all
    handleAllClearClick(event) {
        let keyWord = event.target.getAttribute("data-key");
        let columnConfig = this.state.columnConfig;
        let currentCheck = [];
        if (!this.props.columnConfig) {
            return;
        }
        if (keyWord === "all") {
            for (let i = 0; i < columnConfig.length; i++) {
                currentCheck.push(columnConfig[i].title);
            }
            this.handleColumnsChange(columnConfig, currentCheck);
            this.setState(
                Object.assign(this.state, {
                    activeColor: true,
                    currentCheck: currentCheck
                })
            );
        } else if (keyWord === "clear") {
            this.handleColumnsChange(columnConfig, currentCheck);
            this.setState(
                Object.assign(this.state, {
                    activeColor: false,
                    currentCheck: currentCheck
                })
            );
        }
    }

    handleColumnsChange(columnConfig, currentCheck) {
        for (let i = 0; i < columnConfig.length; i++) {
            let isSelect = false;
            for (let j = 0; j < currentCheck.length; j++) {
                if (currentCheck[j] === columnConfig[i].title) {
                    columnConfig[i].defaultSelect = true;
                    isSelect = true;
                }
            }
            if (!isSelect) {
                columnConfig[i].defaultSelect = false;
            }
        }

        let selectedColumn = columnConfig.filter(item => {
            return ~currentCheck.indexOf(item.title);
        });
        this.props.handleSelectColumns(selectedColumn);
    }

    toggleDrawer = () => {
        let { activeStep } = this.state;
        this.props.onsetAddOpenDrawer(true, activeStep);
    };

    handleReflash = () => {
        const { pagination } = this.props;

        this.props.handleClearSelect();
  
        this.props.onSetReflashJobSchedule(
            pagination.page,
            pagination.rowsPerpage,
            pagination.orderBy,
            pagination.order
        );
        
    };

    render() {
        const { classes, numSelected } = this.props;

        const { anchorEl, columnConfig, currentCheck, activeColor } = this.state;
        const active = activeColor ? Theme.palette.secondary.dark : "";
        const inactive = activeColor ? "" : Theme.palette.secondary.dark;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
            >
                <div className={classes.title}>
                    <Typography variant="h6" id="tableTitle">
                        Data Processing
                    </Typography>
                </div>

                <div className={classes.spacer} />

                <div className="item">
                    <Tooltip title="Add">
                        <IconButton aria-label="Add" onClick={this.toggleDrawer}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <div className="item">
                    <Tooltip title="Columns">
                        <IconButton aria-label="Columns" aria-haspopup="true" onClick={this.handleColumns.bind(this)}>
                            <ViewColumnIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose.bind(this)}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                        }
                    }}
                >
                    <MenuItem key="all-clear" value="all-clear" onClick={this.handleAllClearClick.bind(this)}>
                        <ListItemText style={{ textAlign: "center" }}>
                            <span data-key="all" style={{ color: active }}>
                                Select All
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span data-key="clear" style={{ color: inactive }}>
                                Clear
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {columnConfig &&
                        columnConfig.map(item => (
                            <MenuItem key={item.title} value={item.title}>
                                <Checkbox
                                    onChange={this.handleChange.bind(this, item.title)}
                                    checked={currentCheck.includes(item.title) ? true : false}
                                />

                                <ListItemText primary={item.title} onClick={this.handleChange.bind(this, item.title)} />
                            </MenuItem>
                        ))}
                </Menu>

                <div className="item">
                    <Tooltip title="Reflash">
                        <IconButton aria-label="Reflash" onClick={this.handleReflash.bind(this)}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        );
    }
}

JobsToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

// JobsToolbar.defaultProps = {
//     pagination: {
//         page: 1,
//         rowsPerpage: 10,
//         orderBy: "taskName",
//         order: "desc"
//     }
// };

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME].machineLearn) {
        return {
            isAddOpenDrawer: state[REDUCER_NAME].machineLearn.isAddOpenDrawer,
            pagination: state[REDUCER_NAME].machineLearn.pagination
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onsetAddOpenDrawer: (open, activeStep) => {
            dispatch(setAddOpenDrawer(open, activeStep, props.identify));
        },
        onSetReflashJobSchedule: (page, rowsPerPage, orderBy, order) => {
            dispatch(setReflashJobSchedule(page, rowsPerPage, orderBy, order, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(JobsToolbar));
