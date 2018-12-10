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
 * Created by @luojia on 25/05/18.
 */
import React from "react";
// import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
// import "../styles/react-grid-layout.less";
import "../../styles/react-grid-layout.less";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashaboardListView extends React.Component {
    static defaultProps = {
        draggableHandle: "",
        draggableCancel: "",
        className: "ccms-layout",
        rowHeight: 30,
        margin: [10, 10],
        // verticalCompact: false,
        compactType: "vertical",
        // onLayoutChange: function(layout, layouts) {},
        defaultCols: { lg: 32, md: 18, sm: 12, xs: 6, xxs: 6 },
        colsScale: { lg: 32, md: 32, sm: 32, xs: 32, xxs: 32 },
        scroll: false,
        layouts: {},
        isDraggable: true,
        isResizable: true,
        breakpoints: { lg: 1100, md: 850, sm: 600, xs: 500, xxs: 0 },
        breakpointsScale: { lg: 3000, md: 3000, sm: 3000, xs: 3000, xxs: 3000 },
        isBreakpoints: false
    };

    state = {
        currentBreakpoint: "lg",
        mounted: true,
        isDelete: false,
        layouts: {}
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            layouts: nextProps.layouts
        });
    }
    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };
    onLayoutChange = (layout, layouts) => {
        this.props.getLayouts(layouts);
        // this.props.onLayoutChange(layout, layouts);
    };
    onResize = (i, currItem) => {
        this.props.onResize(currItem);
    };
    render() {
        // const { currentBreakpoint } = this.state;
        const { isBreakpoints, breakpoints, breakpointsScale, colsScale, defaultCols } = this.props;
        let rootCols = !isBreakpoints ? defaultCols : colsScale;
        let rootBreakpoints = !isBreakpoints ? breakpoints : breakpointsScale;
        return (
            <ResponsiveReactGridLayout
                breakpoints={rootBreakpoints}
                cols={rootCols}
                // breakpoints={{lg: 1100, md: 996, sm: 768, xs: 480, xxs: 0}}
                layouts={this.state.layouts}
                onBreakpointChange={this.onBreakpointChange}
                onLayoutChange={this.onLayoutChange}
                measureBeforeMount={false}
                margin={this.props.margin}
                useCSSTransforms={this.state.mounted}
                compactType={this.props.compactType}
                preventCollision={!this.props.compactType}
                verticalCompact={true}
                // isDraggable={!!this.props.isDraggable}
                // isResizable={!!this.props.isResizable}
                onDragStart={this.ItemCallback}
                onResize={this.onResize}
                // draggableHandle = '.HeadBar-drag'
                draggableCancel={this.props.draggableCancel}
                {...this.props}
            >
                {this.props.children}
            </ResponsiveReactGridLayout>
        );
    }
}
export default DashaboardListView;
