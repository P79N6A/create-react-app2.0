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
 * Created by wplei on 25/05/18.
 */
import React from "react";
import { LoginSlogan, LoginBackground, LoginFooter, LoginLogo } from "./loginStatic";
// import LoginForm from "./loginForm";
import LoginForm from "./loginForm";
import "../styles/login.less";
import { SETTINGS_KEY } from "commons/constants/const";

export default class Login extends React.Component {
    componentWillMount() {
        let result = localStorage.getItem(SETTINGS_KEY);
        this.loginSetting = JSON.parse(result).settings;
    }
    render() {
        return (
            <LoginBackground
                bgProp={{
                    backgroundPic: this.loginSetting.background
                }}
            >
                <div className="login-header-brand">
                    <LoginLogo
                        logo={this.loginSetting.logo}
                        logoProp={{
                            logo: this.loginSetting.logo,
                            color: this.loginSetting.copyrightColor,
                            backgroundColor: this.loginSetting.copyrightBackgroundColor
                        }}
                    />
                </div>
                <div className="login-boby">
                    <div className="login-body-left">
                        <LoginSlogan
                            variant="h3"
                            slogan="SIngtel IOT"
                            sloganProp={{
                                color: this.loginSetting.copyrightColor
                            }}
                        />
                        <LoginForm
                            formProp={{
                                btnStyle: {
                                    backgroundColor: this.loginSetting.copyrightBackgroundColor,
                                    color: this.loginSetting.copyrightColor
                                }
                            }}
                        />
                    </div>
                    <div className="login-body-right">
                        <LoginSlogan
                            variant="h3"
                            sloganProp={{
                                color: this.loginSetting.copyrightColor
                            }}
                            slogan={this.loginSetting.message}
                        />
                    </div>
                </div>
                <LoginFooter
                    copyright={this.loginSetting.copyright}
                    footProp={{
                        color: this.loginSetting.copyrightColor,
                        backgroundColor: this.loginSetting.copyrightBackgroundColor
                    }}
                />
            </LoginBackground>
        );
    }
}
