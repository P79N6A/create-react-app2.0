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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Action } from "../common/index";
const styles = theme => ({
    headIcon: {}
});
class CardHead extends React.Component {
    state = {};
    getIcons = () => {
        return [
            {
                icon: "add",
                func: () => {}
            }
        ];
    };
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader
                    action={<Action classes={classes} icons={this.getIcons()} />}
                    title={"Log"}
                    subheader={""}
                />
            </Card>
        );
    }
}
CardHead.propTypes = {
    classes: PropTypes.object.isRequired
};
CardHead.defaultProps = {};
export default withStyles(styles)(CardHead);
