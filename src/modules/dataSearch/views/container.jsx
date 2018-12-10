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
import "../styles/style.less";
import DataLeft from "./dataLeft";
import DataRight from "./dataRight";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    };

    render() {
        const { classes } = this.props;
        return (
            <div
                className={classNames("container-data", { [classes.root]: true })}
            >
                <DataLeft />
                <DataRight />
            </div>
        );
    }
}

export default withStyles(styles)(Search);

