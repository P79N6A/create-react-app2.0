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
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, IconButton, Icon } from "@material-ui/core";
import classnames from "classnames";
import { I18n } from "react-i18nify";
const styles = theme => ({
    root: {
        "&>span": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        },
        paddingLeft: theme.spacing.unit * 6
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
            // paddingRight: 120
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
    },
    listItem2: {
        "&>div:first-child": {
            // paddingRight: 30
        },
        paddingLeft: "4px"
    },
    listItem4: {
        "&>div:first-child": {
            paddingRight: 30
        }
    },
    listItem3: {
        position: "relative",
        width: "50%",
        display: "inline-block"
    },
    checkboxPos: {
        left: 4
    },
    checkboxPosIcon: {
        left: 8
    },
    padAuto: {
        paddingLeft: theme.spacing.unit * 3
    }
});

const getViewDetail = key => {
    let root = key === 0 ? ["visibility"] : ["visibility", "edit"];
    return (
        <React.Fragment>
            {root.map(n => (
                <IconButton key={n} aria-label={n}>
                    <Icon>{n}</Icon>
                </IconButton>
            ))}
        </React.Fragment>
    );
};

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
    subHandleToggle,
    checked = [],
    subChecked = [],
    listData,
    children,
    labelField,
    valueField,
    icons,
    type,
    radioSelected,
    handleChangeRadio,
    editMode,
    viewMode = "",
    isSelected = false
}) => (
    <List className={classes.fullHeight}>
        {children}
        {listData.length ? (
            listData.map((value, i) => (
                <ListItem
                    title={value[labelField]}
                    key={i}
                    button
                    // onClick={editMode === "view" ? () => {} : handleToggle(value[valueField])}
                    className={
                        editMode === "view"
                            ? classes.listItem
                            : classnames(classes.listItem2, isSelected && classes.padAuto)
                    }
                >
                    <div className={classes.listItem3}>
                        {viewMode !== "view" ? (
                            <React.Fragment>
                                <ListItemSecondaryAction className={classes.checkboxPos}>
                                    <Checkbox
                                        onChange={handleToggle(value[valueField])}
                                        checked={checked.indexOf(value[valueField]) !== -1}
                                    />
                                </ListItemSecondaryAction>
                                <ListItemText
                                    title={value[labelField]}
                                    onClick={handleToggle(value[valueField])}
                                    classes={{ root: classes.root }}
                                    primary={value[labelField]}
                                />
                            </React.Fragment>
                        ) : (
                            <ListItemText
                                title={value[labelField]}
                                // classes={{ root: classes.root }}
                                primary={value[labelField]}
                            />
                        )}
                    </div>
                    <div className={classes.listItem3}>
                        {viewMode !== "view" ? (
                            <React.Fragment>
                                <ListItemSecondaryAction className={classes.checkboxPos}>
                                    <Checkbox
                                        disabled={!checked.includes(value[valueField])}
                                        onChange={subHandleToggle(value[valueField])}
                                        checked={subChecked.indexOf(value[valueField]) !== -1}
                                    />
                                </ListItemSecondaryAction>
                                <ListItemText
                                    onClick={subHandleToggle(value[valueField])}
                                    classes={{ root: classes.root }}
                                    primary={I18n.t("common.ReadOnly")}
                                />
                            </React.Fragment>
                        ) : (
                            <ListItemSecondaryAction className={classes.checkboxPosIcon}>
                                {getViewDetail(value.readwrite)}
                            </ListItemSecondaryAction>
                        )}
                    </div>
                </ListItem>
            ))
        ) : (
            <ListItem key={"NoData"} className={classes.listItem4}>
                <ListItemText classes={{ root: classes.root2 }} primary={I18n.t("common.NoColumnsSelected")} />
            </ListItem>
        )}
    </List>
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
    handleChangeRadio: () => {},
    subHandleToggle: () => {}
};

export default withStyles(styles)(TabList);
