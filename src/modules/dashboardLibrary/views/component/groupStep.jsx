import { Button, FormControlLabel, Icon, ListItem, ListItemText, Switch, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "modules/common/index";
import React from "react";
import { I18n } from "react-i18nify";

const styles = theme => ({
    formItem: { width: "100%", padding: "16px 0px 8px", "& div": { marginTop: "0px" } },
    groupStep2: {
        padding: "0px " + theme.spacing.unit * 3 + "px " + theme.spacing.unit * 3 + "px ",
        height: "354px",
        width: "700px"
    },
    goBack: {
        textAlign: "right"
    },
    button: {
        // padding: "0px"
    },
    listItem: {
        padding: "0px"
    },
    delete: {
        paddingTop: theme.spacing.unit * 4
    }
});

export const Privacy = ({ status, checked, handleChange, label, classes }) => {
    return (
        <ListItem classes={{ root: classes.listItem }}>
            <FormControlLabel
                control={
                    <Switch checked={checked} color="secondary" onChange={handleChange} value="2002" name="status" />
                }
                label={label}
            />
        </ListItem>
    );
};

export const SwitcherWithTwoLabel = ({ labelLeft, labelRight, label, checked, handleChange, classes }) => (
    <ListItem classes={{ root: classes.listItem }} button onClick={handleChange}>
        <ListItemText primary={label} />
        <Typography color={checked ? "textSecondary" : "textPrimary"}>{labelLeft}</Typography>
        <Switch checked={checked} color="secondary" onChange={handleChange} value="2002" name="status" />
        <Typography color={checked ? "textPrimary" : "textSecondary"}>{labelRight}</Typography>
    </ListItem>
);

export const Desc = ({ classes, handleChange, desc, label, mode }) => {
    return (
        <TextField
            className={classes.formItem}
            rows={4}
            rowsMax={6}
            multiline
            label={label}
            name="desc"
            value={desc}
            onChange={handleChange(mode)}
        />
    );
};

const GroupName = ({ classes, handleChange, id, label, mode }) => {
    return <TextField className={classes.formItem} label={label} name="id" value={id} onChange={handleChange(mode)} />;
};

const GoBack = ({ goBack, classes }) => {
    return (
        <Button variant="contained" color="secondary" onClick={goBack} className={classes.button}>
            <Icon>arrow_back</Icon>
            Back
        </Button>
    );
};

const ComposeAdd = ({ classes, id, desc, checked, handleChange, radioHandleChange, mode }) => {
    return (
        <React.Fragment>
            <div>
                <GroupName
                    mode={mode}
                    classes={classes}
                    handleChange={handleChange}
                    id={id}
                    label={I18n.t("modal.groupManage.groupLabel")}
                />
            </div>
            <div>
                <Desc
                    mode={mode}
                    classes={classes}
                    handleChange={handleChange}
                    desc={desc}
                    label={I18n.t("modal.groupManage.descLabel")}
                />
            </div>
            <div>
                {mode === "add" && (
                    <Privacy
                        classes={classes}
                        handleChange={radioHandleChange}
                        checked={checked}
                        label={I18n.t("modal.groupManage.switchLabel")}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

const ComposeDelete = ({ classes, id = "", dashboards = 0 }) => {
    return (
        <div className={classes.delete}>
            <Typography>
                {I18n.t("modal.groupManage.deleteFirst")
                    .replace("{0}", id)
                    .replace("{1}", dashboards)}
            </Typography>
            <Typography>{I18n.t("modal.groupManage.deleteSecond")}</Typography>
            <Typography>{I18n.t("modal.groupManage.deleteThird")}</Typography>
        </div>
    );
};

const initState = {
    status: "",
    checked: true,
    id: "",
    dashboards: 0,
    desc: "",
    modes: "",
    nameRegx: /(^\s*)|(\s*$)/g
};

class GroupStep extends React.Component {
    state = Object.assign({}, initState);
    handleChange = mode => event => {
        this.setState(
            {
                modes: mode,
                [event.target.name]: event.target.value.replace(this.state.nameRegx, "")
            },
            () => {
                this.props.getEditModeData(this.state);
            }
        );
    };
    radioHandleChange = () => {
        this.setState(
            {
                checked: !this.state.checked
            },
            () => {
                this.props.getEditModeData(this.state);
            }
        );
    };
    goBack = () => {
        this.setState(...Object.assign({}, initState), () => {
            this.props.goBack();
        });
    };
    componentDidMount() {
        const { mode, clickData } = this.props;
        this.setState(
            {
                id: clickData.id || "",
                desc: clickData.desc || "",
                modes: mode,
                dashboards: clickData.page ? clickData.page.length : 0
            },
            () => {
                this.props.getEditModeData(this.state);
            }
        );
    }
    render() {
        let { checked, desc, modes, id, dashboards } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.groupStep2}>
                <div className={classes.goBack}>
                    <GoBack classes={classes} goBack={this.goBack} />
                </div>
                {modes !== "delete" ? (
                    <div>
                        <ComposeAdd
                            radioHandleChange={this.radioHandleChange}
                            classes={classes}
                            handleChange={this.handleChange}
                            id={id}
                            desc={desc}
                            checked={checked}
                            mode={modes}
                        />
                    </div>
                ) : (
                    <ComposeDelete classes={classes} id={id} dashboards={dashboards} />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(GroupStep);
