import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TreeSelect } from "modules/common";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "modules/common";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FilterListIcon from "@material-ui/icons/FilterList";
import _ from "lodash";
import { I18n } from "react-i18nify";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 72px)"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "100%",
        overflowY: "auto"
    },
    textColor: {
        color: theme.typography.caption.color
    }
});
const getData = (dataArray = [], data) => {
    let datas = data;
    if (dataArray) {
        for (let i = 0; i < dataArray.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (dataArray[i] === data[j].columnName) {
                    datas[j].defaultSelect = true;
                    break;
                }
            }
        }
    }
    return datas;
};

class EmailMappingComp extends React.Component {
    state = {
        config: {},
        email: "",
        addEmail: false,
        regexValidate: {},
        emailList: {}
    };

    componentWillMount() {
        const { actionConfig, emailSubject, emailList } = this.props;
        this.getConfig(actionConfig, emailSubject, emailList);
    }
    componentWillReceiveProps(nextProps) {
        const { actionConfig, emailSubject, emailList } = nextProps;
        if (
            !_.isEqual(actionConfig, this.props.actionConfig) ||
            !_.isEqual(emailSubject, this.props.emailSubject) ||
            !_.isEqual(emailList, this.props.emailList)
        ) {
            this.getConfig(actionConfig, emailSubject, emailList);
        }
    }
    getConfig(actionConfig, emailSubject, emailList) {
        if (!actionConfig) {
            return;
        }
        if (
            (emailSubject && Object.keys(emailSubject).length > 0) ||
            (emailList && Object.keys(emailList).length > 0)
        ) {
            let { config } = this.state;
            const subject =
                emailSubject &&
                emailSubject.configvals &&
                emailSubject.configvals[0] &&
                emailSubject.configvals[0].configval;
            const emails =
                emailList && emailList.configvals && emailList.configvals[0] && emailList.configvals[0].configval;
            config["emailsubject"] =
                actionConfig["emailsubject"] !== undefined ? actionConfig["emailsubject"] : subject;
            config["emaillist"] =
                actionConfig["emaillist"] !== undefined ? actionConfig["emaillist"] : emails && emails.split(",");
            config["emailaction"] = actionConfig["emailaction"];
            this.setState({
                config
            });
            this.setState({ emailList });
        } else {
            this.setState({
                config: actionConfig
            });
        }
    }
    emailinput = (data, key) => {
        const { regexValidate, addEmail, email } = this.state;
        const { classes } = this.props;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <div style={{ width: "100%" }}>
                <div className="expand-add">
                    <Tooltip title={I18n.t("rule.common.expand")}>
                        <IconButton
                            aria-label={I18n.t("rule.common.expand")}
                            style={{ display: "flex", flexDirection: "flex-end" }}
                            onClick={event => this.handleAddEmail()}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {addEmail && (
                    <div className="expand-input">
                        <Tooltip title={email || ""} placement="bottom">
                            <TextField
                                color={classes.textColor}
                                label={data.displayname}
                                fullWidth
                                required={data.mandatory}
                                placeholder={data.default}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{ maxLength: data.size }}
                                disabled={operations}
                                error={regexValidate[key] || false}
                                value={email}
                                onChange={this.handleEmailChange(key)}
                                helperText={regexValidate[key] ? data.valueerror : ""}
                            />
                        </Tooltip>
                        <Tooltip title={I18n.t("rule.common.saveEmail")} >
                            <IconButton aria-label={I18n.t("rule.common.saveEmail")} onClick={this.handleSaveEmail(key, data.valueregex)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    };
    input = (data, key) => {
        let { config, regexValidate } = this.state;
        const { classes } = this.props;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <FormControl error={regexValidate[key] || false} style={{ width: "100%" }}>
                <Tooltip title={config[key] || ""} placement="bottom">
                    <TextField
                        color={classes.textColor}
                        label={data.displayname}
                        fullWidth
                        required={data.mandatory}
                        placeholder={data.default}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{ maxLength: data.size }}
                        error={regexValidate[key]||false}
                        helperText={regexValidate[key] ? data.valueerror : ""}
                        disabled={operations}
                        value={config[key]||""}
                        onChange={this.handleChange(key, data.valueregex)}
                    />
                </Tooltip>
            </FormControl>
        );
    };
    switch = (data, key) => {
        const { config } = this.state;
        if (Object.keys(config).length === 0) {
            return null;
        }
        return (
            <FormControlLabel
                control={<Switch checked={config[key]} onChange={this.handleChange(key)} value={key} />}
                label={data.displayname}
            />
        );
    };
    textarea = (data, key) => {
        let { emailTemplate } = this.props;
        const emailtemplate =
            emailTemplate &&
            emailTemplate.configvals &&
            emailTemplate.configvals[0] &&
            emailTemplate.configvals[0].configval;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <TextField
                label={data.displayname}
                fullWidth
                multiline
                required={data.mandatory}
                value={emailtemplate || ""}
                placeholder={data.default}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{ maxLength: data.size }}
                disabled={operations}
                // value={config[key]}
                // onChange={this.handleChange.bind(this, key)}
            />
        );
    };
    multiselect = (data, key) => {
        const { emailList } = this.state;
        data.enum = [];
        if (emailList && Object.keys(emailList).length > 0) {
            const emailValue = emailList.configvals[0].configval;
            data.enum = emailValue && emailValue.split(",");
        }
        // if (!data.enum) {
        //     return null;
        // }
        let emaillist = [];
        let { config } = this.state;
        for (let fkey = 0; fkey < data.enum.length; fkey++) {
            emaillist.push({
                columnName: data.enum[fkey],
                defaultSelect: false
            });
        }
        let emails = getData(config[key], emaillist);
        return (
            <TreeSelect
                selectTypeName={data.displayname}
                selectItems={emails}
                handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
            />
        );
    };
    handleColumnSelectChange(selectTypeName, selectValue) {
        const { config } = this.state;
        const selectConfig = {
            emaillist: selectValue
        };
        const currentConfig = Object.assign({}, config, selectConfig);
        this.setState({ config: currentConfig });
        const action = { email: currentConfig };
        this.props.getActionConfig(action);
    }
    handleChange = (name, regex) => event => {
        const { config } = this.state;
        let { regexValidate } = this.state;
        if (name.includes("emailaction")) {
            config[name] = event.target.checked;
        } else {
            config[name] = event.target.value;
        }
        regexValidate[name] = regexValidate[name] ? regexValidate[name]: {};
        const regEx = /\s+/g;
        let mutilEmpty = event.target.value.replace(regEx, " ");
        const reg = new RegExp("^[" + regex + "]+$");
        const isok = regex ? reg.test(mutilEmpty) : true;
        if (!isok) {
            regexValidate[name] = true;
            this.props.isSave(false);
        } else {
            this.props.isSave(true);
            regexValidate[name] = false;
        }
        this.setState({
            regexValidate,
            config
        });
        const action = { email: config };
        this.props.getActionConfig(action);
    };
    handleEmailChange = key => event => {
        let { regexValidate } = this.state;
        if (regexValidate) {
            regexValidate[key] = false;
            this.setState({
                regexValidate
            });
        }
        this.setState({
            email: event.target.value
        });
    };

    handleAddEmail = () => {
        let { addEmail } = this.state;
        this.setState({ addEmail: !addEmail });
    };
    handleSaveEmail = (key, regex) => event => {
        const { email, config, regexValidate } = this.state;
        const reg = new RegExp(regex);
        const isok = reg.test(email);
        regexValidate[key] = regexValidate[key]? regexValidate[key]: {};
        if (!isok) {
            regexValidate[key] = true;
            this.setState({
                regexValidate
            });
            return;
        } else {
            config["emaillist"] = config["emaillist"] ? config["emaillist"] : [];
            config["emaillist"].push(email);
            regexValidate[key] = false;
            this.setState({
                regexValidate
            });
            const action = { email: config };
            this.props.getActionConfig(action);
        }
        let { emailList } = this.state;
        const configvalue = emailList.configvals && emailList.configvals[0].configval;
        let value = configvalue ? `${configvalue},${email}` : email;
        const valueArr = value.split(",");
        value = Array.from(new Set(valueArr));
        emailList.configvals[0].configval = value.join();
        this.setState({ addEmail: false, email: "", emailList });
    };

    render() {
        const { data, label } = this.props;
        if (!data) {
            return null;
        }
        const type = label.includes("emailinput") ? "emailinput" : data.comp;
        switch (type) {
            case "multiselect":
                return this.multiselect(data, label);
            case "switch":
                return this.switch(data, label);
            case "emailinput":
                return this.emailinput(data, label);
            case "input":
                return this.input(data, label);
            case "textarea":
                return this.textarea(data, label);
            default:
                return this.input(data, label);
        }
    }
}
EmailMappingComp.propTypes = {
    emailList: PropTypes.object,
    emailSubject: PropTypes.object,
    emailTemplate: PropTypes.object
};

EmailMappingComp.defaultProps = {
    emailList: {},
    emailSubject: {},
    emailTemplate: {}
};
export default withStyles(styles)(EmailMappingComp);
