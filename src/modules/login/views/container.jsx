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
 * Created by Wangrui on 04/06/18.
 */
import React from "react";
import LoginContent from "./loginContent.jsx";
import PropTypes from "prop-types";
// import Fade from "@material-ui/core/Fade";
import { REDUCER_NAME as authReducerName } from "../../auth/funcs/constants";
import ncsLogo from "../images/login_logo_ncs.png";
import ncsBackground from "../images/login_background_ncs.jpg";
import "../styles/login.less";
import { connect } from "react-redux";
import {
    loginAccount,
    ccmsControl,
    loginRequest,
    loginGroup,
    forgotEvent,
    getVerificationCode,
    checkVerificationCode,
    reset
} from "../../auth/funcs/actions";
import * as message from "modules/messageCenter/funcs/actions";
import { reducerName as themeReducerName, theme as themes } from "modules/theme";
import { I18n } from "react-i18nify";

import * as msg from "commons/utils/messageBus";
import { actions } from "modules/auth";
import token from "commons/utils//tokenHelper";
// import userHelper from "commons/utils/userHelper";
import store from "commons/store";
import { Redirect } from "react-router-dom";
import Expired from "./expirying";

function flatMaterialKey(materialKeys) {
    let mks = [];
    for (let key in materialKeys) {
        if (materialKeys[key].hasOwnProperty("material-key")) {
            mks.push(materialKeys[key]["material-key"]);
        }
    }
    return mks;
}

const defaultConfig = {
    theme: themes,
    logo: ncsLogo,
    backgroundImage: ncsBackground,
    copyright: "NCS Pte Ltd. All Rights Reserved.",
    title: I18n.t("login.title"),
    message: I18n.t("login.subtitle")
};
class Login extends React.Component {
    constructor() {
        super();
        // this.handleGroupChange = this.handleGroupChange.bind(this);
        this.connected = false;
        this.state = {
            configValue: defaultConfig,
            loginFlag: false,
            changePWDNow: false
        };
    }
    // componentDidMount() {
    //     this.props.onGetAccount();
    // }
    componentWillReceiveProps(nextProps) {
        const { permissions = [], isValid, materialKeys = {} } = nextProps;
        if (nextProps.isValid && !this.connected) {
            store.dispatch(msg.connect());
            this.connected = true;
        }
        const configValue = Object.assign({}, defaultConfig, nextProps.config);
        this.setState({ configValue, loginFlag: nextProps.loginFlag });
        if (isValid) {
            let flag = false,
                mks = flatMaterialKey(materialKeys) || [];
            permissions.forEach(n => {
                if (mks.includes(n)) {
                    flag = true;
                    return;
                }
            });
            if (!flag) {
                // userHelper.remove();
                token.remove();
                store.dispatch(message.error(I18n.t("login.noPermission")));
                store.dispatch(actions.updateIdentify(false));
            }
        }
    }
    componentWillUnmount = () => {
        this.connected = false;
    };
    handleSignIn = (userName, password, accountId) => {
        this.props.onSignIn(userName, password, accountId);
    };
    changePasswordHandle = flag => {
        this.setState({
            changePWDNow: flag
        });
    };
    render() {
        // document.title = "IntelliSURF";
        const { permissions = [], logincondition = null, materialKeys = [], isValid, changePWDNow } = this.props;
        const { from } = (this.props.location && this.props.location.state) || { from: { pathname: "/" } };
        const { account } = { account: { pathname: "/account" } };
        const user_expiry = {
            pathname: "/user_expiry"
        };
        // if (this.props.isValid && changePWDNow) {
        if (this.props.isValid) {
            if (logincondition && logincondition !== "NORMAL") {
                return <Redirect to={user_expiry} />;
            } else {
                const accountMK = materialKeys.length && materialKeys["ACCOUNTS_PAGE"]["material-key"];
                return <Redirect to={!permissions.includes(accountMK) ? from : account} />;
            }
        }
        const isOpen = isValid && logincondition && logincondition !== "NORMAL";
        return (
            <section className="logonPage">
                {/* <Expired
                    changePasswordHandle={this.changePasswordHandle}
                    open={isOpen}
                    reset={this.props.reset}
                    logincondition={logincondition}
                /> */}
                <LoginContent
                    {...this.props}
                    {...this.state}
                    // handleGroupChange={this.handleGroupChange}
                    handleSignIn={this.handleSignIn}
                />
            </section>
        );
    }
}
Login.propTypes = {
    account: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
};

Login.defaultProps = {
    account: [{ displayname: "Default", id: "Default" }],
    config: defaultConfig
};
const mapStateToProps = (state, ownProps) => {
    return {
        account: state[authReducerName] && state[authReducerName].account,
        verificationCode: state[authReducerName] && state[authReducerName].verificationCode,
        isCodeValidatePass: state[authReducerName] && state[authReducerName].isCodeValidatePass,
        config: state[themeReducerName] && state[themeReducerName].config,
        loginFlag: state[authReducerName] && state[authReducerName].loginFlag,
        isValid: state.identify && state.identify.isValid,
        permissions: state.identify && state.identify.permissions,
        open: state.identify && state.identify.open,
        materialKeys: state[authReducerName] && state[authReducerName].materialKeys,
        logincondition: state[authReducerName] && state[authReducerName].logincondition
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetAccount: () => {
            dispatch(loginAccount());
        },
        ccmsControl: (identify, defaultFilterLists) => {
            dispatch(ccmsControl(identify, defaultFilterLists));
        },
        onSignIn: (userName, password, accountId) => {
            dispatch(loginRequest(userName, password, accountId));
        },
        onChangeGroup: group => {
            dispatch(loginGroup(group));
        },
        onForgotEvent: group => {
            dispatch(forgotEvent(group));
        },
        success: (msg, module) => {
            dispatch(message.success(msg, module));
        },
        info: (msg, module) => {
            dispatch(message.info(msg, module));
        },
        warn: (msg, module) => {
            dispatch(message.warn(msg, module));
        },
        error: (msg, module) => {
            dispatch(message.error(msg, module));
        },
        logout: () => {
            dispatch(actions.updateIdentify(false));
        },
        forgotPassword: (email, code, captchaToken) => {
            dispatch(actions.forgotPassword(email, code, captchaToken));
        },
        getVerificationCode: () => {
            dispatch(getVerificationCode());
        },
        checkVerificationCode: (code, header) => {
            dispatch(checkVerificationCode(code, header));
        },
        reset: resetData => {
            dispatch(reset(resetData));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
