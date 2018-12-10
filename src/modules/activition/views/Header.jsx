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
import { Grid, Typography } from "@material-ui/core";
import { I18n } from "react-i18nify";
const styles = theme => ({
    wrapper: {
        width: "100%",
        margin: "0 auto 16px",
        padding: "0px 8px",
        "&>h2": {
            fontSize: "1.5rem"
        }
    },
    AlignLeft: {
        textAlign: "left",
        padding: 0 + "px!important",
        "& span": {
            fontSize: "1.25rem"
        }
    },
    AlignRight: {
        padding: 0 + "px!important",
        textAlign: "right",
        lineHeight: "30px",
        fontSize: "1rem"
    },
    AlinkText: {
        color: theme.palette.secondary.main,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    subtitle: {
        fontSize: "0.75rem",
        width: "100%"
    }
});

class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24} className={classes.wrapper}>
                <Typography variant="h6" color="textPrimary">
                    {I18n.t("activition.title")}
                </Typography>
                <Typography className={classes.subtitle} variant="inherit" color="textPrimary">
                    {I18n.t("activition.subTitle")}
                </Typography>
                {/* <Grid item xs={12} sm={6} className={classes.AlignLeft} /> */}
                {/* <Grid item xs={12} sm={6} className={classes.AlignRight}>
                    
                </Grid> */}
            </Grid>
        );
    }
}
export default withStyles(styles)(Header);
