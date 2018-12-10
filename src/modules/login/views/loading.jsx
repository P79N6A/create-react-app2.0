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
 * Created by Jia Luo on 27/07/2018.
 */
/**
 * loading component show request api
 * @example
 *
 * @returns Component
 */
import React from "react";
import { CircularProgress } from "@material-ui/core";
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 20px)",
        left: "calc(50% - 50px)",
        color: theme.palette.secondary.main,
        zIndex: "2000"
    },
    progressDialog: {
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        position: "fixed",
        // left: 0,
        background: "rgba(0,0,0,0.2)",
        zIndex: 1330
    },
    full: {
        width: "100%",
        height: "100%",
        opacity: 0
    }
});
class Loading extends React.Component {
    state = {};
    render() {
        const { classes } = this.props;
        return (
            <div>
                <CircularProgress
                    style={{
                        // color: theme.palette.secondary.main
                    }}
                    className={classes.progress}
                    // size={50}
                />
                <div className={classes.progressDialog} />
            </div>
        );
    }
}
Loading.defaultProps = {};
export default withStyles(styles)(Loading);
