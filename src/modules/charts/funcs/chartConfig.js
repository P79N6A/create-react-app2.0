// import { theme } from "modules/theme";
import _ from "lodash";
// const textColor = theme.typography.display1.color;
// const backgroundColor = theme.palette.background.paper;

const legendMap = {
    Top: { left: "center", top: "top" },
    Bottom: { left: "center", top: "bottom" },
    Left: { left: "left", top: "center" },
    Right: { left: "right", top: "center" }
};

const toolbox = (backgroundColor, name, switchXY) => ({
    feature: {
        saveAsImage: {
            title: "Save as Image",
            name,
            backgroundColor
        },
        dataView: {
            title: "View Data",
            show: true,
            readOnly: true,
            lang: ["View Data", "Close", "Refresh"],
            optionToContent: function(opt) {
                const { series } = opt;
                let table;
                if (series[0].type === "line" || series[0].type === "bar") {
                    const axisData = switchXY ? opt.yAxis[0].data : opt.xAxis[0].data;
                    var ths = "";
                    _.forEach(series, s => {
                        ths += "<td>" + s.name + "</td>";
                    });
                    table = "<table style='width:100%;text-align:center'><tbody><tr><td></td>" + ths;
                    _.forEach(axisData, (axis, i) => {
                        let tds = "";
                        _.forEach(series, s => {
                            const data = _.isArray(s.data[i]) ? (switchXY ? s.data[i][0] : s.data[i][1]) : s.data[i];
                            tds += "<td>" + data + "</td>";
                        });
                        table += "<tr><td>" + axis + "</td>" + tds + "</tr>";
                    });
                } else {
                    table = "<table style='width:100%;text-align:center'><tbody><tr><td>name</td><td>value</td>";
                    _.forEach(series[0].data, data => {
                        table += "<tr><td>" + data.name + "</td><td>" + data.value + "</td></tr>";
                    });
                }
                table += "</tbody></table>";
                return table;
            }
        }
    },
    right: 20,
    bottom: 15
});

const automaticMin = value => {
    const length = String(Math.round(value.min)).length - 1;
    let interval = 1;
    for (let i = 0; i < length; i++) {
        interval = interval * 10;
    }
    const v = _.inRange(value.min, 0, 10) ? 0 : Math.round(value.min - interval);
    return v;
};

const noDatagraphic = textColor => ({
    type: "text",
    left: "center",
    top: "center",
    z: 100,
    style: {
        fill: textColor,
        text: "No Suitable Data To Display"
    }
});

const lineBar = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross"
        }
    },
    xAxis: {},
    yAxis: [
        {
            type: "value",
            splitLine: {
                show: false
            },
            min: automaticMin
        }
    ],
    series: [
        {
            data: [],
            type: "line"
        }
    ]
};

const pieDonut = {
    title: {
        text: "",
        left: "center",
        top: 20,
        textStyle: {
            color: "#ccc"
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: {
        name: "",
        type: "pie",
        radius: "75%",
        data: [],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
            }
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function(idx) {
            return Math.random() * 200;
        }
    }
};

const gauge = {
    title: {
        text: "",
        left: "center",
        top: 20
        // textStyle: {
        //     color: textColor
        // }
    },
    tooltip: {
        formatter: "{a} <br/>{b} : {c}"
    },
    series: {
        name: "",
        type: "gauge",
        min: 0,
        max: 100,
        detail: {
            formatter: "{value}"
            // offsetCenter: [0, "40%"],
        },
        axisLine: {
            lineStyle: {
                width: 10,
                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]]
            }
        },
        title: {
            offsetCenter: [0, "20%"],
            textStyle: {
                fontWeight: "bolder",
                // fontSize: 20,
                fontStyle: "italic",
                // color: textColor,
                // shadowColor: textColor, //默认透明
                shadowBlur: 10
            }
        },
        data: [
            {
                value: 0,
                name: ""
            }
        ]
    }
};

export { lineBar, pieDonut, gauge, legendMap, noDatagraphic, automaticMin, toolbox };
