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
 * Created by KaiDi on 25/05/2018.
 */

import React from "react";
// import PropTypes from "prop-types";
// import { theme as themes } from "modules/theme";
import { StepLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = Theme => ({
    active: {
        color: Theme.palette.secondary.main + " !important"
    },
    root: {
        color: Theme.palette.stepperInactive
    },
    completed: {
        color: Theme.palette.secondary.main + " !important"
    }
});
const deleteList = ["active", "root", "completed"];

const StepLabels = props => {
    const { classes } = props;
    const cls = _.omit(classes, deleteList);
    return (
        <StepLabel
            {...props}
            classes={cls}
            StepIconProps={{
                ...props.StepIconProps,
                classes: {
                    root: classes.root,
                    active: classes.active,
                    completed: classes.completed
                }
            }}
        />
    );
};

export default withStyles(styles)(StepLabels);
