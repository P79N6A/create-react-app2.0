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
import { theme } from "modules/theme";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    IconButton,
    Icon,
    Radio
} from "@material-ui/core";
const styles = theme => ({
    root: {
        "&>span": {
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    root2: {
        textAlign: "center"
    },
    actionRoot: {
        right: 0,
        width: 116,
        fontSize: "1rem"
    },
    fullHeight: {
        height: "100%"
    },
    listItem: {
        "&>div:first-child": {
            paddingRight: 120
        }
    },
    listItem2: {
        "&>div:first-child": {
            paddingRight: 30
        }
    }
});


/**
 * TabList component
 * @example
 *
 *
 * @param {func} handleToggle
 * @param {boolean} checked
 * @param {array} listData
 * @param {any} children
 * @param {string} labelField
 * @param {string} valueField
 * @returns Component
 */
const TabList = ({
    classes,
    handleToggle,
    checked,
    listData,
    children,
    labelField,
    valueField,
    icons,
    type,
    radioSelected,
    handleChangeRadio,
    editMode
}) => (
    <MuiThemeProvider theme={theme}>
        <List className={classes.fullHeight}>
            {children}
            {listData.length ? (
                listData.map((value, i) => (
                    <ListItem
                        key={i}
                        button
                        onClick={editMode === "view" ? () => {} : handleToggle(value[valueField])}
                        className={editMode === "view" ? classes.listItem : classes.listItem2}
                    >
                        <ListItemText classes={{ root: classes.root }} primary={value[labelField]} />
                        <ListItemSecondaryAction>
                            {icons ? (
                                icons.map((n, i) => {
                                    return (
                                        <IconButton
                                            key={i}
                                            aria-label="Comments"
                                            onClick={handleToggle(value[valueField])}
                                        >
                                            <Icon>add</Icon>
                                        </IconButton>
                                    );
                                })
                            ) : editMode === "view" ? (
                                <ListItemSecondaryAction classes={{ root: classes.actionRoot }}>
                                    {"Enable"}
                                </ListItemSecondaryAction>
                            ) : type === "radio" ? (
                                <Radio
                                    disabled={editMode === "view"}
                                    checked={checked === value[valueField]}
                                    onChange={handleToggle(value[valueField])}
                                    value={value[valueField]}
                                    name="radioSelected"
                                />
                            ) : (
                                <Checkbox
                                    disabled={editMode === "view"}
                                    onChange={handleToggle(value[valueField])}
                                    checked={checked.indexOf(value[valueField]) !== -1}
                                />
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            ) : (
                <ListItem key={"NoData"} className={classes.listItem2}>
                    <ListItemText classes={{ root: classes.root2 }} primary="No Data To Display" />
                </ListItem>
            )}
        </List>
    </MuiThemeProvider>
);

TabList.propTypes = {
    classes: PropTypes.object.isRequired,
    listData: PropTypes.array.isRequired,
    handleToggle: PropTypes.func,
    contents: PropTypes.any,
    children: PropTypes.any
};

TabList.defaultProps = {
    listData: [],
    checked: [],
    handleChangeRadio: () => {}
};

export default withStyles(styles)(TabList);
