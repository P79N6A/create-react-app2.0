import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TreeSelect, Select, InputLabel } from "modules/common";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "modules/common";
import Switch from "@material-ui/core/Switch";
import KeyValueMapping from "./keyValueMapping";
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash";
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

class ApiMappingComp extends React.Component {
    state = {
        config: {},
        api: "",
        addApi: false,
        apiregexValidate: false,
        apiList: {},
        regexValidate: {}
    };

    componentWillMount() {
        const { actionConfig, actionApiNum } = this.props;
        this.getConfig(actionConfig, actionApiNum);
    }
    componentWillReceiveProps(nextProps) {
        const { actionConfig, actionApiNum } = nextProps;
        if (!_.isEqual(actionConfig, this.props.actionConfig)) {
            this.getConfig(actionConfig, actionApiNum);
        }
    }
    getConfig(actionConfig, actionApiNum) {
        // if (!actionConfig) {
        //     return;
        // }
        let actionConfigs = actionConfig ? actionConfig : {};
        this.setState({ config: actionConfigs[actionApiNum] });
    }
    input = (data, key) => {
        let { config, regexValidate } = this.state;
        const { classes } = this.props;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <FormControl error={regexValidate[key]} style={{ width: "100%" }}>
                <Tooltip title={(config && config[key]) || ""} placement="bottom">
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
                        error={regexValidate[key]}
                        helperText={regexValidate[key] ? data.valueerror : ""}
                        disabled={operations}
                        value={config && config[key]}
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
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel
                    control={<Switch checked={config && config[key]} onChange={this.handleChange(key)} value={key} />}
                    label={data.displayname}
                />
            </div>
        );
    };
    textarea = (data, key) => {
        const { config, regexValidate } = this.state;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <FormControl error={regexValidate[key]} style={{ width: "100%" }}>
                <TextField
                    label={data.displayname}
                    fullWidth
                    multiline
                    required={data.mandatory}
                    placeholder={data.default}
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{ maxLength: data.size }}
                    error={regexValidate[key]}
                    helperText={regexValidate[key] ? data.valueerror : ""}
                    disabled={operations}
                    value={(config && config[key]) || ""}
                    onChange={this.handleChange(key, data.valueregex)}
                />
            </FormControl>
        );
    };
    mutilselect = (data, key) => {
        if (!data.enum) {
            return;
        }
        let api = [];
        let { config } = this.state;
        for (let fkey = 0; fkey < data.enum.length; fkey++) {
            api.push({
                columnName: data.enum[fkey],
                defaultSelect: false
            });
        }
        let apis = getData(config && config[key], api);
        return (
            <TreeSelect
                selectTypeName={data.displayname}
                selectItems={apis}
                handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
            />
        );
    };
    select = (data, key) => {
        if (!data.enum) {
            return;
        }
        const { config } = this.state;
        const name = `single-select-${key}`;
        return (
            <FormControl className={name} style={{ width: "100%" }}>
                <InputLabel htmlFor={name}>{data.displayname}</InputLabel>
                <Select
                    value={(config && config[key]) || ""}
                    onChange={this.handleChange(key)}
                    inputProps={{
                        name: name,
                        id: name
                    }}
                    style={{ width: "100%" }}
                >
                    {data.enum &&
                        data.enum.map((item, i) => (
                            <MenuItem value={item} key={i}>
                                {item}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        );
    };

    keyvalue = (data, key) => {
        const { config } = this.state;
        return (
            <KeyValueMapping
                values={config && config[key]}
                keyname={key}
                data={data}
                getKeyValue={this.getKeyValue.bind(this)}
                isSave={this.props.isSave}
            />
        );
    };
    handleColumnSelectChange(selectTypeName, selectValue) {
        const { config } = this.state;
        selectTypeName = selectTypeName.toLowerCase().replace(/\s*/g, "");
        config[selectTypeName] = selectValue;
        this.setState({ config });
        this.callActionConfig(config);
    }
    callActionConfig(config) {
        const { actionConfig, actionApiNum } = this.props;
        actionConfig[actionApiNum] = config;
        let action = {
            api: {
                apis: actionConfig
            }
        };
        this.props.getActionConfig(action);
    }
    handleChange = (name, regex) => event => {
        const { config, regexValidate } = this.state;
        if (name.includes("apiaction")) {
            return;
        } else {
            config[name] = event.target.value;
        }
        this.callActionConfig(config);
        this.setState({
            config
        });
        const reg = new RegExp("^[" + regex + "]+$");
        const isok = regex ? reg.test(event.target.value) : true;
        if (!isok) {
            regexValidate[name] = true;
            this.props.isSave(false);
        } else {
            regexValidate[name] = false;
            this.props.isSave(true);
        }
        this.setState({
            regexValidate
        });
    };
  
    getKeyValue = (data, key) => {
        let { config } = this.state;
        config[key] = data;
        this.setState({ config });
        this.callActionConfig(config);
    };
    handleApiChange = event => {
        const { apiregexValidate } = this.state;
        if (apiregexValidate) {
            this.setState({
                apiregexValidate: false
            });
        }
        this.setState({
            api: event.target.value
        });
    };

    render() {
        const { data, label } = this.props;
        if (!data) {
            return null;
        }
        const type = data.values ? "keyvalue" : data.comp;
        switch (type) {
            case "mutilselect":
                return this.mutilselect(data, label);
            case "select":
                return this.select(data, label);
            case "switch":
                return this.switch(data, label);
            case "input":
                return this.input(data, label);
            case "keyvalue":
                return this.keyvalue(data, label);
            case "textarea":
                return this.textarea(data, label);
            default:
                return this.input(data, label);
        }
    }
}
ApiMappingComp.propTypes = {
    apiConfig: PropTypes.object,
    actionApiNum: PropTypes.number
};

ApiMappingComp.defaultProps = {
    apiConfig: {}
    // actionApiNum: 0
};

export default withStyles(styles)(ApiMappingComp);
