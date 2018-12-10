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
 * Created by Wangrui on 08/06/2018.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as themeReducerName } from "../funcs/constants";
import { reducerName as authReducerName } from "modules/auth";
import { configRequest } from "../funcs/actions";
import { createMuiTheme } from "@material-ui/core/styles";
import themes from "../themes.json";
import _ from "lodash";
let configTheme = validateConfig(sessionStorage.getItem("ISC-THEME-MOCK") || {});
function validateConfig(config) {
    if (config && config !== "undefined") {
        let configVal = typeof config === "object" ? config : JSON.parse(config);
        let configvalue = createMuiTheme(_.merge(themes, configVal));
        // let configvalue= createMuiTheme(Object.assign({}, themes, configVal));
        console.log(configvalue);
        return configvalue;
    } else {
        return createMuiTheme(themes);
    }
}
class Theme extends Component {
    state = {
        theme: {}
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.group !== this.props.group) {
            this.props.onConfigTheme(nextProps.group);
            return false;
        }
        return true;
    }
    componentWillReceiveProps(newProps) {
        const themes = newProps.config.theme;
        // const group = sessionStorage.getItem("ISC-GROUP") && JSON.parse(sessionStorage.getItem("ISC-GROUP")).displayname;
        // const config = {[group]:themes};
        // const theme = localStorage.getItem("ISC-THEME") && JSON.parse(localStorage.getItem("ISC-THEME"));
        sessionStorage.setItem("ISC-THEME", JSON.stringify(themes));
        configTheme = validateConfig(JSON.stringify(themes));
    }
    render() {
        return <div />;
    }
}

Theme.defaultProps = {
    config: {
        theme: configTheme,
        copyright: "NCS Pte Ltd. All Rights Reserved.",
        title: "IoT Platform",
        message: "Please enter your login credentials"
    }
};

const mapStateToProps = state => {
    return {
        config: state[themeReducerName] && state[themeReducerName].config,
        group: state[authReducerName] && state[authReducerName].group
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConfigTheme: accountId => {
            dispatch(configRequest(accountId));
        }
    };
};
const retheme = connect(
    mapStateToProps,
    mapDispatchToProps
)(Theme);

export { configTheme, retheme };
