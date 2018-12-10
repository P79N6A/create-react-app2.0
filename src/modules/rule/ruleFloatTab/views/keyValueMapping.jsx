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
 * Created by Wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import { TextField } from "modules/common";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import FormControl from "@material-ui/core/FormControl";
// let number = 0;
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 48px)"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "100%",
        overflowY: "auto",
        paddingRight: "6px"
    },
    textColor: {
        color: theme.palette.secondary.main
    },
    ruleGeneral: {
        height: "100%"
    }
});
class KeyValueMapping extends React.Component {
    constructor() {
        super();
        this.state = {
            configV: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps.values, this.props.values)) {
            return;
        }
        this.getConfigData(nextProps.values);
    }
    componentDidMount() {
        this.getConfigData(this.props.values);
    }

    getConfigData(keyValue, format) {
        if (!keyValue) {
            return;
        }
        this.setState({ configV: keyValue });
    }
    input = (config, data, type, num, flag) => {
        const defaultTitle = "";
        return (
            <FormControl  style={{width: "100%"}} key={type + num}>
                <Tooltip title={(config || defaultTitle).toString()} placement="bottom">
                    <TextField
                        placeholder={data.displayname}
                        value={config}
                        error={flag}
                        style={{ width: "90%" }}
                        helperText={flag ? data.valueerror : ""}
                        onChange={this.handleChange(type + num, data.valueregex)}
                    />
                </Tooltip>
            </FormControl>
        );
    };
    renderKeyValue = (config, data, dataType, num, flag) => {
        const type = data.comp;
        switch (type) {
            case "input":
                return this.input(config, data, dataType, num, flag);
            default:
                return this.input(config, data, dataType, num, flag);
        }
    };
    renderfirst = (config, data, num) => {
        let result = [];
        data &&
            data.forEach((item, i) => {
                for (let key in item) {
                    const dataType = key.includes("key") ? "key" : "value";
                    result.push(this.renderKeyValue(config[dataType], item[key], dataType, num, config[dataType+num]));
                }
            });
        return result;
    };
    renderItem = data => {
        let result = [];
        let { configV } = this.state;
        if (configV) {
            for (let num in configV) {
                const item = configV[num];
                result.push(
                    <div style={{ display: "flex" }} key={num}>
                        {this.renderfirst(item, data, num)}
                        <IconButton size="small" onClick={this.handleRemoveClick(num)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            }
        }
        return result;
    };
    validateName = ( config )=>{
        let saveFlag = false; 
        let keys = [];
        for(let i in config){
            keys.push(config[i].key);
            if (!config[i].key){
                saveFlag = true;
            }
        }
        if(Array.from(new Set(keys)).length !== keys.length){
            saveFlag = true;
        }
        this.props.isSave(saveFlag);
    }
    handleChange = (name, regex) => event => {
        let { configV } = this.state;
        const regEx = /\s+/g;
        let mutilEmpty = event.target.value.replace(regEx, " ");
        const reg = new RegExp("^[" + regex + "]+$");
        const isok = regex ? reg.test(mutilEmpty) : true;
        if (name.includes("key")) {
            let num = name.split("key")[1];
            configV[num] = configV[num] ? configV[num] : {};
            configV[num].key = event.target.value;
            if (!isok) {
                configV[num][name] = true;
                this.props.isSave(true);
            } else {
                configV[num][name] = false;
                this.props.isSave(false);
            }
        } else if (name.includes("value")) {
            let num = name.split("value")[1];
            configV[num] = configV[num] ? configV[num] : {};
            configV[num].value = event.target.value;
            if (!isok) {
                configV[num][name] = true;
                this.props.isSave(true);
            } else {
                configV[num][name] = false;
                this.props.isSave(false);
            }
        }
        this.setState({ configV });
        // this.validateName(configV);
        // let config = this.getKeyValueConfig(configV);
        this.props.getKeyValue(configV, this.props.keyname);
    };
    getKeyValueConfig(config) {
        let con = [];
        for (let i in config) {
            const key = config[i].key || "";
            const value = config[i].value || "";
            con.push({[key]:value});
        }
        return con;
    }
    handleAddClick = () => {
        let { configV } = this.state;
        let num = Object.keys(configV).length;
        configV[num] = { key: "", value: "" };
        this.setState({ configV });
        this.props.isSave(true);
        // let config = this.getKeyValueConfig(configV);
        this.props.getKeyValue(configV, this.props.keyname);
    };
    handleRemoveClick = name => event => {
        let { configV } = this.state;
        delete configV[name];
        this.setState({ configV });
        this.validateName(configV);
        // let config = this.getKeyValueConfig(configV);
        this.props.getKeyValue(configV, this.props.keyname);
    };
    handleCancel = event => {
        this.props.handleFloatTabClose();
    };
    generateCondition(values) {
        let itemArr = this.renderItem(values);
        return <div className="criteriaList">{itemArr && itemArr.map((i, index) => i)}</div>;
    }
    render() {
        const { data } = this.props;
        return (
            <div style={{ width: "100%", flexDirection: "column" }}>
                <div className="rule-general-condition" style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="caption" style={{ marginRight: "10px", lineHeight: "50px" }}>
                        {data.displayname}
                    </Typography>
                    <IconButton size="small" onClick={this.handleAddClick}>
                        <AddIcon />
                    </IconButton>
                </div>
                {this.generateCondition(data.values)}
            </div>
        );
    }
}

KeyValueMapping.propTypes = {
    values: PropTypes.object
};

KeyValueMapping.defaultProps = {
    values: {}
};

export default withStyles(styles)(KeyValueMapping);
