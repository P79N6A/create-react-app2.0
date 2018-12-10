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
 * Created by xulu on 31/08/2018.
 */
import React from "react";
import "../styles/style.less";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reducerName as topoTreeReducerName } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import { reducerName as topoGraphReducerName } from "modules/topologyTreeAndGraph/topologyGraph";
import _ from "lodash";
import { getTopoGraph, topoGraphSelectNode, searchGraphArea } from "../funcs/actions";
import DeviceImg from "../images/device.png";
import vis from "vis";
import ApplicationIcon from "../images/application.svg";
import Typography from "@material-ui/core/Typography";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";

const Placeholder = props => {
    const content = props.content;
    return (
        <div className="progress-cont">
            <Typography variant="caption" gutterBottom align="center" className="no-data">
                {content}
            </Typography>
        </div>
    );
};
const graphOptions = {
    autoResize: true,
    height: "100%",
    width: "100%",
    locale: "en",
    // locales: locales,
    clickToUse: false,
    // configure: {...},    // defined in the configure module.
    edges: {
        color: {
            color: "#03acb4",
            highlight: "#03acb4",
            hover: "#03acb4",
            inherit: "from",
            opacity: 1.0
        },
        font: {
            align: "middle",
            color: "#848484",
            size: 10,
            strokeWidth: 0
        },
        smooth: {
            enabled: false
        }
    },
    nodes: {
        color: {
            border: "#848484",
            background: "#03acb4",
            highlight: {
                border: "#2B7CE9",
                background: "#D2E5FF"
            },
            hover: {
                border: "#2B7CE9",
                background: "#D2E5FF"
            }
        },
        shape: "image",
        size: 20,
        font: {
            color: "#dcdcdc"
        }
    }
};

class NewTopologyGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataDisplay: this.props.noDataDisplay,
            sysDevicetypes: this.props.sysDevicetypes,
            allNodes: [],
            allLinks: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.sysDevicetypes.length && nextProps.sysDevicetypes.length) {
            this.setState({
                sysDevicetypes: nextProps.sysDevicetypes
            });
        }
        if (JSON.stringify(this.props.wsMessage) !== JSON.stringify(nextProps.wsMessage) && nextProps.wsMessage) {
            if (nextProps.wsMessage.topic === "topoTreeSelect") {
                this.props.getTopoGraph(this.props.identify, nextProps.wsMessage.data[0].id);
                this.deviceCount = 0;
            } else if (nextProps.wsMessage.topic === "mapDrawForTopology") {
                let areaFormat = nextProps.wsMessage.data[0] && nextProps.wsMessage.data[0].mapDrawForTopologyData[0];
                if (!areaFormat) {
                    return;
                }
                let data = {
                    format: "spatial",
                    relationships: {
                        IS_AT_PLACE: "BOTH",
                        HAS_GEOGRAPHIC_LOCATION_NAME: "BOTH",
                        HAS_GEOGRAPHIC_LOCATION: "BOTH"
                    },
                    type: "graphs",
                    uniqueness: "NODE_PATH"
                };

                if (areaFormat.hasOwnProperty("radius")) {
                    let radius = areaFormat.radius;
                    let centerpoint = areaFormat.centerpoint[0];
                    data = Object.assign(data, {
                        radius: radius,
                        centerpoint: centerpoint
                    });
                } else {
                    data = Object.assign(data, areaFormat);
                }
                this.props.searchGraphArea(this.props.identify, JSON.stringify(data));
            }
        }
        if (this.props.currentSelectNode !== nextProps.currentSelectNode && nextProps.currentSelectNode) {
            this.props.getTopoGraph(this.props.identify, nextProps.currentSelectNode);
        }

        if (this.props.searchGraphSuccess !== nextProps.searchGraphSuccess && nextProps.searchGraphSuccess) {
            let graphs = nextProps.topoGraphData.graphs || {};
            let nodesData = graphs.nodes;
            let linksData = graphs.relations;
            let allNodes = [];
            let allLinks = [];

            _.forEach(nodesData, node => {
                let nodeType = node.id.indexOf("atomicphysicaldevice") > -1 ? "device" : "address";
                let formatNode = {
                    id: node.nodeid,
                    label: node.name,
                    nodeType: nodeType,
                    sensorstatus: node.sensorstatus ? node.sensorstatus : null,
                    image: nodeType === "deivce" ? DeviceImg : ApplicationIcon,
                    iotId: node.id,
                    deviceTypeId: node["devicemodel.iotTopologyId"]
                };
                allNodes.push(formatNode);
            });
            _.forEach(linksData, link => {
                let formatLink = {
                    from: link.from,
                    to: link.to,
                    label: link.name
                };
                allLinks.push(formatLink);
            });

            _.forEach(allNodes, node => {
                if (node.iotId.indexOf("atomicphysicaldevice") > -1) {
                    _.forEach(this.state.sysDevicetypes, deviceType => {
                        if (deviceType.deviceTypeId === node.deviceTypeId) {
                            let icon = deviceType.deviceTypeIcon;
                            let currentUri = formatIconPath("iconInTopology", icon);
                            if (currentUri) {
                                node.image = currentUri.uri;
                            }
                        }
                    });
                }
            });

            this.setState({
                allNodes: allNodes,
                allLinks: allLinks
            });

            this.renderGraphFunc(allNodes, allLinks);
        }
    }

    renderGraphFunc(allNodes, allLinks) {
        // let allNodes = this.state.allNodes;
        // let allLinks = this.state.allLinks;

        let nodes = new vis.DataSet(allNodes);

        // create an array with edges
        let edges = new vis.DataSet(allLinks);

        let data = {
            nodes: nodes,
            edges: edges
        };

        let network = new vis.Network(this.refs.myRef, data, graphOptions);
        let statusObject = {
            Online: "#32CD32",
            Offline: "#808080"
        };

        let noDataDisplay = allNodes.length ? false : true;
        this.setState({
            noDataDisplay: noDataDisplay
        });
        if (noDataDisplay) {
            return;
        }

        network.on("afterDrawing", function(ctx) {
            _.forEach(allNodes, node => {
                if (node.nodeType === "device") {
                    let nodeId = node.id;
                    let nodePosition = network.getPositions([nodeId]);

                    // draw sensorstatus circle
                    ctx.fillStyle = statusObject[node.sensorstatus];
                    ctx.circle(nodePosition[nodeId].x - 15, nodePosition[nodeId].y + 15, 10);
                    ctx.fill();

                    // draw sensorstatus circle
                    ctx.strokeStyle = "#808080";
                    ctx.lineWidth = 1;
                    ctx.circle(nodePosition[nodeId].x + 15, nodePosition[nodeId].y + 15, 10);
                    ctx.stroke();

                    ctx.fillStyle = "#808080";
                    ctx.circle(nodePosition[nodeId].x + 10, nodePosition[nodeId].y + 15, 2);
                    ctx.fill();
                    ctx.circle(nodePosition[nodeId].x + 15, nodePosition[nodeId].y + 15, 2);
                    ctx.fill();
                    ctx.circle(nodePosition[nodeId].x + 20, nodePosition[nodeId].y + 15, 2);
                    ctx.fill();
                }
            });
        });

        network.on("click", params => {
            let nodeId = params.nodes && params.nodes[0];
            if (!nodeId) {
                return;
            }
            let pointerXY = params.pointer.canvas;
            let nodePosition = network.getPositions([nodeId]);
            console.log("pointerXY: ", pointerXY, "nodePosition: ", nodePosition);

            let isClickIcon = false;
            for (let key in pointerXY) {
                if (
                    pointerXY[key] - nodePosition[nodeId][key] >= 6 &&
                    pointerXY[key] - nodePosition[nodeId][key] <= 17
                ) {
                    isClickIcon = true;
                } else {
                    isClickIcon = false;
                }
            }

            if (isClickIcon) {
                let selectIotId = null;
                _.forEach(allNodes, node => {
                    if (node.id === nodeId) {
                        selectIotId = node.iotId;
                        this.props.topoGraphSelectNode(this.props.identify, selectIotId);
                        this.props.handleFloatTabOpen(this.props.identify);
                    }
                });
            }
        });
    }

    render() {
        const { noDataDisplay } = this.state;
        return (
            <div style={{ height: "calc(100% - 68px)", position: "relative" }}>
                <div ref="myRef" style={{ height: "100%" }} />
                {noDataDisplay ? <Placeholder content="No data to display." /> : null}
            </div>
        );
    }
}

NewTopologyGraph.propTypes = {
    identify: PropTypes.string
};

NewTopologyGraph.defaultProps = {
    identify: "testNewGraph",
    noDataDisplay: true
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentSelectNode: filterProps(state, identify, topoTreeReducerName, "currentSelectNode"),
        topoGraphData: filterProps(state, identify, topoGraphReducerName, "topoGraphData"),
        searchGraphSuccess: filterProps(state, identify, topoGraphReducerName, "searchGraphSuccess"),
        deviceDetail: filterProps(state, identify, topoGraphReducerName, "deviceDetail"),
        searchDeviceTypeSuccess: filterProps(state, identify, topoGraphReducerName, "searchDeviceTypeSuccess"),
        wsMessage: state[topoGraphReducerName] && state[topoGraphReducerName].wsMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopoGraph: (identify, iotId) => {
            dispatch(getTopoGraph(identify, iotId));
        },
        topoGraphSelectNode: (identify, nodeId) => {
            dispatch(topoGraphSelectNode(identify, nodeId));
        },
        searchGraphArea: (identify, areaFormat) => {
            dispatch(searchGraphArea(identify, areaFormat));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewTopologyGraph);
