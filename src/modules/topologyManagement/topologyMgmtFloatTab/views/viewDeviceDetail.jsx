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
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import { MapApplication } from "modules/map";

const styles = Theme => ({
    headerBG: {
        backgroundColor: Theme.palette.primary.light
    }
});

class ViewDeviceDetail extends React.Component {
    render() {
        const { formatValues, classes, coordinates, dataSource } = this.props;
        return (
            <div>
                <ul style={{ padding: 0 }}>
                    <ListSubheader className={classes.headerBG}>Device Info</ListSubheader>
                    {formatValues &&
                        formatValues.map((config, index) => {
                            let isLocation = config.displayname !== "Location" ? false : true;
                            return (
                                <div key={index}>
                                    {isLocation ? (
                                        ""
                                    ) : (
                                        <ListItem button>
                                            <ListItemText
                                                primary={
                                                    <span className="topology-pre">{config["defaultValue"] || ""}</span>
                                                }
                                                secondary={<span className="topology-pre">{config.displayname}</span>}
                                                title={config["defaultValue"] || ""}
                                                style={{ wordBreak: "break-all", userSelect: "text" }}
                                            />
                                        </ListItem>
                                    )}
                                </div>
                            );
                        })}
                </ul>
                <div style={{ height: "250px", padding: "0 24px" }}>
                    <MapApplication
                        identify={this.props.mapIdentify}
                        dataSource={dataSource}
                        zoom={12}
                        center={coordinates}
                        needToolBar={false}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ViewDeviceDetail);
