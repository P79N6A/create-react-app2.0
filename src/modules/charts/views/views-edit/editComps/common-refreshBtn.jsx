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
import PropTypes from "prop-types";
import { IconButton, Icon, Tooltip } from "@material-ui/core";

const Refresh = props => {
    const { onChangeProperty, isLoading, identify } = props;
    return (
        <Tooltip title="Refresh">
            <IconButton
                disabled={isLoading}
                onClick={() => {
                    onChangeProperty(identify, { refresh: true });
                }}
            >
                <Icon>refresh</Icon>
            </IconButton>
        </Tooltip>
    );
};

Refresh.propTypes = {
    isLoading: PropTypes.bool,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired,
};

export default Refresh;
