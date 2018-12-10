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
 * Created by wangrui on 25/05/18.
 */
import React from "react";
import { LoginSlogan, LoginBackgroundImage, LoginFooter, LoginLogo } from "./loginStatic";
import LoginForm from "./loginForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { view as Theme } from "modules/theme";
// import { createMuiTheme } from "@material-ui/core/styles";
// import themes from "modules/theme/themes.json";
import Loading from "./loading";
import { IscThemes } from "modules/theme/index";

export default class LoginContent extends React.Component {
    render() {
        const { configValue, loginFlag = false } = this.props;
        // const Themes = createMuiTheme(Object.assign({}, themes, configValue.theme));
        return (
            <IscThemes>
                {loginFlag && <Loading />}
                <LoginBackgroundImage
                    bgProp={{
                        backgroundPic: configValue.backgroundImage
                    }}
                />
                <Theme />
                <Card className="login-content">
                    <LoginLogo logo={configValue.logo} />
                    <CardContent
                        style={
                            {
                                // backgroundColor: Themes.palette.background.paper,
                                // color: Themes.palette.text.primary
                            }
                        }
                        className="loginContent"
                    >
                        <LoginSlogan slogan={configValue.title} subSlogn={configValue.message} />
                        <LoginForm {...this.props} />
                    </CardContent>
                </Card>
                <LoginFooter
                    copyright={configValue.copyright}
                    footProp={
                        {
                            // backgroundColor: Themes.palette.background.default,
                            // color: Themes.palette.text.primary
                        }
                    }
                />
            </IscThemes>
        );
    }
}
