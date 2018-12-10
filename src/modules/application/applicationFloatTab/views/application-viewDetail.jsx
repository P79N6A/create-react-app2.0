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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
// import { TextField } from "modules/common";
import { ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import jp from "jsonpath";
import _ from "lodash";
import ImageComp from "./application-img";
import SelectIconComp from "./application-selectIcon";

const styles = theme => ({
    listHeader: {
        backgroundColor: theme.palette.primary.light
    }
});

class DeviceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: {} };
    }

    componentDidMount() {
        if (!this.props.deviceData || !this.props.sysconfigDeviceSchema) {
            return;
        }
        let values = this.matchDataSchema(this.props);
        this.setState({ values });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.deviceData || !nextProps.sysconfigDeviceSchema) {
            return;
        }
        let values = this.matchDataSchema(nextProps);
        this.setState({ values });
    }

    matchDataSchema(props) {
        const { deviceData, sysconfigDeviceSchema } = props;
        let values = {};

        for (let i = 0; i < sysconfigDeviceSchema.length; i++) {
            for (let key in sysconfigDeviceSchema[i]) {
                const value = jp.query(deviceData, sysconfigDeviceSchema[i][key].jsonpath);
                values[key] = value[0];
            }
        }
        return values;
    }
    shouldComponentUpdate(nextProps, nextStates) {
        return !_.isEqual(this.state, nextStates) || !_.isEqual(this.props, nextProps);
    }

    render() {
        const { sysconfigDeviceSchema, classes } = this.props,
            { values } = this.state;
        return (
            <ul style={{ padding: 0 }}>
                <ListSubheader classes={{ root: classes.listHeader }}>Info</ListSubheader>
                {_.map(sysconfigDeviceSchema, (config, index) => {
                    let configKey = "";
                    for (let key in config) {
                        configKey = key;
                    }
                    const comp = config[configKey].comp;
                    return (
                        <ListItem button key={index}>
                            {comp === "imageUpload" && (
                                <ImageComp
                                    identify={this.props.identify}
                                    schemaKey={configKey}
                                    schema={config[configKey]}
                                    disableEdit
                                    imageId={values[configKey] || ""}
                                />
                            )}
                            {comp === "iconpicker" && (
                                <SelectIconComp
                                    identify={this.props.identify}
                                    title="Icon"
                                    iconType={values[configKey] || ""}
                                    iconColor="white"
                                    editMode={false}
                                />
                            )}
                            {comp !== "imageUpload" && comp !== "iconpicker" && (
                                <ListItemText
                                    primary={<span className="topology-pre">{values[configKey] || ""}</span>}
                                    secondary={config[configKey].displayname}
                                    title={config[configKey].displayname}
                                    style={{ wordBreak: "break-all", userSelect: "text" }}
                                />
                            )}
                        </ListItem>
                    );
                })}
            </ul>
        );
    }
}

DeviceDetail.propTypes = {};

DeviceDetail.defaultProps = {};

export default withStyles(styles)(DeviceDetail);
