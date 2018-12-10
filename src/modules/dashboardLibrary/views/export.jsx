/*
* =========================================================================
*  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

/**
 * @fileOverview Here need the description for this file
 * @module ExportCSV
 * @author LUOJIA
 * @exports {
 *  ExportCSV
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { I18n } from "react-i18nify";

const styles = theme => ({
    root: {
        width: "100%"
        // backgroundColor: theme.palette.background.paper
    }
});

/**
 * widgets list
 * @example
 *  <WidgetsList
        listDatas={listDatas}
        checked={checked}
        handleToggle={this.handleToggle}
        classes={classes}
    />
 *
 * @param {array} listDatas
 * @param {array} checked
 * @param {object} classes
 * @param {function} handleToggle
 * @returns Component
 */
const WidgetsList = ({ listDatas, checked, classes, handleToggle }) => {
    return (
        <React.Fragment>
            {listDatas.map(item => (
                <ListItem
                    key={item}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(item)}
                    className={classes.listItem}
                >
                    <Checkbox checked={checked.indexOf(item) !== -1} tabIndex={-1} disableRipple />
                    <ListItemText primary={`Line item ${item + 1}`} />
                </ListItem>
            ))}
        </React.Fragment>
    );
};

/**
 * select all widgets
 * @example
 *  <WidgetsList
        listDatas={listDatas}
        checked={checked}
        handleToggle={this.handleToggle}
        classes={classes}
    />
 *
 * @param {bool} All
 * @param {object} classes
 * @param {function} handleChangeAll
 * @returns Component
 */
const SelectAll = ({ handleChangeAll, classes, All }) => {
    return (
        <ListItem role={undefined} dense button onClick={handleChangeAll} className={classes.listItem}>
            <Checkbox checked={All} disableRipple />
            <ListItemText primary={"Widgets"} />
        </ListItem>
    );
};

class ExportCSV extends React.Component {
    static defaultProps = {};
    state = {
        name: "",
        open: false,
        title: I18n.t("modal.export.title"),
        subTitle: I18n.t("modal.export.subtitle"),
        All: false,
        checked: [],
        listDatas: [1, 2, 3, 4]
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };
    handleChangeAll = () => {
        this.setState({
            All: !this.state.All
        });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }

    cancle = () => {
        this.setState({
            open: false
        });
    };

    submit = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { classes } = this.props;
        const { title, subTitle, open, checked, listDatas, All } = this.state;
        return (
            <Dialog title={title} cancle={this.cancle} open={open} subTitle={subTitle} submitText="EXPORT">
                <Typography className={classes.root}>
                    <List>
                        <SelectAll handleChangeAll={this.handleChangeAll} All={All} classes={classes} />
                        <WidgetsList
                            listDatas={listDatas}
                            checked={checked}
                            handleToggle={this.handleToggle}
                            classes={classes}
                        />
                    </List>
                </Typography>
            </Dialog>
        );
    }
}

ExportCSV.propTypes = {
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(ExportCSV);
