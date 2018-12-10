/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

/**
 * @fileOverview Here need the description for this file
 * @module EditDashaboard
 * @author LUOJIA
 * @exports {
 *  EditDashaboard
 * }
 */
import { CircularProgress, FormControl, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { checkPagenameExist } from "api/dashboardLibrary";
import PropTypes from "prop-types";
import React from "react";
// import { theme } from "modules/theme";
import { I18n } from "react-i18nify";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TextField } from "../../common/index";
import {
    duplicatePageConfig,
    editDashboardSave,
    getDahboardItem,
    updateGroup,
    updateGroupList
} from "../funcs/actions";
import { initialState, REDUCER_NAME as topoReducer } from "../funcs/constants";
import { fomaterUrl } from "../funcs/util";
import { Desc, Privacy } from "./component/groupStep";
import MoveToSelect from "./component/moveGroup";
import Dialog from "./dialog";
// import Img from "./chart.png";

const styles = Theme => ({
    editItem: {
        width: "100%",
        margin: Theme.spacing.unit * 0.5 + "px 0px " + Theme.spacing.unit + "px"
    },
    formItem: { width: "100%" },
    progress: {
        margin: Theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 25px)",
        left: "calc(50% - 25px)"
    },
    listItem: {
        padding: "0px"
    }
});

class EditDashaboard extends React.Component {
    static defaultProps = {
        mode: "",
        open: false,
        groupData: []
    };

    state = {
        loading: false,
        name: "",
        group: [],
        open: false,
        NewGroupOpen: false,
        NewGroup: "",
        groupData: [],
        cacheGroup: [],
        desc: "",
        checked: true,
        isExist: false
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChangeDesc = () => event => {
        this.setState({ desc: event.target.value });
    };
    radioHandleChange = event => {
        this.setState({ checked: !this.state.checked });
    };

    selectChange = event => {
        this.setState({
            NewGroup: "",
            group: event.target.value,
            cacheGroup: event.target.value
        });
    };

    componentWillReceiveProps(nextProps) {
        const { pageKey, pageName, mode, open, groupData } = nextProps;
        const { cacheGroup } = this.state;
        let currGroup = groupData
            .filter(item => {
                return item.page.indexOf(pageKey) !== -1;
            })
            .map(item => {
                return item.id;
            });
        this.setState({
            pageKey: pageKey,
            title: `${mode} "${pageName}"`,
            mode: mode,
            subTitle: "",
            name: pageName + "_copy",
            open: open,
            cacheGroup: open ? cacheGroup : [],
            NewGroupOpen: false,
            groupData: groupData
        });
        if (open) {
            this.setState({
                group: Array.from(new Set(cacheGroup.concat(currGroup)))
            });
        }
    }

    getIcons = () => {
        return [
            {
                name: !this.state.NewGroupOpen ? "add" : "arrow_back",
                func: () => {
                    this.setState({
                        NewGroupOpen: !this.state.NewGroupOpen,
                        desc: !this.state.NewGroupOpen ? this.state.desc : "",
                        NewGroup: !this.state.NewGroupOpen ? this.state.NewGroup : "",
                        checked: !this.state.NewGroupOpen ? this.state.checked : true
                    });
                }
            }
        ];
    };

    cancle = () => {
        this.setState(
            {
                isExist: false
            },
            () => {
                this.props.closeModalDialog("editOpen");
            }
        );
    };

    duplicateToPageEditMode = page => {
        let urlobj = {
            page,
            editMode: true
        };
        this.props.history.replace("/ccms?" + fomaterUrl(urlobj));
    };

    checkPageAvaliable = async event => {
        const { name } = this.state;
        const accountId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || `{accountid:"default"}`).accountid;
        try {
            const result = await checkPagenameExist(accountId, name === "" ? undefined : name);
            this.setState({
                isExist: result.isExist
            });
        } catch (err) {
            console.error(err);
        }
    };

    submit = () => {
        const { app } = this.props;
        let { mode, group, NewGroup, pageKey, groupData, name, checked, desc, isExist } = this.state;
        if (isExist) {
            return;
        }
        const { searchData } = this.props;
        name = name.replace(/^\s+ |\s+$/g, "");
        NewGroup = NewGroup.replace(/^\s+ |\s+$/g, "");
        let groupList = groupData.filter(item => {
            const { page, ...data } = item;
            return group.indexOf(data.id) !== -1;
        });
        if (mode !== "Move") {
            if (!name) return;
            let groupData = {
                NewGroup,
                groupList
            };
            let duplicateToPageEditMode = this.duplicateToPageEditMode;
            this.props.duplicatePageConfig(pageKey, name, groupData, duplicateToPageEditMode);
            this.props.closeModalDialog("editOpen");
        } else {
            let privacyCode = checked ? "2002" : "2001";
            if (NewGroup && pageKey) {
                this.props.updateGroup(NewGroup, [pageKey], privacyCode, desc);
            } else {
                const { searchData: conditions } = initialState;
                groupList = groupList.map(item => {
                    const { page, ...group } = item;
                    return group;
                });
                let postData = {
                    page: pageKey,
                    groups: groupList
                };
                let searchConditions = Object.assign(
                    {},
                    JSON.parse(sessionStorage.getItem("ISC-DASHBOARD-SEARCH-CONDITIONS") || `${conditions}`),
                    {
                        applicationId: app && app["address.iotTopologyId"]
                    }
                );
                this.props.updateGroupList(postData, searchConditions, true);
                this.props.closeModalDialog("editOpen");
            }
        }
        this.setState({
            NewGroup: "",
            groupData: [],
            NewGroupOpen: false
        });
    };

    render() {
        const { classes } = this.props;
        const {
            title,
            subTitle,
            open,
            mode,
            NewGroupOpen,
            groupData,
            group,
            loading,
            checked,
            desc,
            status,
            isExist
        } = this.state;
        const isLoading = loading && <CircularProgress className={classes.progress} size={50} />;
        let icons = this.getIcons();
        return (
            // <MuiThemeProvider theme={theme}>
            <Dialog
                title={title}
                cancle={this.cancle}
                submit={this.submit}
                open={open}
                subTitle={subTitle}
                mode={mode}
                icons={icons}
            >
                {isLoading}
                <div className={classes.root}>
                    {mode === "Duplicate" && (
                        <FormControl fullWidth error={isExist}>
                            <TextField
                                autoFocus
                                error={isExist}
                                label={I18n.t("modal.edit.dashboardName")}
                                name="name"
                                margin="dense"
                                value={this.state.name}
                                onChange={this.handleChange}
                                className={classes.editItem}
                                inputProps={{
                                    onBlur: event => {
                                        this.checkPageAvaliable(event);
                                    }
                                }}
                            />
                            {isExist && (
                                <FormHelperText error={isExist}>{I18n.t("modal.add.duplicateNameHint")}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                    {NewGroupOpen ? (
                        <React.Fragment>
                            <TextField
                                label={I18n.t("modal.edit.groupContent")}
                                margin="dense"
                                name="NewGroup"
                                value={this.state.NewGroup}
                                onChange={this.handleChange}
                                className={classes.editItem}
                            />
                            <Desc
                                classes={classes}
                                handleChange={this.handleChangeDesc}
                                desc={desc}
                                label={I18n.t("modal.groupManage.descLabel")}
                                mode={mode}
                            />
                            <Privacy
                                classes={classes}
                                handleChange={this.radioHandleChange}
                                status={status}
                                label={I18n.t("modal.groupManage.switchLabel")}
                                checked={checked}
                            />
                        </React.Fragment>
                    ) : (
                        <MoveToSelect
                            group={group}
                            margin="dense"
                            groupData={groupData}
                            selectChange={this.selectChange}
                            classes={classes}
                        />
                    )}
                </div>
            </Dialog>
            // </MuiThemeProvider>
        );
    }
}

EditDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        dashboardItem: state[topoReducer] && state[topoReducer].dashboardItem,
        groupData: state[topoReducer] && state[topoReducer].groupData,
        searchData: state[topoReducer] && state[topoReducer].searchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateGroup: (groupId, pages, status, desc) => {
            dispatch(updateGroup(groupId, pages, status, desc));
        },
        updateGroupList: (groupList, searchData, refresh) => {
            dispatch(updateGroupList(groupList, searchData, refresh));
        },
        getDahboardItem: pageKey => {
            dispatch(getDahboardItem(pageKey));
        },
        editDashboardSave: (dashboardItem, group) => {
            dispatch(editDashboardSave(dashboardItem, group));
        },
        duplicatePageConfig: (pageKey, name, groupData, duplicateToPageEditMode) => {
            dispatch(duplicatePageConfig(pageKey, name, groupData, duplicateToPageEditMode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(EditDashaboard)));
