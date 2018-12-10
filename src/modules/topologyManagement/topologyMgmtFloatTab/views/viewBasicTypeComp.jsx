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
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = Theme => ({
    headerBG: {
        backgroundColor: Theme.palette.primary.light
    }
});

class ViewBasictypeComp extends React.Component {
    render() {
        const { formatBasicTypesDataObj, basictypesSchema, classes } = this.props;
        return (
            <div className="edit-basic-type">
                <ul style={{ padding: 0 }}>
                    <ListSubheader className={classes.headerBG}>Basic Type Info</ListSubheader>
                    {formatBasicTypesDataObj &&
                        formatBasicTypesDataObj.map((basictype, innerKey) => {
                            let operation = basictype.basictypeRW;
                            _.forEach(this.props.operation, operate => {
                                if (operation === operate.key) {
                                    basictype.basictypeRW = operate.operate;
                                }
                            });
                            return (
                                <ListItem
                                    button
                                    key={innerKey}
                                    className="basic-type-list"
                                    style={{ width: "100%", padding: "16px 24px" }}
                                >
                                    {basictypesSchema &&
                                        basictypesSchema.map((config, num) => {
                                            let width =
                                                config.currentKey === "basictypeinstance" ||
                                                config.currentKey === "basictype"
                                                    ? "30%"
                                                    : "18%";
                                            return (
                                                <FormControl key={num} className="list" style={{ width: width }}>
                                                    {config.currentKey === "basictypeinstance" && (
                                                        <ListItemText
                                                            primary={
                                                                <span className="topology-pre">
                                                                    {basictype.basictypeinstance}
                                                                </span>
                                                            }
                                                            secondary={config.displayname}
                                                            title={basictype.basictypeinstance}
                                                            style={{ wordBreak: "break-all", userSelect: "text" }}
                                                        />
                                                    )}
                                                    {config.currentKey === "basictype" && (
                                                        <ListItemText
                                                            primary={
                                                                <span className="topology-pre">
                                                                    {basictype.basictype}
                                                                </span>
                                                            }
                                                            secondary={config.displayname}
                                                            title={basictype.basictype}
                                                            style={{ wordBreak: "break-all", userSelect: "text" }}
                                                        />
                                                    )}
                                                    {config.currentKey === "basictypeunit" && (
                                                        <ListItemText
                                                            primary={
                                                                <span className="topology-pre">
                                                                    {basictype.basictypeunit || " "}
                                                                </span>
                                                            }
                                                            secondary={config.displayname}
                                                            title={basictype.basictypeunit}
                                                            style={{ wordBreak: "break-all", userSelect: "text" }}
                                                        />
                                                    )}
                                                    {config.currentKey === "basictypeRW" && (
                                                        <ListItemText
                                                            primary={
                                                                <span className="topology-pre">
                                                                    {basictype.basictypeRW || " "}
                                                                </span>
                                                            }
                                                            secondary={config.displayname}
                                                            title={basictype.basictypeRW}
                                                            style={{ wordBreak: "break-all", userSelect: "text" }}
                                                        />
                                                    )}
                                                </FormControl>
                                            );
                                        })}
                                </ListItem>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

ViewBasictypeComp.propTypes = {};

ViewBasictypeComp.defaultProps = {
    operation: [
        {
            operate: "Read Only",
            key: "R"
        },
        {
            operate: "Read-Write",
            key: "RW"
        },
        {
            operate: "Execute",
            key: "E"
        }
    ]
};

export default withStyles(styles)(ViewBasictypeComp);
