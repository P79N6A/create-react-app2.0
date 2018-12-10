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
import React from "react";
import _ from "lodash";
import { withRouter } from "react-router";
import Dialog from "../../../components/views/dialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, ListItemText, Checkbox } from "@material-ui/core";
import { TextField, Select, InputLabel, Input } from "../../../../common/index";
import { connect } from "react-redux";
import {
    updateGroup,
    updateGroupList,
    getGroupList,
    duplicatePageConfig
} from "modules/dashboardLibrary/funcs/actions";
import { REDUCER_NAME as topoReducer } from "../../funcs/constants";
import { REDUCER_NAME as boardReducer } from "modules/dashboardLibrary/funcs/constants";
import { I18n } from "react-i18nify";
import { Privacy, Desc } from "modules/dashboardLibrary/views/component/groupStep";

const styles = theme => ({
    editItem: {
        width: "100%",
        margin: theme.spacing.unit * 0.5 + "px 0px " + theme.spacing.unit + "px"
    },
    root: {
        // padding: "0 24px 24px 24px"
    },
    formItem: { width: "100%" },
    listItem: {
        padding: "0px"
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * Call server API based on HTTP DELETE
 * @example
*  <MoveToSelect
        group={group}
        groupData={groupData}
        selectChange={this.selectChange}
        classes={classes}
    />
 *
 * @param {function} selectChange
 * @param {string} group
 * @param {array} groupData
 * @param {object} classes
 * @returns ComponentList
 */
const MoveToSelect = ({ group, selectChange, classes, groupData }) => {
    return (
        <FormControl className={classes.editItem}>
            <InputLabel htmlFor="controlled-open-select">Move to</InputLabel>
            <Select
                multiple
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                value={group}
                onChange={selectChange}
                native={false}
                name="group"
            >
                {groupData.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                        <Checkbox checked={group.indexOf(item.id) > -1} />
                        <ListItemText primary={item.id} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

class EditDashaboard extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        name: "",
        group: [],
        open: false,
        NewGroupOpen: false,
        NewGroup: "",
        groupData: [],
        cacheGroup: [],
        desc: "",
        checked: true
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
            NewGroupOpen: false,
            group: event.target.value,
            cacheGroup: event.target.value
        });
    };
    componentDidMount() {
        this.props.getGroupList();
    }
    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return false;
        }
        const { pageKey, mode, open, pageConfig, groupData = [] } = nextProps;
        const { cacheGroup } = this.state;
        let currGroup = groupData
            .filter(item => {
                return item.page.indexOf(pageKey) !== -1;
            })
            .map(item => {
                return item.id;
            });
        let title = pageConfig && pageConfig.configValue ? pageConfig.configValue.title : "";
        this.setState({
            pageConfig: pageConfig,
            pageKey: pageKey,
            title: `${mode} " ${title} "`, //mode + ' "' + title + '"'
            mode: mode,
            subTitle: "",
            NewGroupOpen: false,
            name: title,
            open: open,
            cacheGroup: open ? cacheGroup : [],
            // group: currGroup,
            groupData: groupData
        });
        if (open) {
            this.setState({
                group: Array.from(new Set(cacheGroup.concat(currGroup)))
            });
        }
    }

    cancle = () => {
        let key = "";
        const { mode } = this.state;
        switch (mode) {
            case "Duplicate":
                key = "duplicate";
                break;
            case "Move":
                key = "move";
                break;
            default:
                break;
        }
        this.props.onCancel(key);
    };

    duplicateToPageEditMode = page => {
        this.props.history.replace("/ccms", {
            page,
            editMode: true
        });
    };

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

    submit = () => {
        const { mode, group, NewGroup, pageKey, groupData, name, checked, desc } = this.state;
        const { app } = this.props;
        let groupList = groupData.filter(item => {
            return group.indexOf(item.id) !== -1;
        });
        if (mode === "Duplicate") {
            let groupData = {
                NewGroup,
                groupList
            };
            let duplicateToPageEditMode = this.duplicateToPageEditMode;
            this.props.duplicatePageConfig(pageKey, name, groupData, duplicateToPageEditMode);
        } else {
            let privacyCode = checked ? "2002" : "2001";
            if (NewGroup && pageKey) {
                this.props.updateGroup(NewGroup, [pageKey], privacyCode, desc, app && app["address.iotTopologyId"]);
            } else {
                groupList = groupList.map(item => {
                    const { page, ...group } = item;
                    return group;
                });
                let postData = {
                    page: pageKey,
                    groups: groupList
                };
                this.props.updateGroupList(postData);
                this.props.onCancel(mode.toLowerCase());
            }
        }
        this.setState({
            NewGroup: "",
            groupData: [],
            NewGroupOpen: false
        });
    };
    render() {
        const { classes, open } = this.props;
        const { title, subTitle, mode, NewGroupOpen, groupData, group, desc, status, checked } = this.state;
        return (
            <Dialog
                title={title}
                onCancle={this.cancle}
                onSubmit={this.submit}
                open={open}
                subTitle={subTitle}
                mode={mode}
                icons={this.getIcons()}
            >
                <div className={classes.root}>
                    {mode === "Duplicate" ? (
                        <TextField
                            label="Dashboard Name"
                            name="name"
                            margin="dense"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className={classes.editItem}
                        />
                    ) : null}
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
        );
    }
}

EditDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        pageConfig: state[topoReducer] && state[topoReducer].pageConfig,
        groupData: state[boardReducer] && state[boardReducer].groupData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGroupList: () => {
            dispatch(getGroupList());
        },
        updateGroup: (groupId, pages, privacyCode, desc, appid) => {
            dispatch(updateGroup(groupId, pages, privacyCode, desc, appid));
        },
        updateGroupList: groupList => {
            dispatch(updateGroupList(groupList));
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
