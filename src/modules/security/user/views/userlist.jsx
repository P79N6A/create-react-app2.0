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
import { List, ListItem, Avatar, ListItemText, Button, Icon } from "@material-ui/core";
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

const IconAction = ({ icons, classes }) => {
    return (
        <React.Fragment>
            {icons.map(item => {
                return (
                    <Button
                        onClick={item.clickHandle}
                        variant="fab"
                        mini
                        color="secondary"
                        aria-label="add"
                        className={classes.button}
                    >
                        <Icon>{item.name}</Icon>
                    </Button>
                );
            })}
        </React.Fragment>
    );
};

const Lists = ({ userDatas, icons, classes }) => {
    return (
        <React.Fragment>
            {userDatas.map(item => {
                return (
                    <ListItem>
                        <Avatar />
                        <ListItemText primary={item.title} secondary={item.subtitle} />
                        <IconAction icons={icons} classes={classes} />
                    </ListItem>
                );
            })}
        </React.Fragment>
    );
};

class UserList extends React.Component {
    state = { userDatas: [], icons: [] };
    render() {
        const { classes } = this.props;
        const { userDatas, icons } = this.state;
        return (
            <List>
                <Lists userDatas={userDatas} icons={icons} classes={classes} />
            </List>
        );
    }
}
UserList.propTypes = {
    classes: PropTypes.object.isRequired
};
UserList.defaultProps = {};

export default withStyles(styles)(UserList);
