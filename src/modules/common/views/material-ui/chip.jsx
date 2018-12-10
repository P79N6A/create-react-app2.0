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
// import {theme as Theme} from "modules/theme";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
// import classnames from "classnames";

const styles = Theme => ({
    deleteIcon: {
        color: Theme.palette.secondary.main,
        "&:hover": {
            color: Theme.palette.secondary.main
        }
    },
    root: {
        background: Theme.palette.primary.light,
        color: Theme.palette.text.primary,
        "&:hover": {
            background: Theme.palette.primary.dark
        },
        "&:active": {
            background: Theme.palette.primary.dark
        }
    },
    deletable: {
        "&:focus": {
            background: Theme.palette.primary.dark
        }
    }
});

const Chips = props => {
    return (
        <Chip
            {...props}
            deleteIcon={<Icon color="secondary">close</Icon>}
        />
    );
};

export default withStyles(styles)(Chips);
