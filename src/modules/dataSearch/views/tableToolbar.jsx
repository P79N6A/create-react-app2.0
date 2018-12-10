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
 * Created by HuLin on 03/08/2018.
 */
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { I18n } from "react-i18nify";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        backgroundColor: theme.palette.background.paper
    },
    spacer: {
        flex: "1 1 100%",
        color: theme.palette.text.primary
    }
});

class EnhancedTableToolbar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Toolbar className={classes.root}>
                <Typography variant="h6" className={classes.spacer} id="tableTitle" noWrap>
                    {I18n.t("dataExport.dataExportTask")}
                </Typography>

                <div className={classes.spacer} />
            </Toolbar>
        );
    }
}

export default connect()(withStyles(toolbarStyles)(EnhancedTableToolbar));
