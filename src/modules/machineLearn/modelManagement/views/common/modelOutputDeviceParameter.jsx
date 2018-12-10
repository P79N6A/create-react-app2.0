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
 * Created by HuLin on 03/08/2018.
 */
import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Input, InputLabel } from "modules/common";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: "100%"
    },
    textError: {
        color: "#f44336"
    },
    expand: {
        transform: "rotate(0deg)"
    },
    expandOpen: {
        transform: "rotate(180deg)"
    }
});



class OutputDeviceParameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outputExpanded: false,
            venderName: "",
            venderNameFlag: true,
            deviceTypeName: "",
            deviceTypeNameFlag: true,
            mlOutputStructure: {},
            judgeSuccess: false
        };
    }

    handleExpandClick = name => () => {
        this.setState(state => ({ [name]: !state[name] }));
    };

    componentWillMount() {
        const { fileSwagger } = this.props;
        let outputParameters = JSON.parse(fileSwagger).definitions.output1Item.required;
        let mlOutputStructure = {};
        for(let outputParameter in outputParameters) {
            mlOutputStructure[outputParameters[outputParameter]] = outputParameters[outputParameter].replace(/\s+/g, "_");
        }
        this.setState({
            mlOutputStructure: mlOutputStructure
        });
    }

    handleChange = name => event => {
        let value = event.target.value;
        if(name === "deviceTypeName") {
            let reg = /^(Prediction-)[\w]{2,50}-[\w_]{2,50}$/;
        
            this.setState({
                deviceTypeName: value.split("-")[2]
            });
    
            if (value && reg.test(value)) {
                this.setState({ deviceTypeNameFlag: false });
            } else {
                this.setState({ deviceTypeNameFlag: true });
            }
        }else if(name === "venderName") {
            let reg = /^[\w-_]{3,20}$/;
            this.setState({
                venderName: value
            });
    
            if (value && reg.test(value)) {
                this.setState({ venderNameFlag: false});
            } else {
                this.setState({ venderNameFlag: true});
            }
        }
       
        let judgeSuccess = Boolean(this.state.venderName !== "" && !this.state.venderNameFlag && this.state.deviceTypeName !== "" && !this.state.deviceTypeNameFlag && JSON.stringify(this.state.outputParameters) !== "{}");
        this.props.judgeSuccess(judgeSuccess, this.state.venderName, this.state.deviceTypeName, this.state.mlOutputStructure);
    };

    render() {
        const { classes, fileSwagger, modelName } = this.props;
        const { deviceTypeName, deviceTypeNameFlag, venderName, venderNameFlag } = this.state;
        return (
            <div>
                <CardActions disableActionSpacing>
                    <Typography>Output Device Type Parameters</Typography>
                    <IconButton
                        className={classNames(classes.expand, {
                            [classes.expandOpen]: this.state.outputExpanded
                        })}
                        onClick={this.handleExpandClick("outputExpanded")}
                        aria-expanded={this.state.outputExpanded}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.outputExpanded} timeout="auto" unmountOnExit>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Model Vender Name</InputLabel>
                        <Input
                            type="text"
                            value={venderName}
                            error={venderNameFlag}
                            style={{ width: "95%" }}
                            placeholder="Please enter model vender name"
                            onChange={this.handleChange("venderName")}
                        />
                        {venderNameFlag ? (
                            <FormHelperText className={classes.textError}>Please enter vender name</FormHelperText>
                        ) : null}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Device Type Name</InputLabel>
                        <Input
                            type="text"
                            value={"Prediction-" + modelName + "-" + deviceTypeName}
                            error={deviceTypeNameFlag}
                            style={{ width: "95%" }}
                            placeholder="Please enter device type name"
                            onChange={this.handleChange("deviceTypeName")}
                        />
                        {deviceTypeNameFlag ? (
                            <FormHelperText className={classes.textError}>Please Device Type Name(Prediction-ModelName- is prefixed)</FormHelperText>
                        ) : null}
                    </FormControl>
                    {JSON.parse(fileSwagger) &&
                        JSON.parse(fileSwagger).definitions &&
                        JSON.parse(fileSwagger).definitions.output1Item &&
                        JSON.parse(fileSwagger).definitions.output1Item.required.map((items, indexs) => {
                            return (
                                <div
                                    key={indexs}
                                    style={{
                                        width: "100%"
                                    }}
                                >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Output Device Type Value</InputLabel>
                                        <Input type="text" value={items} readOnly style={{ width: "95%" }} />
                                    </FormControl>
                                </div>
                            );
                        })}
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(OutputDeviceParameter);
