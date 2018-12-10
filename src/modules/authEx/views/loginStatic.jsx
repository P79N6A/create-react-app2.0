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
import themes from "commons/components/theme";
import Typography from "@material-ui/core/Typography";
import png from "../images/Singtel.png";
import img from "../images/Singtel-back.jpg";
import "../styles/loginLogo.less";
import "../styles/loginSlogan.less";
import "../styles/loginFooter.less";
import "../styles/loginBackground.less";

export const LoginBackground = ({ bgProp, children }) => (
    <div className="login-background" style={{ background: `url(${bgProp.backgroundPic || img})` }}>
        {children}
    </div>
);

export const LoginLogo = ({ logo, logoProp }) => (
    <div className="login-logo">
        <div className="top-line" style={logoProp} />
        <section className="brand-block">
            <img src={logo || png} alt="" />
        </section>
    </div>
);

export const LoginFooter = ({ copyright, footProp }) => (
    <section
        className="footer"
        style={{
            background: footProp.backgroundColor || themes.palette.primary.contrastText,
            color: footProp.color || themes.palette.primary.dark
        }}
    >
        <div>{copyright}</div>
    </section>
);

export const LoginSlogan = ({ variant, slogan, sloganProp }) => {
    return (
        <div className="iot-login-slogan">
            <div className="iot-slogan mainSLogan">
                {variant ? (
                    <Typography style={{ color: sloganProp.color || themes.palette.primary.light }} variant={variant}>
                        {slogan}
                    </Typography>
                ) : (
                    <Typography style={{ color: themes.palette.primary.light }}>{slogan}</Typography>
                )}
            </div>
        </div>
    );
};
