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
import { Tree, TreeNode } from "modules/common";
import Theme from "commons/components/theme";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTopoTreeData, searchTopoTreeData, searchTopoTreeAddressData } from "../funcs/actions";
import { reducerName as topoTreeReducerName } from "modules/topologyTreeAndGraph/topologyTreeGrid";
import jp from "jsonpath";
import _ from "lodash";
// import CardContent from "@material-ui/core/Card";
import SearchTopoTree from "./searchTopoTree";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Tooltip from "@material-ui/core/Tooltip";
import * as msg from "commons/utils/messageBus";
import store from "commons/store";
import { Icon } from "antd";
import ApplicationIcon from "../images/application.svg";
import TreePagination from "./topoTreePagination";
import TreeFilterConfig from "../treeFilterConfig";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";

const nodePath = "$.nodes";
const defaultIcon = formatIconPath("iconInTopology", "default");

class TopologyTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultExpandedKeys: [],
            treeData: [],
            expandedKeys: [],
            selectedKeys: [],
            pagination: this.props.searchPagination || this.props.pagination,
            searchMode: this.props.searchMode,
            needDefaultSelect: this.props.needDefaultSelect,
            treeMode: this.props.treeMode,
            searchText: "",
            sysDevicetypes: this.props.sysDevicetypes,
            selectAppId: this.props.selectAppId,
            selectAppRespath: this.props.selectAppRespath,
            pageLimit: this.props.pageLimit,
            pageNo: this.props.pageNo
        };
        this.treeData = [];
        this.rootNode = null;
        this.roles =
            sessionStorage.getItem("ISC-CURRENT-USER") && JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")).roles;
        this.props.getTopoTreeData(this.props.identify, this.roles, this.props.treeMode, null, this.state.selectAppId);
        store.dispatch(msg.subscribe("topoTreeSelect", "ISC_MSG_BUS", "topoTreeSelect"));
        this.treeFilter = TreeFilterConfig[this.state.treeMode];
        // this.addressOutPutList =
        // this.state.treeMode === "device" ? this.props.deviceOutPutList : this.props.addressOutPutList;
        this.searchCount = 0;
        this.searchResult = [];
        this.shouldSearchCount = this.state.treeMode === "device" ? 2 : 1;
        this.underAppFilter = TreeFilterConfig["underApplication"];
        this.searchPagination = {
            currentpage: 1,
            limit: 10,
            totalpages: 0,
            totalrecords: 0
        };
    }

    componentDidMount() {
        if (this.props.currentDevice) {
            this.setState({
                searchText: this.props.currentDevice && this.props.currentDevice.deviceName
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.sysDevicetypes.length && nextProps.sysDevicetypes.length) {
            this.setState({
                sysDevicetypes: nextProps.sysDevicetypes
            });
        }
        // get topo tree data success
        if (
            this.props.getTopoTreeDataSuccess !== nextProps.getTopoTreeDataSuccess &&
            nextProps.getTopoTreeDataSuccess &&
            nextProps.topoTreeData
        ) {
            let nodes = jp.query(nextProps.topoTreeData, nodePath)[0];
            this.generateTreeData(nodes);
            if (nextProps.callback) {
                nextProps.callback();
            }
        }
        // search topo tree data successs
        if (
            this.props.searchTopoTreeDataSuccess !== nextProps.searchTopoTreeDataSuccess &&
            nextProps.searchTopoTreeDataSuccess &&
            nextProps.searchTopoData
        ) {
            let searchNodes = nextProps.searchTopoData;
            this.searchResult = this.searchResult.concat(searchNodes);
            this.searchCount++;

            if (this.state.treeMode === "device" && this.searchCount !== this.shouldSearchCount) {
                const { searchWord, pageNo, pageLimit, selectAppRespath } = this.state;
                _.forEach(TreeFilterConfig["device"], filter => {
                    filter.value = searchWord;
                });
                this.underAppFilter.value = this.state.selectAppRespath;
                this.props.searchTopoTreeData(
                    this.props.identify,
                    searchWord,
                    pageNo,
                    pageLimit / 2,
                    TreeFilterConfig["device"],
                    this.props.deviceOutPutList,
                    selectAppRespath,
                    this.underAppFilter,
                    nextProps.callback
                );
            }
            if (this.searchCount === this.shouldSearchCount) {
                this.searchPagination = {
                    currentpage: nextProps.searchPagination.currentpage,
                    limit: this.searchPagination.limit,
                    totalpages: this.searchPagination.totalpages + nextProps.searchPagination.totalpages,
                    totalrecords: this.searchPagination.totalrecords + nextProps.searchPagination.totalrecords
                };
                this.generateSearchTree(this.searchResult, this.searchPagination);
                if (nextProps.callback) {
                    nextProps.callback();
                }
            }
        }
    }

    generateSearchTree(nodes, searchPagination) {
        let parentNode = [];
        let expandKeys = [`${this.rootNode.key}`];
        let allNodes = [];

        _.forEach(nodes, node => {
            let isDevice = node["physical.iotTopologyId"] ? true : false;
            if (isDevice) {
                this.renderDeviceTreeSearch(node, expandKeys, parentNode);
            } else {
                this.renderAddressTreeSearch(node, expandKeys, parentNode);
            }
        });

        if (parentNode.length) {
            let parentNodeCopy = _.cloneDeep(parentNode);
            _.forEach(parentNodeCopy, (parent, index) => {
                if (parent.key === this.rootNode.key && parent.name === this.rootNode.name) {
                    parentNode.splice(index, 1);
                }
            });
            allNodes.push(_.cloneDeep(this.rootNode));
            this.renderSearchTreeDataFunc(allNodes, parentNode, expandKeys);
        }

        let pagination = {
            totalrecords: searchPagination.totalrecords,
            limit: searchPagination.limit,
            currentpage: searchPagination.currentpage
        };

        this.setState({
            expandedKeys: expandKeys,
            treeData: [...allNodes],
            searchMode: true,
            pagination: pagination
        });
    }

    renderSearchTreeDataFunc = (parentNode, allNodes, expandKeys) => {
        _.forEach(parentNode, parent => {
            _.forEach(allNodes, child => {
                if ((parent.id === child.parentkey && parent.name !== child.name) || parent.name === child.parentkey) {
                    parent.children.push(child);
                    if (parent.resourcetype === "devices") {
                        parent.isLeaf = false;
                        expandKeys.push(parent.id);
                    }
                }
            });
            if (parent.children.length) {
                this.renderSearchTreeDataFunc(parent.children, allNodes, expandKeys);
            }
        });
    };

    renderDeviceTreeSearch(node, expandKeys, parentNode) {
        let resourcePath = node["physical.resourcePath"].split("/");
        _.forEach(resourcePath, (path, index) => {
            if (path) {
                if (index < resourcePath.length - 1) {
                    let newParentNode = {
                        title: path,
                        key: path,
                        displayname: path,
                        name: path,
                        id: path,
                        resourcetype: "address",
                        resourcepath: path,
                        parentkey: index === 1 ? this.rootNode.key : resourcePath[index - 1],
                        selectable: true,
                        isLeaf: false,
                        children: []
                    };
                    let findInExpand = false;
                    let findInParent = false;
                    _.forEach(expandKeys, expandKey => {
                        if (expandKey === path) {
                            findInExpand = true;
                        }
                    });
                    _.forEach(parentNode, parent => {
                        if (parent.key === newParentNode.key || parent.name === newParentNode.key) {
                            findInParent = true;
                        }
                    });
                    if (!findInExpand && !findInParent) {
                        expandKeys.push(path);
                        parentNode.push(newParentNode);
                    }
                } else if (index === resourcePath.length - 1) {
                    let newChildNode = {
                        title: node["physical.name"],
                        key: node["physical.iotTopologyId"],
                        displayname: node["physical.displayName"],
                        name: node["physical.name"],
                        id: node["physical.iotTopologyId"],
                        resourcetype: "devices",
                        resourcepath: node["physical.resourcePath"],
                        parentkey: resourcePath[index - 1],
                        selectable: true,
                        isLeaf: true,
                        deviceTypeId: node["devicemodel.iotTopologyId"] || "",
                        children: []
                    };
                    let findDeviceInParent = false;
                    _.forEach(parentNode, parent => {
                        if (parent.name === newChildNode.name) {
                            findDeviceInParent = true;
                        }
                    });
                    if (!findDeviceInParent) {
                        parentNode.push(newChildNode);
                    }
                }
            }
        });
    }

    renderAddressTreeSearch(node, expandKeys, parentNode, childNode) {
        let resourcePath = node["address.resourcePath"].split("/");
        _.forEach(resourcePath, (path, index) => {
            if (path) {
                let newParentNode = {
                    title: path,
                    key: path,
                    displayname: path,
                    name: path,
                    id: path,
                    resourcetype: "address",
                    resourcepath: path,
                    parentkey: index === 1 ? this.rootNode.key : resourcePath[index - 1],
                    selectable: true,
                    isLeaf: index < resourcePath.length - 1 ? false : true,
                    children: []
                };
                let findInExpand = false;
                let findInParent = false;
                _.forEach(expandKeys, expandKey => {
                    if (expandKey === path) {
                        findInExpand = true;
                    }
                });
                _.forEach(parentNode, parent => {
                    if (parent.key === newParentNode.key || parent.name === newParentNode.key) {
                        findInParent = true;
                        if (parent.isLeaf) {
                            parent.isLeaf = false;
                        }
                    }
                });
                if (!findInExpand && !findInParent) {
                    expandKeys.push(path);
                    parentNode.push(newParentNode);
                }
            }
        });
    }

    generateTreeData(nodes) {
        let parentNode = null;
        let childNode = [];
        let rootSelect = [];
        let deviceMode = this.state.treeMode === "address" ? false : true;

        _.forEach(nodes, node => {
            if (node.parentid === "PARENT_NONE") {
                if (!this.rootNode || this.rootNode.key === node.id) {
                    parentNode = {
                        title: node.name,
                        key: node.id,
                        displayname: node.displayname,
                        name: node.name,
                        id: node.id,
                        resourcetype: node.resourcetype,
                        resourcepath: node.layerpath,
                        selectable: true,
                        children: [],
                        hasAddress: node.haschildaddress || true
                    };
                } else {
                    parentNode = {
                        title: node.name,
                        key: Math.random().toString(),
                        displayname: node.displayname,
                        name: node.name,
                        id: node.id,
                        resourcetype: node.resourcetype,
                        resourcepath: node.layerpath,
                        selectable: true,
                        children: [],
                        hasAddress: node.haschildaddress || true
                    };
                }
            } else {
                childNode.push(node);
            }
            if (!this.rootNode && node.parentid === "PARENT_NONE" && !node.depth) {
                this.rootNode = {
                    title: node.name,
                    key: node.id,
                    displayname: node.displayname,
                    name: node.name,
                    id: node.id,
                    resourcetype: node.resourcetype,
                    resourcepath: node.layerpath,
                    selectable: true,
                    children: [],
                    hasAddress: node.haschildaddress || true
                };
                this.props.currentSelectTreeNode(this.props.identify, this.rootNode.key);
                if (this.state.needDefaultSelect) {
                    this.props.getCurrentSelectNode(this.rootNode);
                }
                rootSelect.push(this.rootNode.key);
                this.setState({
                    selectedKeys: (this.state.needDefaultSelect && rootSelect) || []
                });
            }
        });

        if (!parentNode) {
            return;
        }

        _.forEach(childNode, node => {
            let hasChild = deviceMode ? node.childrencount : node.haschildaddress;
            let data = {
                title: node.name,
                key: Math.random().toString(),
                displayname: node.displayname,
                name: node.name,
                id: node.id,
                resourcetype: node.resourcetype,
                resourcepath: node.layerpath,
                selectable: true,
                children: [],
                hasAddress: node.haschildaddress,
                deviceTypeId: node["devicemodel.iotTopologyId"] || "",
                isLeaf: hasChild ? false : true
            };
            if (deviceMode || parentNode.hasAddress) {
                parentNode.children.push(data);
            }
        });
        let expandedKeys = this.state.expandedKeys;
        let treeData = this.state.treeData;
        this.insertToTreeData(treeData, parentNode, expandedKeys, deviceMode);
        this.setState({
            expandedKeys: expandedKeys,
            treeData: [...this.state.treeData],
            defaultSelectedKeys: (this.state.needDefaultSelect && [this.rootNode.key]) || [],
            searchMode: false
        });
    }

    insertToTreeData(treeData, parentNode, expandedKeys, deviceMode) {
        if (!treeData.length) {
            treeData.push(parentNode);
            expandedKeys.push(parentNode.key);
        } else {
            _.forEach(treeData, (data, i) => {
                if (data.id === parentNode.id) {
                    treeData.splice(i, 1, parentNode);
                    expandedKeys.push(parentNode.key);
                    return false;
                }
                if (data.children.length) {
                    let childNodes = data.children;
                    _.forEach(childNodes, (childNode, index) => {
                        if (childNode.id === parentNode.id) {
                            if (deviceMode || parentNode.hasAddress) {
                                childNodes.splice(index, 1, parentNode);
                                expandedKeys.push(parentNode.key);
                            }
                            return false;
                        }
                        if (childNode.children.length) {
                            this.insertToTreeData(childNode.children, parentNode, expandedKeys, deviceMode);
                        }
                    });
                }
            });
        }
    }

    onLoadData(treeNode, selectedKeys) {
        return new Promise(resolve => {
            if (treeNode instanceof Object) {
                if (treeNode.props.children.length) {
                    resolve();
                    return;
                }
                let currentKey = treeNode.props.dataRef.id;
                this.props.getTopoTreeData(this.props.identify, this.roles, this.props.treeMode, resolve, currentKey);
            } else if (typeof treeNode === "string") {
                if (treeNode) {
                    let pageNo = selectedKeys.currentpage;
                    let pageLimit = selectedKeys.limit / 2;
                    _.forEach(TreeFilterConfig["address"], filter => {
                        filter.value = treeNode;
                    });
                    this.underAppFilter.value = this.state.selectAppRespath;
                    this.props.searchTopoTreeAddressData(
                        this.props.identify,
                        treeNode,
                        pageNo,
                        pageLimit,
                        TreeFilterConfig["address"],
                        this.props.addressOutPutList,
                        this.state.selectAppRespath,
                        this.underAppFilter,
                        resolve
                    );
                } else {
                    this.props.getTopoTreeData(
                        this.props.identify,
                        this.roles,
                        this.props.treeMode,
                        resolve,
                        this.state.selectAppId
                    );
                }
            } else if (typeof treeNode === "boolean") {
                this.setState({
                    selectedKeys: selectedKeys
                });
                resolve();
            }
        });
    }

    onSelect = (selectedKeys, info) => {
        let dataRef = info.node.props.dataRef;
        let iotId = dataRef.id;
        if (iotId && selectedKeys.length) {
            this.onLoadData(true, selectedKeys);
            this.props.currentSelectTreeNode(this.props.identify, iotId);
            this.props.getCurrentSelectNode(dataRef);
        }
    };

    renderTooltip(item) {
        let isDevice = true;
        if (item.resourcetype === "address") {
            isDevice = false;
        }
        return (
            <div>
                <span>
                    Name:&nbsp;
                    {item.title}
                </span>
                <br />
                <span>
                    Displayname:&nbsp;
                    {item.displayname}
                </span>
                <br />
                <span>
                    ResourceType:&nbsp;
                    {item.resourcetype}
                </span>
                <br />
                {isDevice ? (
                    <span>
                        ResourcePath:&nbsp;
                        {item.resourcepath}
                    </span>
                ) : null}
            </div>
        );
    }
    renderTreeNodes = data => {
        let sysDevicetypes = this.state.sysDevicetypes;
        return data.map(item => {
            let deviceTypeId = item.deviceTypeId;
            let iconUri = null;
            if (deviceTypeId) {
                _.forEach(sysDevicetypes, deviceType => {
                    if (deviceType.deviceTypeId === deviceTypeId) {
                        let icon = deviceType.deviceTypeIcon;
                        let currentUri = formatIconPath("iconInTopology", icon || "default");
                        if (currentUri) {
                            iconUri = currentUri.uri;
                        }
                    }
                });
            }

            let nodeIcon = null;
            if (
                item.resourcetype === "root" ||
                item.resourcetype === "application" ||
                item.resourcetype === "address"
            ) {
                nodeIcon = ApplicationIcon;
            } else {
                nodeIcon = iconUri || defaultIcon.uri;
            }
            if (item.children) {
                // let titleNode = this.renderTooltip(item);

                return (
                    <TreeNode
                        title={<span>{item.title}</span>}
                        key={item.key}
                        dataRef={item}
                        isLeaf={item.isLeaf}
                        icon={<img alt="" src={nodeIcon} width="16" height="16" />}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} isLeaf={item.isLeaf} icon={<Icon type="smile-o" />} />;
        });
    };

    searchTopoTreeDataFunc(identify, searchText) {
        this.searchResult = [];
        this.searchCount = 0;
        this.searchPagination = {
            currentpage: 1,
            limit: 10,
            totalpages: 0,
            totalrecords: 0
        };
        let pagination = this.searchPagination;
        this.setState({
            searchWord: searchText
        });
        this.onLoadData(searchText, pagination);
    }

    clearRootNode() {
        this.rootNode = null;
    }

    onExpand = (expandedKeys, { expanded, node }) => {
        this.setState({ expandedKeys });
    };

    treePaginationChange = (pageNo, pageLimit) => {
        let pagination = {
            totalrecords: this.state.pagination.totalrecords,
            limit: pageLimit,
            currentpage: pageNo
        };
        this.setState({
            pageLimit: pageLimit,
            pageNo: pageNo
        });
        this.searchCount = 0;
        this.searchPagination = {
            currentpage: pageNo,
            limit: pageLimit,
            totalpages: 0,
            totalrecords: 0
        };
        this.onLoadData(this.state.searchWord, pagination);
    };

    handleLoad = (loadedKeys, event, node) => {
        console.log(event);
    };

    render() {
        const { getTopoTreeDataSuccess, searchTopoTreeDataSuccess, disableSearch } = this.props;
        const {
            expandedKeys,
            treeData,
            defaultSelectedKeys,
            selectedKeys,
            pagination,
            searchMode,
            searchText
        } = this.state;
        const refreshProgress = !getTopoTreeDataSuccess || !searchTopoTreeDataSuccess;
        return (
            <div className="topo-tree" style={{ padding: "4px 24px" }}>
                {disableSearch ? null : (
                    <SearchTopoTree
                        identify={this.props.identify}
                        searchTopoTreeDataFunc={this.searchTopoTreeDataFunc.bind(this)}
                        clearRootNode={this.clearRootNode.bind(this)}
                        searchText={searchText}
                    />
                )}
                {treeData.length ? (
                    <div className={searchMode ? "search-tree" : "normal-tree"}>
                        <Tree
                            defaultExpandedKeys={expandedKeys}
                            expandedKeys={expandedKeys}
                            onSelect={this.onSelect}
                            onExpand={this.onExpand}
                            // treeData={treeData}
                            loadData={this.onLoadData.bind(this)}
                            onLoad={this.handleLoad.bind(this)}
                            showIcon={true}
                            defaultSelectedKeys={defaultSelectedKeys}
                            selectedKeys={selectedKeys}
                        >
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree>
                    </div>
                ) : refreshProgress ? null : (
                    <div className="topo-tree-nodata" style={{ color: Theme.palette.text.primary }}>
                        No data to display.
                    </div>
                )}
                {refreshProgress ? (
                    <div className="progress-cont">
                        <CircularProgress color="secondary" />
                    </div>
                ) : null}
                {searchMode ? (
                    <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                        <TreePagination
                            pagination={pagination}
                            treePaginationChange={this.treePaginationChange.bind(this)}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

TopologyTree.propTypes = {
    identify: PropTypes.string
};

TopologyTree.defaultProps = {
    getTopoTreeDataSuccess: true,
    searchTopoTreeDataSuccess: true,
    searchMode: false,
    addressOutPutList: ["address"],
    deviceOutPutList: ["address", "physical", "devicemodel", "property", "parentdevice"],
    pageLimit: 10,
    pageNo: 1
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        topoTreeData: filterProps(state, identify, topoTreeReducerName, "topoTreeData"),
        callback: filterProps(state, identify, topoTreeReducerName, "callback"),
        searchTopoData: filterProps(state, identify, topoTreeReducerName, "searchTopoData"),
        getTopoTreeDataSuccess: filterProps(state, identify, topoTreeReducerName, "getTopoTreeDataSuccess"),
        searchTopoTreeDataSuccess: filterProps(state, identify, topoTreeReducerName, "searchTopoTreeDataSuccess"),
        searchPagination: filterProps(state, identify, topoTreeReducerName, "pagination")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopoTreeData: (identify, roles, treeMode, callback, iotId) => {
            dispatch(getTopoTreeData(identify, roles, treeMode, callback, iotId));
        },
        searchTopoTreeData: (
            identify,
            searchWord,
            pageNo,
            pageLimit,
            treeFilter,
            deviceOutPutList,
            selectAppRespath,
            underAppFilter,
            callback
        ) => {
            dispatch(
                searchTopoTreeData(
                    identify,
                    searchWord,
                    pageNo,
                    pageLimit,
                    treeFilter,
                    deviceOutPutList,
                    selectAppRespath,
                    underAppFilter,
                    callback
                )
            );
        },
        searchTopoTreeAddressData: (
            identify,
            searchWord,
            pageNo,
            pageLimit,
            treeFilter,
            addressOutPutList,
            selectAppRespath,
            underAppFilter,
            callback
        ) => {
            dispatch(
                searchTopoTreeAddressData(
                    identify,
                    searchWord,
                    pageNo,
                    pageLimit,
                    treeFilter,
                    addressOutPutList,
                    selectAppRespath,
                    underAppFilter,
                    callback
                )
            );
        },
        currentSelectTreeNode: (identify, iotId) => {
            // dispatch(currentSelectTreeNode(identify, iotId));
            dispatch(
                msg.publish("topoTreeSelect", "ISC_MSG_BUS", [{ id: iotId, key: Math.random() }], "topoTreeSelect")
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyTree);
