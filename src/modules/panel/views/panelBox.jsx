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
import { theme } from "modules/theme";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CommonPanel from "./panelView/common";

const styles = theme => {
    return {
        card: {
            width: "100%",
            height: "100%"
        },
        header: {
            paddingBottom: 0,
            color: theme.palette.text.primary
        },
        content: {
            fontSize: 16,
            color: theme.palette.text.secondary,
            marginLeft: 10
        }
    };
};

class PanelBox extends Component {
    static defaultProps = {
        backgroundColor: "#cfcfcf",
        title: "Default Title",
        count: "No Data",
        iconColor: "white",
        icon: "alarm",
        onPropsChange: () => {},
        parameters: {},
        type: ""
    };
    static propTypes = {
        backgroundColor: PropTypes.string
    };
    state = {
        titleSizeData: {
            fontSize: "1.5rem",
            fontWeight: 400,
            lineHeight: "1.35417em",
            color: "#959595",
        },
        titleColor: "rgba(255, 255, 255, .87)",
        iconSizeData: {
            fontSize: "2.125rem",
            fontWeight: 400,
            lineHeight: "1.35417em",
            color: "#959595",
        },
        countSizeData: {
            fontSize: "2.125rem",
            fontWeight: 400,
            lineHeight: "1.35417em",
            color: "#959595",
        },
        parameterOneSizeValue: {
            fontSize: "1.5rem",
            fontWeight: 400,
            lineHeight: "1.35417em",
            color: "#959595",
        },
        parameterTwoSizeValue: {
            fontSize: "1.5rem",
            fontWeight: 400,
            lineHeight: "1.35417em",
            color: "#959595",
        },
    };
    componentWillMount() {
        const { identify } = this.props;
        const data = this.props[`panel${identify}`];
        this.setTitleData(data);
        this.setIconData(data);
        this.setCountData(data);
    };
    componentWillReceiveProps(nextProps) {
        const { identify } = this.props;
        const data = nextProps[`panel${identify}`];
        this.setTitleData(data);
        this.setIconData(data);
        this.setCountData(data);
        this.setParameterOneData(data);
        this.setParameterTwoData(data);
    };
    // set font data
    setTitleData = (data) => {
        if (data) {
            const { titleSizeValue } = data;
            const { typography } = theme;
            switch (titleSizeValue) {
                case "M":
                    this.setSize("titleSizeData", typography.body2);
                    break;
                case "L":
                    this.setSize("titleSizeData", typography.h4);
                    break;
                case "XL":
                    this.setSize("titleSizeData", typography.h3);
                    break;
                case "XXL":
                    this.setSize("titleSizeData", typography.h2);
                    break;
                case "XXXL":
                    this.setSize("titleSizeData", typography.h1);
                    break;
                default:
                    this.setSize("titleSizeData", typography.body2);
                    break;
            }
            this.setSize("titleColor", data.titleColor);
        }
    };
    // set icon size data
    setIconData = (data) => {
        if (data) {
            const { iconSizeValue } = data;
            const { typography } = theme;
            switch (iconSizeValue) {
                case "M":
                    this.setSize("iconSizeData", typography.body2);
                    break;
                case "L":
                    this.setSize("iconSizeData", typography.h4);
                    break;
                case "XL":
                    this.setSize("iconSizeData", typography.h3);
                    break;
                case "XXL":
                    this.setSize("iconSizeData", typography.h2);
                    break;
                case "XXXL":
                    this.setSize("iconSizeData", typography.h1);
                    break;
                default:
                    this.setSize("iconSizeData", typography.body2);
                    break;
            }
        }
    };
    // set count size data
    setCountData = (data) => {
        if (data) {
            const { countSizeValue } = data;
            const { typography } = theme;
            switch (countSizeValue) {
                case "M":
                    this.setSize("countSizeData", typography.body2);
                    break;
                case "L":
                    this.setSize("countSizeData", typography.h4);
                    break;
                case "XL":
                    this.setSize("countSizeData", typography.h3);
                    break;
                case "XXL":
                    this.setSize("countSizeData", typography.h2);
                    break;
                case "XXXL":
                    this.setSize("countSizeData", typography.h1);
                    break;
                default:
                    this.setSize("countSizeData", typography.body2);
                    break;
            }
        }
    };
    // set parameter one size data
    setParameterOneData = (data) => {
        if (data) {
            const { parameterOneSizeValue } = data;
            const { typography } = theme;
            switch (parameterOneSizeValue) {
                case "M":
                    this.setSize("parameterOneSizeValue", typography.body2);
                    break;
                case "L":
                    this.setSize("parameterOneSizeValue", typography.h4);
                    break;
                case "XL":
                    this.setSize("parameterOneSizeValue", typography.h3);
                    break;
                case "XXL":
                    this.setSize("parameterOneSizeValue", typography.h2);
                    break;
                case "XXXL":
                    this.setSize("parameterOneSizeValue", typography.h1);
                    break;
                default:
                    this.setSize("parameterOneSizeValue", typography.body2);
                    break;
            }
        }
    };
    // set parameter one size data
    setParameterTwoData = (data) => {
        if (data) {
            const { parameterTwoSizeValue } = data;
            const { typography } = theme;
            switch (parameterTwoSizeValue) {
                case "M":
                    this.setSize("parameterTwoSizeValue", typography.body2);
                    break;
                case "L":
                    this.setSize("parameterTwoSizeValue", typography.h4);
                    break;
                case "XL":
                    this.setSize("parameterTwoSizeValue", typography.h3);
                    break;
                case "XXL":
                    this.setSize("parameterTwoSizeValue", typography.h2);
                    break;
                case "XXXL":
                    this.setSize("parameterTwoSizeValue", typography.h1);
                    break;
                default:
                    this.setSize("parameterTwoSizeValue", typography.body2);
                    break;
            }
        }
    };
    setSize = (target, sizeData) => {
        this.setState({
            [target]: sizeData
        });
    };
    render() {
        const {
            identify,
            title,
            backgroundColor,
            icon,
            classes,
            iconColor,
            parameterOneColorValue,
            parameterTwoColorValue,
            count,
            loading,
            countColor,
            parameters,
            type
        } = this.props;
        const {
            titleSizeData,
            titleColor,
            iconSizeData,
            countSizeData,
            parameterOneSizeValue,
            parameterTwoSizeValue
        } = this.state;
        const data = this.props[`panel${identify}`];
        const bgColor = data && data.backgroundColor ? data.backgroundColor : backgroundColor;
        const panelTitle = (data && data.title) || title;
        const panelCount = (data && (data.count || "0")) || count;
        const panelIconType = (data && data.icon) || icon;
        const panelIconColor = (data && data.iconColor) || iconColor;
        const panelParameterOneColorValue = (data && data.parameterOneColorValue) || parameterOneColorValue;
        const panelParameterTwoColorValue = (data && data.parameterTwoColorValue) || parameterTwoColorValue;
        const panelCountColor = (data && data.countColor) || countColor;
        const panelLoading = (data && data.loading) || loading;
        const panelParameters = (data && data.parameters) || parameters;
        const panelType = (data && data.type) || type;
        return (
            <div className={`${classes.card} panel_box_wrap`}>
                <CommonPanel
                    bgColor={bgColor}
                    panelTitle={panelTitle}
                    panelCount={panelCount}
                    panelIconType={panelIconType}
                    panelIconColor={panelIconColor}
                    panelCountColor={panelCountColor}
                    titleSize={titleSizeData}
                    countSizeData={countSizeData}
                    parameterOneSizeValue={parameterOneSizeValue}
                    parameterTwoSizeValue={parameterTwoSizeValue}
                    parameterOneColorValue={panelParameterOneColorValue}
                    parameterTwoColorValue={panelParameterTwoColorValue}
                    titleColor={titleColor}
                    iconSizeData={iconSizeData}
                    loading={panelLoading}
                    panelParameters={panelParameters}
                    panelType={panelType}
                />
            </div>
        );
    }
}

export default withStyles(styles)(PanelBox);
