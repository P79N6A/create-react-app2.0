import React, { Component } from "react";
import GridEx from "./gridEx";
import "./index.less";
export default class Dashboard extends Component {
    state = {
        layout: [
            { i: "a", x: 0, y: 0, w: 5, h: 7, static: true },
            { i: "b", x: 1, y: 0, w: 22, h: 4, static: true },
            { i: "c", x: 4, y: 0, w: 6, h: 10, static: true },
            { i: "d", x: 4, y: 0, w: 5, h: 4, minW: 5, maxW: 8, static: true },
            { i: "e", x: 4, y: 0, w: 10, h: 3, maxW: 10, static: true }
        ]
    };
    componentDidMount() {
        const { layout } = this.state;
        setTimeout(() => {
            let rootLay = layout.map(item => {
                item.x = 3;
                item.static = false;
                return item;
            });
            this.setState({
                layout: rootLay
            });
        }, 5000);
    }
    render() {
        var { layout } = this.state;
        return (
            <GridEx layouts={{lg:layout}} getLayouts={() => {}}>
                {layout.map((item, index) => {
                    return (
                        <div key={index}>
                            {index}
                        </div>
                    );
                })}
            </GridEx>
        );
    }
}
