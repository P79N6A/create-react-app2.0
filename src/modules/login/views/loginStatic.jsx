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
import { Typography, Paper } from "@material-ui/core";

export const LoginBackgroundImage = ({ bgProp }) => (
    <div className="login-background-img" style={{ background: `url(${bgProp.backgroundPic})` }} />
);

export const LoginLogo = ({ logo }) => (
    <div className="login-logo">
        <img src={logo} alt="" />
    </div>
);

export const LoginFooter = ({ copyright, footProp }) => (
    <Paper className="footer" elevation={1}>
        <Typography >{copyright}</Typography>
    </Paper>
);

export const LoginSlogan = ({ slogan, subSlogn }) => {
    return (
        <div className="slogan">
            <div className="mainSLogan">
                <Typography variant="h6">
                    {slogan}
                    <Typography variant="caption">{subSlogn}</Typography>
                </Typography>
            </div>
        </div>
    );
};

export const AppVersion = ({ version }) => {
    return (
        <Typography
            className="version-p"
            style={{
                right: "24px",
                position: "absolute",
                bottom: "32px"
            }}
        >
            {version}
        </Typography>
    );
};
