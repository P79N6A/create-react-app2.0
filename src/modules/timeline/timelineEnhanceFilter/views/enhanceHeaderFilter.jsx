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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CommonSelect from "./commonSelect";
import { FullScreenButton } from "modules/ccms/components";
import { I18n } from "react-i18nify"; 
import Tooltip from "@material-ui/core/Tooltip";
// import IconButton from "@material-ui/core/IconButton";
// import ListIcon from "@material-ui/icons/FormatListBulleted";
// import ViewStreamIcon from "@material-ui/icons/ViewStream";
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
});

class enhanceHeaderFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleName: "Search"
        };
    }
    getData = (dataArray, data) => {
        let datas = data;
        if (dataArray) {
            for (let i = 0; i < dataArray.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (dataArray[i] === data[j].columnName) {
                        datas[j].defaultSelect = true;
                        break;
                    }
                }
            }
        }
        return datas;
    };
    columnsChanged = (selectTypeName, selectValue) => {
        console.log(selectValue);
    }
    handleToggleViewClick = () => {
        const { toggleName } = this.state;
        let type = (toggleName === "Search") ? "Stream" : "Search";
        this.setState({ toggleName: type });
    }
    render() {
        const { classes } = this.props;
        // const { toggleName } = this.state;
        let frequency = [];
        const severity = ["Critical", "Major", "Minor", "Info", "Unknown"];
        for (let fkey = 0; fkey < severity.length; fkey++) {
            frequency.push({
                columnName: severity[fkey],
                defaultSelect: true
            });
        }
        const selectitems = this.getData(severity, frequency);
        return (
            <Card className="timeline-filter-card">
                <CardHeader
                    action={
                        <div style={{ display: "flex" }}>
                            <div className="right-item" style={{ display: "-ms-flexbox" }}>
                                <CommonSelect
                                    style={{ display: "inline-block" }}
                                    className={classes.actions}
                                    identify={this.props.identify}
                                    columnConfig={selectitems} />
                            </div>
                            {this.props.fullScreen && <div className="right-item" style={{ display: "inline-block" }}>
                                <Tooltip title={I18n.t("rule.common.fullScreen")}>
                                    <FullScreenButton {...this.props} />
                                </Tooltip>
                            </div>}
                            {/* <div className="right-item">
                                <Tooltip title={`${toggleName} Mode`}>
                                    <IconButton
                                        aria-label={`${toggleName} Mode`}
                                        onClick={this.handleToggleViewClick.bind(this)}
                                    >
                                        {toggleName === "Search" ? <ListIcon /> : <ViewStreamIcon />}
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                        </div>
                    }
                    title={this.props.title}
                    subheader={this.props.subTitle}
                />
            </Card>
        );
    }
}

enhanceHeaderFilter.defaultProps = {};

export default (withStyles(toolbarStyles)(enhanceHeaderFilter));
