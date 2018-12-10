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
 * Action can generator a button list
 * @example
 *
 *
 * @param {array<object>} icons
 * @returns Components
 */
import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Action = ({ classes, icons }) => {
    return (
        <div className={classes.headIcon}>
            {icons.map((item, i) => {
                if (item.visible && !item.visible) return null;
                return item.content ? (
                    item.content()
                ) : (
                    <IconButton
                        onClick={item.func ? item.func : this.getBtnClick}
                        key={i}
                        size="small"
                        // style={{ margin: "0 8px" }}
                    >
                        {!!item.name ? <Icon>{item.name}</Icon> : null}
                        {!!item.awesome ? <FontAwesomeIcon icon={item.awesome} size="xs" /> : null}
                    </IconButton>
                );
            })}
        </div>
    );
};

export default Action;
