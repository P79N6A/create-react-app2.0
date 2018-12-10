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
import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
class Editor extends React.Component {
    render() {
        const { comp, displayname, value, property = {} } = this.props.schema;
        const { ignore = false } = property;
        const { aop = null } = this.props;
        if (ignore) return null;
        if (aop && typeof aop === "object" && aop.hasOwnProperty(comp)) {
            return aop[comp].view(this.props);
        } else {
            return (
                <ListItem button key={"group"} title={String(value)} className="schema-view-liststyle">
                    <ListItemText primary={value} secondary={displayname} />
                </ListItem>
            );
        }
    }
}

export default Editor;
