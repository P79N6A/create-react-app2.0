/*
 * @Author: wplei
 * @Date: 2018-11-09 12:47:40
 * @Last Modified by: wplei
 * @Last Modified time: 2018-12-07 15:37:07
 */

import React from "react";
import { Typography, ListItem, Checkbox, ListItemText, List } from "@material-ui/core";
import { actions as CCMSEX } from "modules/ccmsEx";
import store from "commons/store";
import { actions as MESSAGE } from "modules/messageCenter";
import moment from "moment";

const MODULE_NAME = "CCMA-Modals";
const defaultProps = {};
const propTypes = {};

class DataExport extends React.Component {
    state = {
        widgets: [],
        selectAll: false,
        selectedWidgets: []
    };
    componentDidMount = () => {
        this.props.onRender(this);
        const { pageConfig } = this.props;
        const { configValue } = pageConfig;
        const { widgets } = configValue;
        this.setState({
            widgets
        });
    };
    handleCheck = id => {
        const { selectedWidgets } = this.state;
        if (selectedWidgets.includes(id)) {
            selectedWidgets.splice(selectedWidgets.indexOf(id), 1);
        } else {
            selectedWidgets.push(id);
        }
        this.setState({
            selectedWidgets
        });
    };
    toggleCheckAll = () => {
        const { selectAll } = this.state;
        if (selectAll) return this.setState({ selectedWidgets: [] });
        const w = [];
        const { widgets } = this.state;
        widgets &&
            widgets.forEach(g => {
                if (g.settings && g.settings.exportable === false) return;
                w.push(g.id);
            });
        this.setState({
            selectedWidgets: w
        });
    };
    submit = () => {
        const { selectedWidgets } = this.state;
        if (Array.isArray(selectedWidgets) && selectedWidgets.length === 0)
            return store.dispatch(MESSAGE.warn("Please select at least one widget", MODULE_NAME));
        let time = moment();
        store.dispatch(CCMSEX.exportCSVAction(selectedWidgets, time));
    };
    close = () => {
        console.log("download exit");
    };
    render = () => {
        const { widgets, selectedWidgets } = this.state;
        return (
            <React.Fragment>
                <List>
                    {widgets && Array.isArray(widgets) && widgets.length ? (
                        widgets.map(w => {
                            const { exportable } = (w && w.settings) || { exportable: true };

                            return exportable ? (
                                <ListItem dense button onClick={() => this.handleCheck(w.id)}>
                                    <Checkbox checked={selectedWidgets.includes(w.id)} />
                                    <ListItemText primary={w && w.properties && w.properties.title} />
                                </ListItem>
                            ) : null;
                        })
                    ) : (
                        <Typography variant="body1" align="center">
                            no widget
                        </Typography>
                    )}
                </List>
            </React.Fragment>
        );
    };
}

DataExport.defaultProps = defaultProps;
DataExport.propTypes = propTypes;

export default DataExport;
