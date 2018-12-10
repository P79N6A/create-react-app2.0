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
 * Created by Wangrui on 25/05/2018.
 */
import React from "react";
import { Input, Button } from "modules/common";
// import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { I18n } from "react-i18nify";
// import LoginGroup from "./loginGroup";
import FullDialog from "./fullDialog";
const DOMAINFIX = ".com.sg";
// const moduleName = "Login - Security";
class NormalLoginForm extends React.Component {
    state = {
        check: true,
        name: DOMAINFIX,
        password: "",
        nameFlag: false,
        passwordFlag: false
    };
    componentWillMount = () => {
        const { name, password } = JSON.parse(sessionStorage.getItem("ISC-GUI-LOGIN-INFO") || "{}");
        this.setState({
            name: name || "",
            password: password || ""
        });
    };
    handleClick = e => {
        e.preventDefault();
        let { loginFlag } = this.props;
        // let account = JSON.parse(sessionStorage.getItem("ACCOUNT")) || storeaccount;
        let { password, name } = this.state;
        let result = /\\/gi.exec(name);
        let domainResult, username;
        if (!result) {
            // this.props.warn(I18n.t("login.nomatchDomain"), moduleName);
            // return;
            domainResult = name;
            username = "";
        } else {
            domainResult = name.substr(0, result.index);
            // let domainResult = name.match(/@(\w+)\.com/gi);
            username = name.substr(result.index + 1);
        }

        // if (!domainResult || !username) {
        //     this.props.warn(I18n.t("login.nomatchDomain"), moduleName);
        //     return;
        // }
        // let reg = new RegExp("^" + domainResult + "$");
        // let findGroup = account.find(n => reg.test(n.displayname));
        // if (!findGroup) {
        //     this.props.warn(I18n.t("login.nomatchDomain"), moduleName);
        //     return;
        // }
        // group = findGroup.id;
        if (!loginFlag) {
            // store tenant info into session.
            // this.props.removeURLJSON();
            // sessionStorage.setItem("ISC-GROUP", JSON.stringify(username));
            this.props.handleSignIn(username, password, domainResult);
        }
    };
    handleChange = name => event => {
        const { check } = this.state;
        let value = event.target.value;
        this.setState({ [name]: value });
        let flag = `${name}Flag`;
        if (check) {
            let login_info = JSON.parse(sessionStorage.getItem("ISC-GUI-LOGIN-INFO") || "{}");
            login_info[name] = value;
            sessionStorage.setItem("ISC-GUI-LOGIN-INFO", JSON.stringify(login_info));
        }
        if (!value) {
            this.setState({ [flag]: true });
        } else {
            this.setState({ [flag]: false });
        }
    };
    handleCheckBoxChange = event => {
        !event.target.checked && sessionStorage.removeItem("ISC-GUI-LOGIN-INFO");
        this.setState({ check: event.target.checked });
    };
    handleInputKeyUp(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            this.handleClick(event);
        }
    }
    handleForgot(event) {
        event.preventDefault();
        const open = true;
        this.props.reset({ isCodeValidatePass: false });
        this.props.onForgotEvent(open);
    }
    onBlur = () => {
        // const { name } = this.state;
        // const { account = [] } = this.props;
        // let result = /\\/gi.exec(name);
        // if (!result) return;
        // let domainResult = name.substr(0, result.index);
        // if (!domainResult) return;
        // let reg = new RegExp("^" + domainResult + "$");
        // let findGroup = account.find(n => reg.test(n.displayname));
        // if (!findGroup) return;
        // const groupConfig = !findGroup ? sessionStorage.getItem("ISC-GROUP") : JSON.stringify(findGroup);
        // sessionStorage.setItem("ISC-GROUP", groupConfig);
        // this.props.handleGroupChange(findGroup.id);
    };
    render() {
        const { passwordFlag, nameFlag } = this.state;
        const { loginFlag } = this.props;
        return (
            <form className="login-form" autoComplete="off">
                {/* <FormControl className="form-item">
                    <LoginGroup {...this.props} />
                </FormControl> */}
                <FormControl className="form-item">
                    <Input
                        error={nameFlag}
                        type="text"
                        autoComplete="off"
                        value={this.state.name}
                        // placeholder="Email Address"
                        placeholder={I18n.t("login.addressPlaceholder")}
                        onChange={this.handleChange("name")}
                        style={{ width: "100%" }}
                        onKeyUp={this.handleInputKeyUp.bind(this)}
                        onBlur={this.onBlur}
                    />
                </FormControl>
                <FormControl className="form-item">
                    <Input
                        error={passwordFlag}
                        type="password"
                        value={this.state.password}
                        autoComplete="new-password"
                        placeholder={I18n.t("login.passwordPlaceholder")}
                        onKeyUp={this.handleInputKeyUp.bind(this)}
                        onChange={this.handleChange("password")}
                        style={{ width: "100%" }}
                    />
                </FormControl>
                <FormControl className="form-check form-item">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.check}
                                onChange={this.handleCheckBoxChange.bind(this)}
                                value="check"
                                className="login-checkbox"
                            />
                        }
                        label={I18n.t("login.RememberMe")}
                    />
                    <Button
                        color="secondary"
                        className="login-form-forgot"
                        size="small"
                        onClick={this.handleForgot.bind(this)}
                    >
                        {I18n.t("login.forgotPassword")}
                    </Button>
                </FormControl>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={loginFlag}
                    className="login-form-button"
                    onClick={this.handleClick.bind(this)}
                    size="small"
                >
                    {I18n.t("login.login")}
                </Button>
                <FullDialog {...this.props} />
            </form>
        );
    }
}

export default NormalLoginForm;
