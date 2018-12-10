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
 * Created by ChenLing on 9/07/2018.
 */
import React from "react";
import { TextField } from "modules/common";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import { InputLabel } from "modules/common";
import PropTypes from "prop-types";
// import { theme } from "modules/theme";
import { DatePicker } from "./common/index";
import Preview from "./preview";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import moment from "moment";
import { I18n } from "react-i18nify";
// import { Data } from "schema-based-json-editor";
const styles = theme => ({
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%"
    },
    textlabel: {
        color: "rgba(255, 255, 255, 0.54)"
    },
});
let schemaData = {      
    "sops": [   
        {         
            "fileParamName": {   
                "datatype": "string",
                "size": 128,          
                "defaultvalue": null, 
                "valueregex":".[x|X][m|M][l|L]$",
                "mandatory": true,  
                "operations": "W", 
                "units": null,  
                "multiselect": null,
                "displayname": "File",
                "buttonname": "Choose File",
                "dataname": "",
                "enum": null, 
                "comp": "file",  
                "jsonpath": ""        
            }      
        },
        {        
            "processdefinitionid": {   
                "datatype": "string",
                "size": 64,          
                "defaultvalue": null, 
                "valueregex":"",   
                "mandatory": true,  
                "operations": "R", 
                "units": null,
                "multiselect": null,
                "displayname": "SopId",
                "dataname": "processdefinitionid",  
                "enum": null, 
                "comp": "input",  
                "jsonpath": "$..['processdefinitionid']"        
            }      
        },  
        {        
            "alarmtype": 
            {          
                "datatype": "string",  
                "size": 255,
                "defaultvalue": null,
                "valueregex": "a-zA-Z0-9/",
                "mandatory": true,  
                "operations": "WR",  
                "units": null,          
                "multiselect": null, 
                "displayname":"AlarmType",
                "dataname": "alarmtype",
                "enum": null,
                "comp": "input",
                "jsonpath": "$..['alarmtype']"     
            }      
        },      
        {        
            "sopdescription": {   
                "datatype": "string",
                "size": 1024,  
                "defaultvalue": null, 
                "valueregex":"",
                "mandatory": false,  
                "operations": "RW", 
                "units": null,  
                "multiselect": null,
                "displayname": "SopDescription",
                "dataname": "sopdescription",  
                "enum": null, 
                "comp": "input",  
                "jsonpath": "$..['sopdescription']"        
            }      
        },
        {        
            "sopstime": {   
                "datatype": "string",
                "size": "",          
                "defaultvalue": null, 
                "valueregex":"a-zA-Z0-9_-\\s",   
                "mandatory": true,  
                "operations": "RW", 
                "units": null,  
                "multiselect": null,
                "displayname": "SelectTime",
                "dataname": "",  
                "enum": null, 
                "comp": "time",  
                "jsonpath": ""        
            }      
        }    
    ] 
};
class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: {
            },
            validate: {},
            helperText: {},
            filevalidate: true
        };
    };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        nextProps.reset &&
            this.setState({
                validate: {},
                helperText: {},
            });
    }
    // configKey, config[configKey].dataname,e.target.value, config[configKey].valueregex);
    fileValidate=(value)=>{
        this.setState({
            filevalidate: value
        });
        let validateArray = this.state.validate;
        // console.log(validateArray);
        let validateFlag;
        if (validateArray.length > 0) {
            validateArray.map(item=>{
                // console.log(item);
                if(item === true || value === false){
                    validateFlag = false;
                    return validateFlag;
                }
                return null;
            });
            // console.log(validate);
        }
        this.props.buttonValidate(validateFlag);
    }
    handleChange = (configKey, value, valueregex, size) => {
        // console.log("handleChange", configKey, value, valueregex, size);
        // console.log(value.length);
        this.setState(
            {
                columns: {
                    ...this.props.columns,
                    [configKey]: value
                },

            },
            () => {
                let data = this.state;
                this.props.getFormData(data.columns);
            }
        );
        let validateFlag = true;
        
        if (valueregex && value) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(value);
            this.setState({
                validate: Object.assign(this.state.validate, { [`${configKey}validate`]: !validateFlag }),
                helperText: Object.assign(this.state.helperText, {
                    [`${configKey}helperText`]: `only support ${valueregex}`
                })
            });
            if(size){
                if (value.length > size){
                    validateFlag = false;
                    this.setState({
                        validate: Object.assign(this.state.validate, { [`${configKey}validate`]: !validateFlag }),
                        helperText: Object.assign(this.state.helperText, {
                            [`${configKey}helperText`]: `Character length cannot exceed ${size}`
                        })
                    });
                };
            }
            let validate = this.state.validate;
            // console.log(validate);
            let validateArray = Object.values(validate);
            let filevalidate = this.state.filevalidate;
            // console.log(Object.keys(validate).length);
            if (validateArray.length > 0) {
                validateArray.map(item=>{
                    // console.log(item);
                    if(item === true || filevalidate === false){
                        validateFlag = false;
                        return validateFlag;
                    }
                    return null;
                });
                // console.log(validate);
            }
            // console.log(validateFlag);
            this.props.buttonValidate(validateFlag);
        }

    };
    onTimeChange = name => (date, dateString) => {
        // console.log(name)
        // console.log(date)
        // console.log("onTimeChange", dateString);
        this.setState(
            {
                columns: {
                    ...this.props.columns,
                    starttime: dateString[0],
                    endtime: dateString[1],
                    // [name]: dateString
                }
            },
            () => {
                let data = this.state;
                this.props.getFormData(data.columns);
            }
        );
    };
    TextFieldShow(type) {
        let { edit, add, view } = this.props;
        if (add) return false;
        if (view) return true;
        if (edit) {
            if (type.indexOf("W") > 0 ) {
                return false;
            } else {
                return true;
            }
        }
    };
    viewTime =(type)=>{
        // console.log(type);
        if(type === "SelectTime") {
            const dateFormat = "YYYY-MM-DD HH:mm:ss";
            const columns = this.props.columns;
            // console.log(columns);
            let starttime = moment(columns.starttime).format(dateFormat);
            let endtime = moment(columns.endtime).format(dateFormat);
            return `${starttime} ~ ${endtime}`;
        }

    }
    render() {
        // console.log(this.props);
        // const { columns } = this.state;
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        const { add, view, columns, identify,
            //  sopManagmentSchema, 
            classes} = this.props;
        const range = [
            moment(columns.starttime).format(dateFormat),
            moment(columns.endtime).format(dateFormat),
        ]; 
        // console.log(range); 
        const sysconfigDeviceSchema = schemaData.sops;
        // console.log(sopManagmentSchema);
        // const sysconfigDeviceSchema = sopManagmentSchema !== undefined && sopManagmentSchema.sops.length > 0 ? sopManagmentSchema.sops : schemaData.sops;
        // console.log(sysconfigDeviceSchema);
        // console.log(range);
        // console.log(this.state);
        return (
            <div>
                {!view && 
                    sysconfigDeviceSchema.map((config, index) => {
                        let configKey = "";
                        for (let key in config) {
                            configKey = key;
                        }
                        return config[configKey].operations && config[configKey].operations.indexOf("W") > -1 ? (
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
                                {
                                    (config[configKey].comp === "file" && add) && (
                                        <Preview 
                                            add={add}
                                            required={config[configKey].mandatory}
                                            disabled={this.TextFieldShow(config[configKey].displayname)}
                                            item={columns} identify={identify}
                                            sysconfigDeviceSchema={config[configKey]}
                                            buttonValidate={this.fileValidate}
                                        />
                                    )
                                }
                                {
                                    config[configKey].comp === "input" && <TextField
                                        className={classnames(classes.textlabel)}
                                        required = {config[configKey].mandatory}
                                        // id="Sop-Id"
                                        label={
                                            I18n.t(`sop.common.${config[configKey].displayname}`)
                                        }
                                        disabled={this.TextFieldShow(config[configKey].operations)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={columns[config[configKey].dataname] ? columns[config[configKey].dataname] : ""}
                                        onChange={e=>{this.handleChange(
                                            configKey, e.target.value, config[configKey].valueregex, config[configKey].size);
                                        }} // placeholder="Placeholder"
                                        fullWidth
                                        margin="normal"
                                        error={this.state.validate[`${configKey}validate`]}
                                        helperText={
                                            this.state.validate[`${configKey}validate`]
                                                ? this.state.helperText[`${configKey}helperText`]
                                                : ""
                                        }
                                    />
                                }
                                {
                                    config[configKey].comp === "time" && (
                                        <DatePicker
                                            style={{width: "100%"}}
                                            required = {config[configKey].mandatory}
                                            RangePickerId={`${identify}-rangePicker`}
                                            onChange={this.onTimeChange(config[configKey].displayname)}
                                            label=
                                                {I18n.t(`sop.common.${config[configKey].displayname}`)}
                                            // {config[configKey].displayname}
                                            disabled={this.TextFieldShow(config[configKey].operations)}
                                            defaultDate={range}
                                            fullWidth
                                        />
                                    )
                                }
                            </ListItem>
                        ) : 
                            (config[configKey].comp === "input" && !add) && (
                                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
                                    <TextField
                                        className={classnames(classes.textlabel)}
                                        required = {config[configKey].mandatory}
                                        // id="Sop-Id"
                                        label={I18n.t(`sop.common.${config[configKey].displayname}`)}
                                        disabled={this.TextFieldShow(config[configKey].displayname)}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        value={columns[config[configKey].dataname] ? columns[config[configKey].dataname] : ""}
                                        onChange={e=>{this.handleChange(
                                            configKey, e.target.value, config[configKey].valueregex, config[configKey].size);
                                        }}
                                        error={this.state.validate[`${configKey}validate`]}
                                        helperText={
                                            this.state.validate[`${configKey}validate`]
                                                ? this.state.helperText[`${configKey}helperText`]
                                                : ""
                                        }
                                        fullWidth
                                        margin="normal"
                                    />
                                </ListItem>
                            );
                    })
                }
                {
                    view && 
                    sysconfigDeviceSchema.map((config, index) => {
                        let configKey = "";
                        for (let key in config) {
                            configKey = key;
                        }
                        return config[configKey].operations && config[configKey].operations.indexOf("R") > -1 ? <ul style={{ padding: 0 }} key={configKey} className="info-ul">
                            
                            <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }} key={config[configKey].displayname}>
                                {
                                    config[configKey].comp === "input" && 
                                    <ListItemText

                                        primary={
                                            <span className="sopPrimary">{ I18n.t(`sop.common.${config[configKey].displayname}`)}</span>
                                        }
                                        secondary=
                                            {
                                                
                                                <span className="sopSecondary">{ columns[config[configKey].dataname]}</span>
                                            }
                                        
                                        style={{ wordBreak: "break-all" }}

                                    />
                                }
                                {
                                    config[configKey].comp === "time" && <ListItemText
                                        
                                        primary={
                                            <span className="sopPrimary">{I18n.t(`sop.common.${config[configKey].displayname}`)}</span>
                                        }

                                        secondary={<span className="sopSecondary">{this.viewTime(config[configKey].displayname)}</span>}
                                        style={{ wordBreak: "break-all" }}
                                    />
                                }
                            </ListItem>
                        </ul> : null;
                    })            
                }
            </div>
        );
    }
}
Form.propTypes = {
    // classes: PropTypes.object.isRequired,
    columns: PropTypes.object
};
Form.defaultProps = {
    // getFormData: () => {}
};
export default withStyles(styles)(Form);
