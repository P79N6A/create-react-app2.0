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
 * Created by KaiDi on 25/05/2018.
 */
import { WidthProvider, Responsive } from "react-grid-layout";

import React, { Component } from "react";
import PropTypes from "prop-types";
import theme from "commons/components/theme";
// import ReactDOM from "react-dom";
import "react-grid-layout/css/styles.css";
import "./styles/grid.less";
const ResponsiveGridLayout = WidthProvider(Responsive);

class Grid extends Component {
    constructor(props) {
        super(props);
        this.cols = 48;
        this.state = {
            className: "layout",
            // autoSize:true,
            isDraggable: false,
            isResizable: false,
            // items: 50,
            cols: { lg: 48, md: 40, sm: 35, xs: 25, xxs: 15 },
            // cols:12,
            rowHeight: 30,
            margin: [12, 12],
            width: 1800,
            // breakpoints:{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
            // style: { backgroundColor: theme.palette.primary.light },
            layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
        };
        this.layoutOrder = ["lg", "md", "sm", "xs", "xxs"];
        // this.resizeTimer;
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onWidthChange = this.onWidthChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }
    onBreakpointChange(brk, cols) {
        this.cols = cols;
    }
    onWidthChange(width, margin, cols) {
        // let {width} = this.state;
        let that = this;
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function() {
            if (that.state.width !== width) {
                that.state.width = width;
                that.setGridBackground();
            }
            // console.log(width+","+margin+","+cols);
        }, 1000);
    }
    onLayoutChange(layout, layouts) {
        let { onLayoutChange } = this.props;
        onLayoutChange && onLayoutChange(layout, layouts);
        this.setState({ layouts });
    }
    // componentWillUpdate() {
    //     // this.setGridBackground();
    // }
    componentWillMount() {
        let mode = this.props.editMode;
        let layouts = this.props.saveToLocal ? this.getLayout() : {};
        layouts = Object.assign({}, this.state.layouts, layouts);
        this.setState({ isDraggable: mode, isResizable: mode, layouts });
    }
    componentDidMount() {
        this.setGridBackground();
        let layout = this.packageLayout(this.state.layouts);
        this.saveLayout(layout);
        document.querySelector("#root").setAttribute("style", "background:" + theme.palette.background.default);
    }
    componentWillReceiveProps(nextProps) {
        let mode = nextProps.editMode;
        if (mode !== this.props.editMode) {
            this.setState({ isDraggable: mode, isResizable: mode });
        }
        if (nextProps.newComp && nextProps.newComp.name) {
            this.compList.push(nextProps.newComp);
        }
    }
    componentWillUpdate(nextProps, nextState) {
        // let layoutList = nextProps.children.map(item => item.props.ccmslayout);
        // this.setState({ layouts: this.analysisLayout(layoutList) });
    }
    getCellSize(rowHeight) {
        return {
            width: (this.state.width - this.state.margin[0]) / this.cols,
            height: rowHeight ? rowHeight : this.state.rowHeight
        };
    }
    getColBkDom(length, cellSize, margin) {
        let arr = [];
        if (length) {
            for (let i = 0; i < length; i++) {
                arr.push(
                    `<rect stroke='rgba(0, 0, 0, 0.1)' stroke-width='1' fill='none' x='${margin[0] +
                        i * cellSize.width}' y='${0}' width='${cellSize.width - margin[0]}' height='${
                        cellSize.height
                    }'/>`
                );
            }
        }
        return arr;
    }
    setGridBackground() {
        if (!this.refs.grid) {
            return;
        }
        if (!this.props.editMode) {
            return;
        }
        let margin = this.state.margin;
        let height = document.querySelector("#root").clientHeight - 64;
        let rowHeight = Math.round(height / 22 - margin[1]);
        let cellSize = this.getCellSize(rowHeight);
        let colBkDom = this.getColBkDom(this.cols, cellSize, margin);
        let bk =
            `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${cellSize.width *
                this.cols}' height='${cellSize.height + margin[1]}'>` +
            colBkDom.join("") +
            `</svg>")`;
        console.log(rowHeight);
        this.setState({
            rowHeight,
            style: { backgroundImage: bk, backgroundPositionY: margin[1] }
        });
    }
    render() {
        // layout is an array of objects, see the demo for more complete usage
        // var layout = [
        //   {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        //   {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 1, maxW: 4},
        //   {i: 'c', x: 4, y: 3, w: 1, h: 2}
        // ];
        const { draggableHandle, draggableCancel,children } = this.props;
        // let layoutList = children.length>1?children.map(item=>(item.props.children.props.ccmslayout)):;
        let layoutList = children.length?children.map(item=>(item.props.children.props.ccmslayout)):[children.props.children.props.ccmslayout];
        let layouts = this.analysisLayout(layoutList);
        let state = {...this.state,layouts};

        return (
            <ResponsiveGridLayout
                className="CCMS-Grid"
                ref="grid"
                {...state}
                onBreakpointChange={this.onBreakpointChange}
                onWidthChange={this.onWidthChange}
                onLayoutChange={this.onLayoutChange}
                draggableHandle={draggableHandle}
                draggableCancel={draggableCancel}
            >
                {this.props.children}
            </ResponsiveGridLayout>
        );
    }
    saveLayout(value) {
        if (!this.props.saveToLocal) {
            return;
        }
        window.localStorage.setItem(this.props.id + "page", JSON.stringify(value));
    }
    getLayout() {
        let list = { lg: [], md: [], sm: [], xs: [], xxs: [] };
        let config = window.localStorage.getItem(this.props.id + "page");
        if (config) {
            list = JSON.parse(config);
        }
        return list;
    }
    packageLayout(layouts) {
        let result = [];
        this.layoutOrder.forEach(function(item) {
            const layout = layouts[item];
            layout.forEach(function(lay, index) {
                let temp = result[index] ? result[index] : {};
                for (let i in lay) {
                    const value = lay[i];
                    if (i === "i") {
                        temp[i] = value;
                    } else {
                        temp[i] = temp[i] ? temp[i] : [];
                        temp[i].push(value);
                    }
                }
                result[index] = temp;
            });
        });
        return result;
    }
    analysisLayout(layouts) {
        let result = {};
        layouts.forEach(function(layout) {
            let temp = {};
            this.layoutOrder.forEach(function(item, index) {
                let lay = {};
                for (let i in layout) {
                    const value = layout[i] instanceof Array ? layout[i][index] : layout[i];
                    lay[i] = value !== undefined ? value : temp[i];
                }
                temp = lay;
                if (!result[item]) {
                    result[item] = [];
                }
                result[item].push(lay);
            });
        }, this);
        return result;
    }
}

Grid.defaultProps = {
    editMode: false,
    saveToLocal: false,
    draggableHandle: "",
    draggableCancel: ""
};
Grid.protoTypes = {
    editMode: PropTypes.bool.isRequired,
    saveToLocal: PropTypes.bool.isRequired,
    id: PropTypes.bool.isRequired,
    onLayoutChange: PropTypes.func,
    draggableHandle: PropTypes.string,
    draggableCancel: PropTypes.string
};

export default Grid;
