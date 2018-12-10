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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Logos from "modules/img/images/surf-logo-400.png";
const styles = theme => ({
    logo: {
        textAlign: "center",
        borderRadius: "4px 4px 0 0",
        paddingTop: "50%",
        position: "relative",
        width: "100%",
        background: "#fff"
        // height: "100%",
        // padding: theme.spacing.unit * 5,
    },
    img: {
        display: "inline-block",
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "70%",
        transform: "translate(-50%, -50%)"
    }
});

const Logo = ({ classes }) => (
    <div className={classes.logo}>
        <img className={classes.img} src={Logos} alt="" />
    </div>
);

export default withStyles(styles)(Logo);
