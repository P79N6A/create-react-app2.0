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
 * @module GridEx
 * @author LUOJIA
 * @exports {
 *  GridEx
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "../styles/gridEx.less";
// import { Typography } from "@material-ui/core";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class GridEx extends React.Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 32,
        margin: [15, 15],
        compactType: "vertical",
        cols: { lg: 24, md: 18, sm: 12, xs: 6, xxs: 6 },
        scroll: false,
        layouts: {},
        layoutChange: () => {}
    };

    state = {
        currentBreakpoint: "lg",
        mounted: false,
        isDelete: false,
        layouts: {}
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            layouts: nextProps.layouts,
            layoutChange: nextProps.layoutChange
        });
    }
    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };
    onLayoutChange = (layout, layouts) => {
        this.props.layoutChange(layout, layouts);
    };
    render() {
        const { layouts } = this.state;
        const { draggableHandle, draggableCancel, rowHeight } = this.props;
        return (
            <ResponsiveReactGridLayout
                breakpoints={{
                    lg: 1100,
                    md: 850,
                    sm: 600,
                    xs: 500,
                    xxs: 0
                }}
                // breakpoints={{lg: 1100, md: 996, sm: 768, xs: 480, xxs: 0}}
                className="layout"
                cols={{ lg: 24, md: 18, sm: 12, xs: 9, xxs: 6 }}
                rowHeight={rowHeight}
                layouts={layouts}
                onBreakpointChange={this.onBreakpointChange}
                onLayoutChange={this.onLayoutChange}
                measureBeforeMount={false}
                margin={this.props.margin}
                useCSSTransforms={this.state.mounted}
                compactType={this.props.compactType}
                preventCollision={!this.props.compactType}
                verticalCompact={true}
                onDragStart={this.ItemCallback}
                draggableHandle={draggableHandle}
                draggableCancel={draggableCancel}
                onResize={this.onResize}
                {...this.props}
            >
                {this.props.children}
            </ResponsiveReactGridLayout>
        );
    }
}
GridEx.propTypes = {
    layouts: PropTypes.object.isRequired,
    margin: PropTypes.array,
    className: PropTypes.string,
    children: PropTypes.array
};
export default GridEx;
