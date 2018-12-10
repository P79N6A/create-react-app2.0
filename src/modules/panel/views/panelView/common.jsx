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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import { handleParameters } from "./../../funcs/utils";

const styles = theme => {
    return {
        wrap: {
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column"
        },
        content: {
            flex: 4,
            display: "flex",
            alignItems: "center",
            height: "100%"
        },
        icon_wrap: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%"
        },
        count: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1
        },
        title: {
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1
        },
        count_wrap: {
            marginLeft: "14px",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden",
            textAlign: "right"
        },
        icon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        bottom_info: {
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
        },
        parameter1: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
        },
        content_inner: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        }
    };
};

class CommonPanel extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        const {
            panelTitle,
            bgColor,
            panelIconType,
            classes,
            panelIconColor,
            panelCount,
            panelCountColor,
            parameterOneSizeValue,
            parameterOneColorValue,
            parameterTwoSizeValue,
            parameterTwoColorValue,
            titleSize,
            countSizeData,
            titleColor,
            iconSizeData,
            loading,
            panelParameters,
            panelType
        } = this.props;
        const style = loading === "loading" ? {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        } : {
            height: "100%"
        };
        return (
            <Card style={{ backgroundColor: bgColor, height: "100%" }} className="common_card">
                <CardContent style={{ ...style }}>
                    {
                        loading === "loading" ? (
                            <CircularProgress color="secondary"/>
                        ) : (
                            <div
                                className={classes.wrap}
                            >
                                <div
                                    className={classes.content}
                                >
                                    <div
                                        className={classes.icon_wrap}
                                    >
                                        <Icon
                                            style={{
                                                color: panelIconColor,
                                                fontSize: iconSizeData.fontSize,
                                                fontWeight: iconSizeData.fontWeight,
                                                lineHeight: titleSize.lineHeight
                                            }}
                                            className={classes.icon}
                                        >{panelIconType}</Icon>
                                    </div>
                                    <div
                                        className={classes.count_wrap}
                                    >
                                        <div
                                            className={classes.title}
                                            title={panelTitle}
                                            style={{
                                                fontSize: titleSize.fontSize,
                                                fontWeight: titleSize.fontWeight,
                                                lineHeight: titleSize.lineHeight,
                                                color: titleColor
                                            }}
                                        >
                                            <div className={classes.content_inner}>{panelTitle}</div>
                                        </div>
                                        <div
                                            className={classes.count}
                                            style={{
                                                fontSize: countSizeData.fontSize,
                                                fontWeight: countSizeData.fontWeight,
                                                lineHeight: titleSize.lineHeight,
                                                color: panelCountColor
                                            }}
                                            title={panelCount}
                                        >
                                            <div className={classes.content_inner}>{panelCount}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.bottom_info}>
                                    <div
                                        className={classes.parameter1}
                                    >
                                        <div
                                            className={classes.content_inner}
                                            title={handleParameters(panelType, panelParameters).parameter1}
                                            style={{
                                                fontSize: parameterOneSizeValue.fontSize,
                                                fontWeight: parameterOneSizeValue.fontWeight,
                                                lineHeight: titleSize.lineHeight,
                                                color: parameterOneColorValue
                                            }}
                                        >
                                            {
                                                handleParameters(panelType, panelParameters).parameter1
                                            }
                                        </div>
                                    </div>
                                    {
                                        handleParameters(panelType, panelParameters).parameter2 ? (
                                            <div
                                                className={classes.parameter1}
                                            >
                                                <div
                                                    className={classes.content_inner}
                                                    title={handleParameters(panelType, panelParameters).parameter2}
                                                    style={{
                                                        fontSize: parameterTwoSizeValue.fontSize,
                                                        fontWeight: parameterTwoSizeValue.fontWeight,
                                                        lineHeight: titleSize.lineHeight,
                                                        color: parameterTwoColorValue
                                                    }}
                                                >
                                                    {
                                                        handleParameters(panelType, panelParameters).parameter2
                                                    }
                                                </div>
                                            </div>
                                        ) : ""
                                    }
                                </div>
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(CommonPanel);
