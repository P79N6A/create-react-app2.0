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
 * Created by wplei on 25/05/18.
 */

import React, { Component } from "react";
// import PropTypes from "prop-types";
import Preview from "./previewDrawer";
import Operate from "./operateDrawer";
import { withStyles } from "@material-ui/core/styles";

const styles = Theme => {
    return {};
};

class WidgetsDrawer extends Component {
    state = {};
    static defaultProps = {
        open: false,
        activeStep: 0,
        onWidgetAction: () => {},
        onWidgetSelected: () => {}
    };
    static propTypes = {};
    handleActionClick = (type, container) => {
        this.props.onOperate(type, container);
    };
    handleWidgetSelected = (template, category) => {
        // console.log(template);
        this.props.onWidgetSelected(template, category);
        // this.setState({
        //     activeStep: 1
        // });
    };
    handleCategoryChange = category => {
        this.props.onCategoryChange(category);
    };
    render = () => {
        // const {} = this.state;
        const {
            open,
            previewComponent,
            previewProps,
            previewLayout,
            editorComponent,
            title,
            activeStep,
            onClick,
            id,
            category,
            compId,
            templates,
            widgetList,
            ccmsAction,
            settings,
            MuiTheme,
            app
        } = this.props;
        return (
            <React.Fragment>
                <Preview
                    app={app}
                    id={id}
                    open={open}
                    MuiTheme={MuiTheme}
                    ccmsAction={ccmsAction}
                    editable={false}
                    settings={settings}
                    props={previewProps}
                    layout={previewLayout}
                    view={previewComponent}
                />
                <Operate
                    id={id}
                    open={open}
                    widgetList={widgetList}
                    category={category}
                    compId={compId}
                    title={title}
                    templates={templates}
                    props={previewProps}
                    view={editorComponent}
                    activeStep={activeStep}
                    onWidgetSelected={this.handleWidgetSelected}
                    onClose={() => onClick(null, "close")}
                    onActionClick={this.handleActionClick}
                    onCategoryChange={this.handleCategoryChange}
                />
            </React.Fragment>
        );
    };
}

export default withStyles(styles)(WidgetsDrawer);
