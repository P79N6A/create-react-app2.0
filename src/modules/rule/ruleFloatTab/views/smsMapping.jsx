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
import FilterListIcon from "@material-ui/icons/FilterList";
import FormControl from "@material-ui/core/FormControl";
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

class SMSMappingComp extends React.Component {
    state = {
        config: {},
        sms: "",
        addSMS: false,
        regexValidate: {},
        smsList: {}
    };

    componentWillMount() {
        const { actionConfig, smsList } = this.props;
        this.getConfig(actionConfig, smsList);
    }
    componentWillReceiveProps(nextProps) {
        const { actionConfig, smsList } = nextProps;
        if (!_.isEqual(actionConfig, this.props.actionConfig) || !_.isEqual(smsList, this.props.smsList)) {
            this.getConfig(actionConfig, smsList);
        }
    }
    getConfig(actionConfig, smsList) {
        let { config } = this.state;
        if (!actionConfig) {
            return;
        }
        if (smsList && Object.keys(smsList).length > 0) {
            const sms = smsList && smsList.configvals && smsList.configvals[0] && smsList.configvals[0].configval;
            config["smslist"] = actionConfig["smslist"] !== undefined ? actionConfig["smslist"] : sms && sms.split(",");
            config["smsaction"] = actionConfig["smsaction"];
            this.setState({
                config
            });
            this.setState({ smsList });
        } else {
            this.setState({
                config: actionConfig
            });
        }
    }
    SMSinput = (data, key) => {
        const { regexValidate, addSMS, sms } = this.state;
        const { classes } = this.props;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <div style={{ width: "100%" }}>
                <div className="expand-add">
                    <Tooltip title={I18n.t("rule.common.expand")}>
                        <IconButton
                            aria-label={I18n.t("rule.common.expand")}
                            style={{ display: "flex", flexDirection: "flex-end" }}
                            onClick={event => this.handleAddSMS()}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {addSMS && (
                    <div className="expand-input">
                        <Tooltip title={sms || ""} placement="bottom">
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
                                value={sms}
                                onChange={this.handleSMSChange(key)}
                                helperText={regexValidate[key] ? data.valueerror : ""}
                            />
                        </Tooltip>
                        <Tooltip title={I18n.t("rule.common.saveEmail")}>
                            <IconButton aria-label={I18n.t("rule.common.saveEmail")} onClick={this.handleSaveSMS(key, data.valueregex)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    };
    input = (data, key) => {
        const { config, regexValidate } = this.state;
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
                        disabled={operations}
                        error={regexValidate[key]||false}
                        helperText={regexValidate[key] ? data.valueerror : ""}
                        value={config[key]||""}
                        onChange={this.handleChange(key, data.valueregex)}
                    />
                </Tooltip>
            </FormControl>
        );
    };
    textarea = (data, key) => {
        const { smsTemplate } = this.props;
        const smstemplate =
            smsTemplate && smsTemplate.configvals && smsTemplate.configvals[0] && smsTemplate.configvals[0].configval;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <TextField
                label={data.displayname}
                fullWidth
                multiline
                value={smstemplate || ""}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{ maxLength: data.size }}
                disabled={operations}
            />
        );
    };
    switch = (data, key) => {
        const { config } = this.state;
        if (Object.keys(config).length === 0) {
            return null;
        }
        return (
            <FormControlLabel
                control={<Switch checked={config && config[key]} onChange={this.handleChange(key)} value={key} />}
                label={data.displayname}
            />
        );
    };
    multiselect = (data, key) => {
        let { smsList, config } = this.state;
        data.enum = [];
        if (smsList && Object.keys(smsList).length > 0) {
            const SMSValue = smsList.configvals[0].configval;
            data.enum = SMSValue && SMSValue.split(",");
        }
        // if (!data.enum) {
        //     return null;
        // }
        let smslist = [];
        for (let fkey = 0; fkey < data.enum.length; fkey++) {
            smslist.push({
                columnName: data.enum[fkey],
                defaultSelect: false
            });
        }
        let SMSs = getData(config[key], smslist);
        return (
            <TreeSelect
                selectTypeName={data.displayname}
                selectItems={SMSs}
                handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
            />
        );
    };
    handleColumnSelectChange(selectTypeName, selectValue) {
        let { config } = this.state;
        const selectConfig = {
            smslist: selectValue
        };
        const currentConfig = Object.assign({}, config, selectConfig);
        this.setState({ config: currentConfig });
        const action = { sms: currentConfig };
        this.props.getActionConfig(action);
    }
    handleChange = (name, regex) => event => {
        const { config,  regexValidate} = this.state;
        if (name.includes("smsaction")) {
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
        } else {
            regexValidate[name] = false;
        }
        this.setState({
            config,
            regexValidate
        });
        let action = {};
        action["sms"] = config;
        this.props.getActionConfig(action);
    }
    handleSMSChange = key => event => {
        const { regexValidate } = this.state;
        if (regexValidate[key]) {
            regexValidate[key] = false;
            this.setState({
                regexValidate
            });
        }
        this.setState({
            sms: event.target.value
        });
    };

    handleAddSMS = () => {
        let { addSMS } = this.state;
        this.setState({ addSMS: !addSMS });
    };
    handleSaveSMS = (key, regex) => event => {
        const { sms, config, regexValidate } = this.state;
        const reg = new RegExp("^[" + regex + "]+$");
        const isok = reg.test(sms);
        if (!isok) {
            regexValidate[key] = regexValidate[key]? regexValidate[key]: {};
            regexValidate[key] = true;
            this.setState({
                regexValidate
            });
            return;
        } else {
            config["smslist"] = config["smslist"] ? config["smslist"] : [];
            config["smslist"].push(sms);
            regexValidate[key] = false;
            this.setState({
                regexValidate
            });
            let action = {};
            action["sms"] = config;
            this.props.getActionConfig(action);
        }
        let { smsList } = this.state;
        const configvalue = smsList.configvals && smsList.configvals[0].configval;
        let value = configvalue ? `${configvalue},${sms}` : sms;
        const valueArr = value.split(",");
        value = Array.from(new Set(valueArr));
        smsList.configvals[0].configval = value.join();
        this.setState({ addSMS: false, sms: "", smsList });
    };

    render() {
        const { data, label } = this.props;
        if (!data) {
            return null;
        }
        const type = label.includes("smsinput") ? "SMSinput" : data.comp;
        switch (type) {
            case "multiselect":
                return this.multiselect(data, label);
            case "switch":
                return this.switch(data, label);
            case "SMSinput":
                return this.SMSinput(data, label);
            case "input":
                return this.input(data, label);
            case "textarea":
                return this.textarea(data, label);
            default:
                return this.input(data, label);
        }
    }
}
SMSMappingComp.propTypes = {
    smsList: PropTypes.object,
    smsTemplate: PropTypes.object
};

SMSMappingComp.defaultProps = {
    smsList: {},
    smsTemplate: {}
};
export default withStyles(styles)(SMSMappingComp);
