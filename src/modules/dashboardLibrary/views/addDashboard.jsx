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
 * @module ADDDASHBOARD
 * @author LUOJIA
 * @exports {
 *  BlankTemplate
 * }
 */

// import { theme } from "modules/theme";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    // FormControlLabel,
    // Switch
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Radio,
    Step,
    Stepper,
    Typography
} from "@material-ui/core";
// import FormItem from "./formItem";
import { withStyles } from "@material-ui/core/styles";
import { checkPagenameExist } from "api/dashboardLibrary";
import { PRIVATE, PUBLIC } from "commons/constants/const";
import { reducerName as widgetsBoardReducer } from "modules/ccms/widgetsBoard";
import { StepLabel } from "modules/common";
import React from "react";
import { I18n } from "react-i18nify";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import Select from "@material-ui/core/Select";
import { InputLabel, Select, TextField } from "../../common/index";
import { deleteTemplateRequest, getDashboardTemplate, restCurrItem, saveDashboard } from "../funcs/actions";
import { DEFAULT, HIGH, REDUCER_NAME as topoReducer } from "../funcs/constants";
// import { theme } from "modules/theme";
// import Img from "./blank.png";
import { fomaterUrl } from "../funcs/util";
import Img from "./1px.png";
import DeleteTemplate from "./component/deleteTemplate";
import { Privacy } from "./component/groupStep";
import MoveToSelect from "./component/moveGroup";
import Dialog from "./dialog";
const styles = Theme => ({
    thum: {
        height: "70px",
        width: "120px",
        display: "flex",
        background: Theme.palette.primary.main
    },
    AddboardItem: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    lineHeight: {
        // lineHeight: "2.6em"
    },
    editItem: {
        width: "100%",
        margin: Theme.spacing.unit * 0.5 + "px 0px " + Theme.spacing.unit + "px"
    },
    // group: {
    //     margin: `${Theme.spacing.unit}px 0`
    // },
    inputWidth: {
        // width: "100%",
        // marginBottom: "15px"
    },
    container: {
        "&>div": {
            paddingLeft: "0px",
            paddingRight: "0px"
        }
    },
    root: {
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    rootCenter: {
        textAlign: "center"
    },
    secondaryText: {
        height: "46px",
        paddingRight: "100px",
        overflow: "hidden"
    },
    SecondaryAction: {
        right: "-12px"
    },
    textDense: {
        "& span": {
            fontSize: "1rem!important"
        }
    },
    switch: {
        margin: "0px"
    },
    button: {
        color: Theme.palette.secondary.main,
        margin: "0px " + Theme.spacing.unit + "px"
    },
    StepLabel: {
        "& svg": {
            // color: Theme.palette.secondary.main
        }
    },
    footer: {
        margin: Theme.spacing.unit * 0.5 + "px " + Theme.spacing.unit + "px",
        textAlign: "right"
    },
    content: {
        padding: "0px " + Theme.spacing.unit * 3 + "px " + Theme.spacing.unit * 3 + "px "
    },
    group: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "&>div:first-child": {
            // flexGrow: "1",
            // marginRight: Theme.spacing.unit * 2
        },
        "&>div:last-child": {
            position: "relative",
            top: "-1px"
        }
    },
    rootIcon: {
        marginRight: Theme.spacing.unit * 3
    },
    appSelecter: {
        width: "100%"
    },
    formcontrollabel_root: {
        margin: "0 !important"
    },
    fullWidth: {
        marginBottom: Theme.spacing.unit
    }
});

/**
 * Call server API based on HTTP DELETE
 * @example
 *  <TemplateList
 *       templateDatas={templateDatas}
 *       selectedValue={selectedValue}
 *       handleChange={this.handleChange}
 *       classes={classes}
 *      name={name}
 *   />
 *
 * @param {array} templateDatas
 * @param {string} selectedValue
 * @param {function} handleChange
 * @param {string} name
 * @param {oject} classes
 * @returns Component
 */
const TemplateList = ({
    templateDatas,
    selectedValue,
    deleteTemplateHandle,
    handleChange,
    toggleHandleChange,
    name,
    classes
}) => {
    return (
        <React.Fragment>
            {templateDatas.map((template, index) => {
                let thumbnail;
                try {
                    thumbnail = template.value.pageConfig.configValue.thumbnail;
                } catch (error) {
                    thumbnail = Img;
                }
                return (
                    <ListItem
                        key={index}
                        dense
                        button
                        onClick={toggleHandleChange(template.seqId)}
                        className={classes.listItem}
                        classes={{ root: classes.root }}
                    >
                        <ListItemIcon
                            onClick={deleteTemplateHandle(template.id, template.value.title)}
                            classes={{ root: classes.rootIcon }}
                        >
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <Typography component="p" className={classes.thum}>
                            <img width="100%" height="100%" src={thumbnail} alt="" />
                        </Typography>
                        <ListItemText
                            classes={{ secondary: classes.secondaryText, root: classes.textDense }}
                            primary={template.value.title || ""}
                            secondary={template.value.desc || ""}
                        />
                        <ListItemSecondaryAction classes={{ root: classes.SecondaryAction }}>
                            <Radio
                                checked={selectedValue === String(template.seqId)}
                                onChange={handleChange}
                                value={String(template.seqId)}
                                name="tmp"
                                aria-label={template.value.title}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </React.Fragment>
    );
};

const NoTemplate = ({ classes }) => {
    return (
        <ListItem dense button className={classes.listItem} classes={{ root: classes.rootCenter }}>
            <ListItemText
                classes={{ secondary: classes.secondaryText, root: classes.textDense }}
                primary="No Template"
            />
        </ListItem>
    );
};

/**
 * Call server API based on HTTP DELETE
 * @example
 *  <TempalteSelect group={group} handleChange={this.handleChange} />
 * @param {string} group
 * @param {function} handleChange
 * @param {oject} classes
 * @returns Component
 */
const TempalteSelect = ({ templateGroup, handleChange, classes }) => {
    return (
        <FormControl className={classes.editItem}>
            <InputLabel htmlFor="controlled-open-select">{I18n.t("modal.add.selText")}</InputLabel>
            <Select value={templateGroup} onChange={handleChange} native={false} name="templateGroup">
                <MenuItem value={I18n.t("modal.add.Basic")}>{I18n.t("modal.add.Basic")}</MenuItem>
                <MenuItem value={I18n.t("modal.add.User")}>{I18n.t("modal.add.User")}</MenuItem>
            </Select>
        </FormControl>
    );
};

/**
 * Call server API based on HTTP DELETE
 * @example
 *  <BlankTemplate
 *       selectedValue={selectedValue}
 *       handleChange={this.handleChange}
 *       classes={classes}
 *   />
 * @param {string} selectedValue
 * @param {function} handleChange
 * @param {oject} classes
 * @returns Component
 */
const BlankTemplate = ({ selectedValue, handleChange, toggleHandleChange, classes }) => {
    return (
        <ListItem
            dense
            button
            key="-1"
            onClick={toggleHandleChange("-1")}
            classes={{ root: classes.root }}
            className={classes.listItem}
        >
            <div className={classes.thum}>
                <img width="100%" height="100%" src={Img} alt="" />
            </div>
            <ListItemText
                classes={{ secondary: classes.secondaryText, root: classes.textDense }}
                primary={I18n.t("modal.add.blankTitle")}
                secondary={I18n.t("modal.add.blankDesc")}
            />
            <ListItemSecondaryAction classes={{ root: classes.SecondaryAction }}>
                <Radio checked={selectedValue === "-1"} onChange={handleChange} value="-1" name="tmp" aria-label="-1" />
            </ListItemSecondaryAction>
        </ListItem>
    );
};

// step 1
const Step1 = ({
    classes,
    templateGroup,
    handleChange,
    toggleHandleChange,
    templateDatas,
    selectedValue,
    selectChange,
    deleteTemplateHandle,
    name
}) => {
    return (
        <div>
            <TempalteSelect classes={classes} templateGroup={templateGroup} handleChange={selectChange} />
            <List>
                <TemplateList
                    deleteTemplateHandle={deleteTemplateHandle}
                    toggleHandleChange={toggleHandleChange}
                    templateDatas={templateDatas}
                    selectedValue={selectedValue}
                    handleChange={handleChange}
                    classes={classes}
                    name={name}
                />
                {templateGroup === "Basic Templates" && (
                    <BlankTemplate
                        selectedValue={selectedValue}
                        toggleHandleChange={toggleHandleChange}
                        handleChange={handleChange}
                        classes={classes}
                    />
                )}
                {templateDatas.length === 0 && templateGroup !== "Basic Templates" && <NoTemplate classes={classes} />}
            </List>
        </div>
    );
};

// step 2
const Step2 = ({
    errorPageName,
    errorDesc,
    pageName,
    handleChange,
    classes,
    desc,
    group,
    groupData,
    groupSelectChange,
    NewGroup,
    NewGroupOpen,
    status,
    checked,
    radioHandleChange,
    priorityCheck,
    propritySwitchChange,
    // onApplicationChange,
    // applications,
    // noapplication,
    checkPageNameAvaliable,
    // applicationname = "",
    isExist
    // userid
}) => {
    return (
        <div>
            <FormControl
                fullWidth
                classes={{
                    fullWidth: classes.fullWidth
                }}
            >
                <TextField
                    error={errorPageName ? false : !pageName}
                    label={I18n.t("modal.add.name")}
                    name="pageName"
                    margin="dense"
                    required
                    // value={pageName}
                    // onChange={handleChange}
                    className={classes.inputWidth}
                    inputProps={{
                        onBlur: event => {
                            checkPageNameAvaliable(event);
                        }
                    }}
                />
                {isExist && <FormHelperText error={isExist}>{I18n.t("modal.add.duplicateNameHint")}</FormHelperText>}
            </FormControl>
            <FormControl
                required
                fullWidth
                classes={{
                    fullWidth: classes.fullWidth
                }}
            >
                <TextField
                    rows={2}
                    multiline
                    name="desc"
                    rowsMax={4}
                    value={desc}
                    onChange={handleChange}
                    className={classes.inputWidth}
                    error={errorDesc ? false : !desc}
                    label={I18n.t("modal.saveTemplate.desc")}
                    required
                />
            </FormControl>
            {/* <FormControl
                classes={{
                    fullWidth: classes.fullWidth
                }}
                fullWidth
                required
                error={noapplication === undefined ? false : !noapplication}
            >
                <InputLabel error={noapplication === undefined ? false : !noapplication}>{"Application"}</InputLabel>
                <Select
                    fullWidth
                    displayEmpty
                    value={applicationname}
                    name={I18n.t("modal.add.applicationLabel")}
                    error={noapplication === undefined ? false : !noapplication}
                >
                    {applications &&
                        applications.map((item, index) => {
                            return userid === "admin" ? (
                                <MenuItem
                                    key={index}
                                    onClickCapture={() =>
                                        onApplicationChange(item["address.iotTopologyId"], item["address.displayName"])
                                    }
                                    value={item["address.displayName"]}
                                >
                                    {item["address.displayName"]}
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    key={index}
                                    onClickCapture={() => onApplicationChange(item.applicationid, item.displayname)}
                                    value={item.displayname}
                                >
                                    {item.displayname}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl> */}
            <FormControl
                required
                fullWidth
                classes={{
                    fullWidth: classes.fullWidth
                }}
            >
                <MoveToSelect
                    group={group}
                    margin="dense"
                    groupData={groupData}
                    selectChange={groupSelectChange}
                    classes={classes}
                />
            </FormControl>
            <div className={classes.group}>
                <div>
                    <Privacy
                        classes={classes}
                        handleChange={radioHandleChange}
                        status={status}
                        label={I18n.t("modal.groupManage.switchLabel")}
                        checked={checked}
                        value="2002"
                    />
                </div>
                <div>
                    <ListItem classes={{ root: classes.listItem }}>
                        <FormControlLabel
                            classes={{
                                root: classes.formcontrollabel_root
                            }}
                            control={<Checkbox onChange={propritySwitchChange} value={priorityCheck} />}
                            label={I18n.t("modal.add.privacyLabel")}
                        />
                    </ListItem>
                </div>
                {NewGroupOpen && (
                    <div>
                        <TextField
                            // error={!NewGroup}
                            label={I18n.t("modal.edit.groupContent")}
                            margin="dense"
                            name="NewGroup"
                            value={NewGroup}
                            onChange={handleChange}
                            className={classes.inputWidth}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

function getSteps() {
    return ["Select a dashboard template", "Enter your dashboard detail"];
}

class AddboardItem extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        title: I18n.t("modal.add.title"),
        subTitle: I18n.t("modal.add.subTitle"),
        open: false,
        deleteOpen: false,
        isDisabled: true,
        checkedStatus: false,
        checked: [1],
        group: [],
        NewGroup: "",
        groupData: [],
        NewGroupOpen: false,
        templateGroup: I18n.t("modal.add.Basic"),
        name: I18n.t("modal.add.name"),
        selectedValue: "",
        tmp: "",
        templateDatas: [],
        state: true,
        desc: "",
        pageName: "",
        errorDesc: true,
        errorPageName: true,
        loading: false,
        activeStep: 0,
        isExist: false,
        skipped: new Set(),
        userid: "default"
    };
    componentDidMount() {
        const { app } = this.props;
        const { groups, userid } = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || "{}");
        const role = groups && groups.includes("Administrator") ? "admin" : userid;
        this.setState({
            userid: role
        });
    }
    componentWillReceiveProps(nextProps) {
        const { activeStep } = this.state;
        this.setState({
            selectedValue: "",
            isDisabled: true,
            userSubmitTemplates: nextProps.userSubmitTemplates,
            activeStep: nextProps.open ? 0 : activeStep,
            open: nextProps.open,
            desc: "",
            pageName: "",
            group: [],
            groupData: nextProps.groupData
        });
        if (nextProps.pageId) {
            let urlobj = {
                page: nextProps.pageId,
                editMode: true
            };
            this.props.restCurrItem({ pageId: "" });
            this.props.closeModalDialog("addOpen");
            this.props.history.replace("/ccms?" + fomaterUrl(urlobj));
            this.setState({
                loading: true
            });
        }
    }

    handleChange = event => {
        let value = event.target.value;
        this.setState({ selectedValue: value, isDisabled: value ? false : true });
    };

    toggleHandleChange = value => () => {
        this.setState({ selectedValue: String(value), isDisabled: String(value) ? false : true });
    };

    radioHandleChange = e => {
        this.setState({
            checkedStatus: !this.state.checkedStatus
        });
    };

    selectChange = event => {
        let value = event.target.value;
        this.setState({
            templateGroup: value,
            templateDatas: [],
            isDisabled: true,
            selectedValue: ""
        });
    };

    groupSelectChange = event => {
        if (~event.target.value.indexOf(I18n.t("modal.edit.createGroup"))) {
            this.setState({
                NewGroupOpen: true,
                group: [I18n.t("modal.edit.createGroup")]
            });
        } else {
            this.setState({
                NewGroup: "",
                NewGroupOpen: false,
                group: event.target.value
            });
        }
    };
    valueChange = event => {
        let value =
            event.target.name === "pageName" ? event.target.value.replace(/[^a-zA-Z0-9_\s]/g, "") : event.target.value;
        this.setState({
            [event.target.name]: value,
            errorPageName: event.target.name === "pageName" ? "" : true,
            errorDesc: event.target.name === "desc" ? "" : true
        });
    };

    radioChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    deleteTemplateHandle = (id, templateName) => () => {
        this.setState({
            templateName: templateName,
            deleteOpen: true,
            resourceId: id
        });
    };

    delete = () => {
        const { app } = this.props;
        const { resourceId } = this.state;
        if (resourceId) {
            this.props.deleteTemplateRequest(resourceId, (app && app["address.iotTopologyId"]) || null);
            this.onCancel();
        }
    };

    onCancel = () => {
        this.setState({
            deleteOpen: false
        });
    };

    isStepOptional = step => {
        return step === 1;
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleNext = text => () => {
        if (text === "Finish") {
            this.submit();
            return;
        }
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
            isExist: false,
            errorPageName: true,
            errorDesc: true,
            applicationname: "",
            applicationId: "",
            desc: "",
            pageName: "",
            priorityCheck: false,
            checkedStatus: false,
            group: []
        });
    };

    cancle = () => {
        this.setState(
            {
                errorPageName: true,
                errorDesc: true,
                isExist: false,
                applicationname: "",
                applicationId: "",
                checkedStatus: false
            },
            () => {
                this.props.closeModalDialog("addOpen");
            }
        );
    };

    submit = () => {
        let {
            selectedValue,
            pageName,
            desc,
            group,
            NewGroup,
            groupData,
            userSubmitTemplates,
            checkedStatus,
            priorityCheck,
            isExist
        } = this.state;
        let { app } = this.props;
        this.setState({
            errorPageName: false,
            errorDesc: false
        });
        if (!desc || !pageName || isExist) return;
        let status = checkedStatus ? PRIVATE : PUBLIC;
        let priority = priorityCheck ? HIGH : DEFAULT;
        let applicationId = (app && app["address.iotTopologyId"]) || null;
        // status = "2001";
        let groupList = groupData.filter(item => {
            const { page, ...data } = item;
            return group.indexOf(data.id) !== -1;
        });
        let groupDatas = {
            NewGroup,
            groupList
        };
        let widgets, thumbnail;
        if (selectedValue !== "-1") {
            let curr = userSubmitTemplates.find(item => {
                return item.seqId === Number(selectedValue);
            });
            if (curr) {
                const configValue = curr.value.pageConfig.configValue;
                thumbnail = configValue.thumbnail;
                widgets = configValue.widgets;
                status = configValue.status;
            }
        }
        this.props.saveDashboard(status, pageName, desc, null, widgets, thumbnail, groupDatas, priority, applicationId);
    };

    getIcons = () => {
        return [];
    };

    propritySwitchChange = event => {
        this.setState({
            priorityCheck: event.target.checked
        });
    };

    applicationChange = (appId, appName) => {
        this.setState({
            applicationId: appId,
            applicationname: appName
        });
    };

    onCheckPageNameAvaliable = async event => {
        const { pageName } = this.state;
        const newPageName = event.target.value;
        const accountId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || { accountid: "default" }).accountid;
        try {
            if (pageName === newPageName) return;
            const result = await checkPagenameExist(accountId, newPageName === "" ? undefined : newPageName);
            this.setState({
                isExist: result.isExist,
                pageName: newPageName
            });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const { classes, userSubmitTemplates, applications } = this.props;
        const {
            title,
            subTitle,
            name,
            open,
            selectedValue,
            group,
            isDisabled,
            pageName,
            desc,
            activeStep,
            templateGroup,
            groupData,
            NewGroupOpen,
            errorPageName,
            errorDesc,
            templateName,
            deleteOpen,
            loading,
            status,
            checkedStatus,
            priorityCheck,
            applicationname,
            noapplication,
            userid,
            isExist
        } = this.state;
        const steps = getSteps();
        let templateDatas = templateGroup === "Basic Templates" ? [] : userSubmitTemplates;
        return (
            // <MuiThemeProvider theme={theme}>
            <Dialog
                loading={loading}
                title={title}
                cancle={this.cancle}
                submit={this.submit}
                open={open}
                subTitle={subTitle}
                icons={this.getIcons()}
                isFooter
                noPadding
                onClose={false}
            >
                <DeleteTemplate
                    delete={this.delete}
                    templateName={templateName}
                    onCancel={this.onCancel}
                    open={deleteOpen}
                />
                <div className={classes.root}>
                    <div className={classes.content}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const props = {};
                                const labelProps = {};
                                if (this.isStepOptional(index)) {
                                    labelProps.optional = null;
                                }
                                if (this.isStepSkipped(index)) {
                                    props.completed = false;
                                }
                                return (
                                    <Step key={label} {...props}>
                                        <StepLabel className={classes.StepLabel} {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === 0 ? (
                            <Step1
                                deleteTemplateHandle={this.deleteTemplateHandle}
                                classes={classes}
                                toggleHandleChange={this.toggleHandleChange}
                                templateGroup={templateGroup}
                                handleChange={this.handleChange}
                                templateDatas={templateDatas}
                                selectedValue={selectedValue}
                                selectChange={this.selectChange}
                                name={name}
                            />
                        ) : (
                            <Step2
                                userid={userid}
                                classes={classes}
                                isExist={isExist}
                                errorPageName={errorPageName}
                                errorDesc={errorDesc}
                                pageName={pageName}
                                handleChange={this.valueChange}
                                desc={desc}
                                group={group}
                                groupData={groupData}
                                applications={applications}
                                groupSelectChange={this.groupSelectChange}
                                NewGroupOpen={NewGroupOpen}
                                status={status}
                                checked={checkedStatus}
                                radioHandleChange={this.radioHandleChange}
                                priorityCheck={priorityCheck}
                                propritySwitchChange={this.propritySwitchChange}
                                onApplicationChange={this.applicationChange}
                                applicationname={applicationname}
                                noapplication={noapplication}
                                checkPageNameAvaliable={this.onCheckPageNameAvaliable}
                            />
                        )}
                    </div>
                    <div className={classes.footer}>
                        <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            disabled={isDisabled}
                            variant="contained"
                            color="secondary"
                            onClick={this.handleNext(activeStep === steps.length - 1 ? "Finish" : "Next")}
                            // className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>
            </Dialog>
            // </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        dashboardItem: state[topoReducer] && state[topoReducer].dashboardItem,
        groupData: state[topoReducer] && state[topoReducer].groupData,
        userSubmitTemplates: state[topoReducer] && state[topoReducer].userSubmitTemplates,
        pageId: state[topoReducer] && state[topoReducer].pageId,
        applications: state[widgetsBoardReducer] && state[widgetsBoardReducer].permissionList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDashboard: (status, pageName, desc, group, widgets, thumbnail, groupDatas, priority, appid) => {
            dispatch(saveDashboard(status, pageName, desc, group, widgets, thumbnail, groupDatas, priority, appid));
        },
        getDashboardTemplate: appid => {
            dispatch(getDashboardTemplate(appid));
        },
        deleteTemplateRequest: (id, appid) => {
            dispatch(deleteTemplateRequest(id, appid));
        },
        restCurrItem: reset => {
            dispatch(restCurrItem(reset));
        }
        // getApplications: userid => {
        //     userid === "admin" ? dispatch(ccmsActions.getPermissionList()) : dispatch(getApplicationsByGroupId(userid));
        //     // dispatch(ccmsActions.getPermissionList());
        //     // dispatch(getApplicationsByGroupId(userid));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(AddboardItem)));
