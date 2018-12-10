import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, TreeSelect, Select, InputLabel } from "modules/common";
import Typography from "@material-ui/core/Typography";
import { TimePicker } from "antd";
import moment from "moment";
import DeviceCondition from "./deviceCondition";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import MenuItem from "@material-ui/core/MenuItem";
import { I18n } from "react-i18nify";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 72px)"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "calc(100% - 72px)",
        overflowY: "auto",
        padding: "0 24px"
    },
    textColor: {
        color: theme.typography.caption.color
    },
    group: {
        flexDirection: "row"
    },
    groupLabel: {
        marginRight: "10px"
    },
});
const getData = (dataArray, data) => {
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

class MappingComp extends React.Component {
    state = {
        config: {},
        enabled: true,
        regexValidate: {}
    };
    componentWillMount() {
        const { ruleInfoConfig, regexValidate } = this.props;
        if (Object.keys(ruleInfoConfig).length > 0 && Object.keys(ruleInfoConfig["configvalue"]).length > 0) {
            this.setState({
                config: ruleInfoConfig,
                enabled: ruleInfoConfig["configvalue"] && ruleInfoConfig["configvalue"].enabled,
                regexValidate: regexValidate || {}
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        const { ruleInfoConfig, regexValidate } = nextProps;
        if (Object.keys(ruleInfoConfig).length > 0) {
            this.setState({
                config: ruleInfoConfig,
                enabled: ruleInfoConfig["configvalue"] && ruleInfoConfig["configvalue"].enabled,
                regexValidate: regexValidate || {}
            });
        }
    }

    handleChangeTime(key, time, timeString) {
        let { config } = this.state;
        config["configvalue"][key] = time.format("HH:mm:ss ZZ");
        this.setState({ config });
        this.props.getRuleInfoConfig(config);
    }
    // handleChangeDuration(key, time, timeString) {
    //     let { config } = this.state;
    //     config["configvalue"][key] = time.format("HH:mm:ss ZZ");
    //     this.setState({ config });
    //     this.props.getRuleInfoConfig(config);
    // }
    handleColumnSelectChange(selectTypeName, selectValue) {
        const { config } = this.state;
        selectTypeName = selectTypeName.toLowerCase();
        config["configvalue"][selectTypeName] = selectValue;
        this.setState({ config: config });
        this.props.getRuleInfoConfig(config);
    }
    handleChange = (name, regex) => event => {
        const { config, regexValidate } = this.state;
        let configV = config["configvalue"];
        if (name !== "name" && name !== "description") {
            configV[name] = name === "enabled" ? event.target.checked : event.target.value;
        } else {
            config[name] = event.target.value;
        }
        if (name !== "enabled") {
            const regEx = /\s+/g;
            let mutilEmpty = event.target.value.replace(regEx, " ");
            const reg = new RegExp("^[" + regex + "]+$");
            const isok = regex ? reg.test(mutilEmpty) : true;
            if (!isok) {
                regexValidate[name] = true;
                this.setState({
                    regexValidate
                });
            } else {
                regexValidate[name] = false;
                this.setState({
                    regexValidate
                });
            }
        }
        config["configvalue"] = configV;
        this.setState({
            config: config
        });
        this.props.getRuleInfoConfig(config, regexValidate);
    };
    handleShowChange = e => {
        this.props.handleShowTime(e.target.checked);
    };
    handleDurationChange = e =>{
        this.props.handleDuration(e.target.checked);
    }
    mutilselect = (data, key) => {
        if (!data.enum) {
            return;
        }
        let frequency = [];
        let { config } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        for (let fkey = 0; fkey < data.enum.length; fkey++) {
            frequency.push({
                columnName: data.enum[fkey],
                defaultSelect: false
            });
        }
        let frequencys = getData(config["configvalue"][key], frequency);
        return (
            <TreeSelect
                selectTypeName={data.displayname}
                selectItems={frequencys}
                handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
            />
        );
    };

    singleSelect = (data, key) => {
        const {classes} = this.props;
        if (!data.enum) {
            return;
        }
        const severityMapping = {"1": I18n.t("common.Critical"),"2":I18n.t("common.Major"), "3":I18n.t("common.Minor"),"4":I18n.t("common.Info"), "5":I18n.t("common.Unknown")};
        const { config } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        return (
            <FormControl className={classes.formControl} style={{width: "100%"}}>
                <InputLabel htmlFor={key}>{data.displayname}</InputLabel>
                <Select
                    color={classes.textColor}
                    fullWidth
                    value={config["configvalue"][key] || ""}
                    onChange={this.handleChange(key, data.valueregex)}
                    inputProps={{
                        name: key,
                        id: key,
                    }}
                >
                    <MenuItem value="">
                        <em>{I18n.t("common.None")}</em>
                    </MenuItem>
                    {data.enum && data.enum.map((item, index) =>{
                        return <MenuItem key={index} value={item}>{severityMapping[item]}</MenuItem>;
                    })}
                </Select>
            </FormControl>);
    };
    input = (data, key) => {
        const { classes, updateFlag } = this.props;
        const { config, regexValidate } = this.state;
        const flag = key === "name" ? updateFlag : false;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        return (
            <FormControl error={regexValidate[key]||false} style={{width: "100%"}}>
                <Tooltip title={config[key] || config["configvalue"][key] || ""} placement="bottom">
                    <TextField
                        color={classes.textColor}
                        label={data.displayname}
                        fullWidth
                        required={data.mandatory}
                        error={regexValidate[key]}
                        helperText={regexValidate[key] ? data.valueerror : ""}
                        placeholder={data.default}
                        inputProps={{ maxLength: data.size }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled={flag}
                        value={config[key] || config["configvalue"][key] || ""}
                        onChange={this.handleChange(key, data.valueregex)}
                    />
                </Tooltip>
            </FormControl>
        );
    };
    textarea = (data, key) => {
        const { config, regexValidate } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <FormControl error={regexValidate[key]||false} style={{width: "100%"}}>
                <TextField
                    label={data.displayname}
                    fullWidth
                    multiline
                    required={data.mandatory}
                    error={regexValidate[key]}
                    helperText={regexValidate[key] ? data.valueerror : ""}
                    placeholder={data.default}
                    inputProps={{ maxLength: data.size }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    disabled={operations}
                    value={config[key] || config["configvalue"][key] || ""}
                    onChange={this.handleChange(key, data.valueregex)}
                />
            </FormControl>
        );
    };
    switch = (data, key) => {
        const { enabled } = this.state;
        return (
            <FormControlLabel
                control={<Switch checked={enabled} onChange={this.handleChange(key)} value={key} />}
                label={data.displayname}
            />
        );
    };
    timepicker = (data, key) => {
        const { config } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        return (
            <div id="timePickerSelect">
                <Typography>{data.displayname}</Typography>
                <TimePicker
                    onChange={this.handleChangeTime.bind(this, key)}
                    defaultValue={moment(data.default, "HH:mm:ss ZZ")}
                    value={moment(config["configvalue"][key], "HH:mm:ss ZZ")}
                    format={"HH:mm"}
                    getPopupContainer={() => document.getElementById("timePickerSelect")}
                />
                <Typography>{data.displayname}</Typography>
                <TimePicker
                    onChange={this.handleChangeTime.bind(this, key)}
                    defaultValue={moment(data.default, "HH:mm:ss ZZ")}
                    value={moment(config["configvalue"][key], "HH:mm:ss ZZ")}
                    format={"HH:mm"}
                    getPopupContainer={() => document.getElementById("timePickerSelect")}
                />
            </div>
        );
    };
    liveSearchSelect = (data, key) => {
        const { config } = this.state;
        const deviceConfig = (config["configvalue"] && config["configvalue"]["device"]) || {};
        return (
            <DeviceCondition
                data={data}
                getDeviceConfig={this.props.getDeviceConfig}
                identify={this.props.identify}
                deviceConfig={deviceConfig}
                sitename={this.props.sitename}
                style={{ width: "100%" }}
            />
        );
    };
    mutilswitch = (data, key) =>{
        const {classes} = this.props;
        const { config } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        return (
            <FormControl style={{ width: "100%" }}>
                <FormLabel htmlFor="mode-simple" color="secondary">Condition Level</FormLabel>
                <RadioGroup
                    aria-label="conditionlevel"
                    name="conditionlevel"
                    className={classes.group}
                    value={config["configvalue"][key]}
                    onChange={this.handleChange(key, data.valueregex)}
                >
                    { data.enum && data.enum.map(item =>{
                        return <FormControlLabel key={item} className={classes.groupLabel} value={item} control={<Radio />} label={item} />;
                    })}
                </RadioGroup>
            </FormControl>
        );
    }
    mapTimeData(data) {
        const { config } = this.state;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        let result = [];
        for (let i in data) {
            const item = data[i];
            const keyId = `time-section-${i}`;
            result.push(
                <div className="time-section" id={keyId} key={i}>
                    <Typography variant="caption" style={{ marginRight: "10px", float: "left", lineHeight: "50px" }}>
                        {item.displayname}:
                    </Typography>
                    <TimePicker
                        onChange={this.handleChangeTime.bind(this, i)}
                        defaultValue={moment(item.default, "HH:mm:ss ZZ")}
                        value={moment(config["configvalue"][i], "HH:mm:ss ZZ")}
                        format={"HH:mm"}
                        getPopupContainer={() => document.getElementById(keyId)}
                    />
                </div>
            );
        }
        return result;
    }
    MappingTime = (data, key) => {
        let { showTime } = this.props;
        let time = {};
        if (showTime) {
            time = { time_from: data["time_from"], time_to: data["time_to"] };
        } else {
            time = {};
        }
        return (
            <div className="time-section-range">
                <FormControlLabel
                    control={<Switch checked={showTime} onChange={this.handleShowChange.bind(this)} value={key} />}
                    label={data.displayname}
                />
                <div className="time-range">{this.mapTimeData(time)}</div>
            </div>
        );
    };
    
    MappingDuration = (data, key) => {
        const { config } = this.state;
        const { showDuration } = this.props;
        config["configvalue"] = config["configvalue"] ? config["configvalue"] : {};
        const inputData = data["duration_time"];
        return (
            <div className="duration-section"> 
                <FormControlLabel
                    control={<Switch checked={showDuration} onChange={this.handleDurationChange.bind(this)} value={key} />}
                    label={data.displayname}
                    className="duration-label"
                />
                {showDuration && <TextField
                    label={inputData.displayname}
                    fullWidth
                    type="number"
                    placeholder={inputData.default}
                    value={config["configvalue"] && config["configvalue"][key]}
                    onChange={this.handleChange(key, inputData.valueregex)}
                />}
            </div>
        );
    };
    render() {
        const { data, label } = this.props;
        if (label.includes("time_range")) {
            return this.MappingTime(data, label);
        }else if(label.includes("duration")){
            return this.MappingDuration(data, label);
        }
        const type = data.comp;
        switch (type) {
            case "mutilselect":
                return this.mutilselect(data, label);
            case "switch":
                return this.switch(data, label);
            case "input":
                return this.input(data, label);
            case "timepicker":
                return this.timepicker(data, label);
            case "liveSearchSelect":
                return this.liveSearchSelect(data, label);
            case "textarea":
                return this.textarea(data, label);
            case "mutilswitch":
                return this.mutilswitch(data, label);
            case "singleSelect":
                return this.singleSelect(data, label);
            default:
                return this.input(data, label);
        }
    }
}
MappingComp.propTypes = {};

export default withStyles(styles)(MappingComp);
