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
import { Tree } from "antd";
import { withStyles } from "@material-ui/core/styles";

const TreeNode = Tree.TreeNode;

const styles = theme => ({
    "@global": {
        ".iscTree .ant-tree li span": {
            color: theme.palette.text.primary
        },
        ".iscTree .ant-tree li .ant-tree-node-content-wrapper:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        ".iscTree .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    }
});

const Trees = props => {
    const { id } = props;
    return (
        <div id={id || "iscTree"} className="iscTree">
            <Tree {...props} />
        </div>
    );
};

const Treess = withStyles(styles)(Trees);
export { Treess, TreeNode };
