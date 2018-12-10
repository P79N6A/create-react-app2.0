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
import Head from "../common/listHead";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { JSONSchema } from "../../common/jsonSchema/index";
const styles = theme => ({
    "contact-list-delete": {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    "contact-list-margin": {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px"
        // padding: "0px 24px"
    },
    "account-main-icon": {
        padding: 0,
        width: "calc(100% - 16px)"
    },
    list: {
        width: "100%"
    },
    listStyle: {
        "& span": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
        // paddingLeft: "0px!important"
    }
});
class ViewContact extends React.Component {
    state = {
        columns: [],
        originCloumn: [],
        checked: [],
        sameasPrimary: false
    };
    setContactValue = (contact, flag) => {
        return {
            schema: _.cloneDeep(this.props.schema),
            ids: Math.random(Date.now()),
            initState: contact
        };
    };
    render() {
        // const { columns = [] } = this.state;
        const { classes, account = {} } = this.props;
        const { primarycontact, secondarycontact } = account;
        let columns = [];
        if (account.id) {
            columns = [this.setContactValue(primarycontact, true)];
            if (secondarycontact && secondarycontact.name) {
                columns.push(this.setContactValue(secondarycontact));
            }
        }
        return (
            <div className={classes["contact-list-margin"]}>
                <Head formtitle title="Contact Information" />
                {columns.map((column, i) => (
                    <ExpansionPanel key={i}>
                        <ExpansionPanelSummary
                            className={classes["account-contact-summary-main"]}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Head
                                className={classes["account-main-icon"]}
                                icon={i === 0 ? "brightness_1" : ""}
                                title={column.initState.name}
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes["account-contact-detail"]}>
                            {/* <List dense={true} className={classes.list}>
                                {column.map(n => (
                                    <ListItem button key={n.name} title={n.value} classes={{ root: classes.listStyle }}>
                                        <ListItemText
                                            primary={n.value || ""}
                                            secondary={
                                                n.name === "phone" || n.name === "countrycode" ? n.name : n.label
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List> */}
                            <JSONSchema schema={column.schema} initState={column.initState} mode="view" />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}
ViewContact.defaultProps = {};
ViewContact.propTypes = {
    classes: PropTypes.object,
    reflectFormData: PropTypes.func
};
export default withStyles(styles)(ViewContact);
