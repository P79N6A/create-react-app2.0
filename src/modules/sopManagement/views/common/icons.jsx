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
 * Created by chenling on 02/08/2018.
 */
import React from "react";
import { Icon, IconButton } from "@material-ui/core";
// import { theme } from "modules/theme";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { MuiThemeProvider } from "@material-ui/core/styles";
const Action = ({ classes, icons }) => {
    return (
        // <MuiThemeProvider theme={theme}>
        <div>
            {icons.map((item, i) => {
                if (item.visible && !item.visible) return null;
                return item.content ? (
                    item.content()
                ) : (
                    <IconButton
                        // color="inherit"
                        key={i}
                        // size="small"
                        // style={{ height: "32px", width: "32px", margin: "0 8px" }}
                        onClick={item.func ? item.func : this.getBtnClick}
                    >
                        <Icon  onClick={item.func ? item.func : this.getBtnClick}>
                            {item.name}
                        </Icon>
                    </IconButton>
                );
            })}
        </div>
        // </MuiThemeProvider>
    );
};

export default Action;
