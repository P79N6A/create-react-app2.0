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
import Dialog from "../../../components/views/dialog";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, List, ListItem, ListItemText } from "@material-ui/core";
import { I18n } from "react-i18nify";
import _ from "lodash";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import moment from "moment";

const styles = theme => ({
    root: {
        width: "100%"
        // padding: "0 24px 24px 24px"
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
            {listDatas.map(item => {
                const { exportable } = item.settings || { exportable: true };
                return (
                    exportable && (
                        <ListItem
                            key={item.id}
                            role={undefined}
                            dense
                            button
                            disabled={!exportable}
                            onClick={handleToggle(item)}
                            className={classes.listItem}
                        >
                            <Checkbox checked={checked.indexOf(item.id) !== -1} tabIndex={-1} disableRipple />
                            <ListItemText primary={item.properties.title} />
                        </ListItem>
                    )
                );
            })}
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
        listDatas: []
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };
    handleChangeAll = () => {
        let checked = _.map(this.state.listDatas, (widget, index) => {
            const { exportable } = widget.settings || { exportable: true };
            return exportable ? widget && widget.id : null;
        });
        this.setState(
            Object.assign({
                All: !this.state.All,
                checked: !this.state.All ? checked : []
            })
        );
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            listDatas: nextProps.pageConfig.configValue.widgets
        });
    }

    cancle = () => {
        this.props.onCancel("exportCSV");
    };

    submit = () => {
        this.props.onCancel("exportCSV");
        this.setState(
            Object.assign({
                All: false,
                checked: []
            })
        );

        let checkedWidgets = this.state.checked;
        if (!checkedWidgets || !checkedWidgets.length) {
            return;
        }
        let time = moment();
        this.props.exportCSVAction(checkedWidgets, time);
    };

    render() {
        const { classes } = this.props;
        const { title, subTitle, open, checked, listDatas, All } = this.state;
        return (
            <Dialog
                title={title}
                onCancle={this.cancle}
                open={open}
                onSubmit={this.submit.bind(this)}
                subTitle={subTitle}
                submitText="EXPORT"
            >
                <div className={classes.root}>
                    <List>
                        <SelectAll handleChangeAll={this.handleChangeAll.bind(this)} All={All} classes={classes} />
                        <WidgetsList
                            listDatas={listDatas}
                            checked={checked}
                            handleToggle={this.handleToggle}
                            classes={classes}
                        />
                    </List>
                </div>
            </Dialog>
        );
    }
}

ExportCSV.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        exportCSVAction: (exportWidgets, exportTime) => {
            dispatch(actions.exportCSVAction(exportWidgets, exportTime));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(ExportCSV));
