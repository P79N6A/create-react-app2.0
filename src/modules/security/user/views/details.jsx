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
import PropTypes from "prop-types";
import { readOnlyFields } from "../funcs/constants";
import { Compose } from "../funcs/util";
// import UserList from "./userlist";
import { theme as themes } from "modules/theme";
import Header from "./header";
import Form from "./form";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: { ...theme.mixins.gutters() },
    field: {
        padding: theme.spacing.unit * 2 + "px " + theme.spacing.unit * 3 + "px",
        height: "calc(100% - 64px)",
        overflowY: "auto",
        background: themes.palette.background.paper
    },
    height: "calc(100% - 64px)",
    overflowY: "auto"
});

const Headers = <Header title="User Details" />;

class Details extends React.Component {
    state = { userData: {} };
    getFormData = value => {
        console.log("ParentGet", value);
    };
    componentWillReceiveProps(nextProps) {
        const { userData } = nextProps;
        this.setState({
            userData
        });
    }
    render() {
        const { classes } = this.props;
        const { userData } = this.state;
        const rootData = readOnlyFields.map(item => {
            item.value = userData[item.name] || item.value;
            return item;
        });
        const field = (
            <div className={classes.field}>
                <Form columns={rootData} getFormData={this.getFormData} margin="dense" />
            </div>
        );
        const Details = Compose(Headers, field);
        return <React.Fragment>{Details}</React.Fragment>;
    }
}
Details.propTypes = {
    classes: PropTypes.object.isRequired
};
Details.defaultProps = {};

export default withStyles(styles)(Details);
