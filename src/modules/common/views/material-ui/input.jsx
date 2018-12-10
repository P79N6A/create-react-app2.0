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
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
// import {theme as themes} from "modules/theme";

const styles = Theme => ({
    underline: {
        "&:before": {
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        "&:after": {
            borderBottomColor: Theme.palette.secondary.main
        }
    },
    input: {
        color: Theme.palette.text.primary,
        // color: Theme.typography.caption.color,
        "&:after": {
            borderBottomColor: Theme.palette.secondary.main
        }
    }
});

const Inputs = props => {
    const defaultInputProps = {
        maxLength: 128,
        minLength: 0
    };
    const { inputProps } = props;
    let inputData = {};
    if (inputProps) {
        inputData = Object.assign({}, defaultInputProps, inputProps);
    } else {
        inputData = defaultInputProps;
    }
    return <Input {...props} inputProps={inputData} />;
};

export default withStyles(styles)(Inputs);
