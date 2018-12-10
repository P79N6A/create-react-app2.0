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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TopoListHeader from "./topologyListHeader";
import TopologyListPagination from "./topologyListPagination";
import { prepareDefaultColumns, prepareRenderDatas } from "../funcs/renderListColumnsFunc";
import TopologyListBody from "./topologyListBody";
import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import { connect } from "react-redux";
import SelectedRowInfo from "./selectedRowInfo";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import jp from "jsonpath";

class TopologyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            defaultColumns: [],
            pagination: this.props.pagination,
            selected: [],
            multipleSelect: this.props.multipleSelect
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let arrayData = nextProps.datas;
        let columnConfig = nextProps.columnConfig;
        let selected = nextProps.selected || [];
        let multipleSelect = nextProps.multipleSelect;
        if (!arrayData || !columnConfig || !selected) {
            return;
        }
        this.prepareDataAndColumns(arrayData, columnConfig, nextProps.pagination, nextProps.sysconfigDevicetypes);
        this.setState(
            Object.assign(this.state, {
                selected: selected,
                multipleSelect: multipleSelect
            })
        );
    }

    prepareDataAndColumns(arrayData, columnConfig, pagination, sysconfigDevicetypes) {
        let defaultColumns = prepareDefaultColumns(columnConfig);
        if (sysconfigDevicetypes) {
            let sysDevictypes = sysconfigDevicetypes;
            for (let i = 0; i < arrayData.length; i++) {
                for (let j = 0; j < sysDevictypes.length; j++) {
                    let sysDevicetypeId = sysDevictypes[j]["configname"];
                    if (arrayData[i]["devicemodel.iotTopologyId"] === sysDevicetypeId) {
                        let value = JSON.parse(sysDevictypes[j]["configvals"][0]["configval"]);
                        arrayData[i]["icon"] = jp.query(value, "$..['additionalProperty'].icon")[0];
                    }
                }
            }
        }
        
        let datas = prepareRenderDatas(arrayData, defaultColumns);
        this.setState(
            Object.assign(this.state, {
                datas: datas,
                defaultColumns: defaultColumns,
                pagination: pagination
            })
        );
    }

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(
                Object.assign(this.state, {
                    selected: this.state.datas.map(data => data.key)
                })
            );
            return;
        }
        this.setState(
            Object.assign(this.state, {
                selected: []
            })
        );
    };

    render() {
        const { datas, defaultColumns, pagination, selected, multipleSelect } = this.state;
        const { refreshTopologySuccess } = this.props;
        return (
            <div className="topology-list">
                <div className="topology-list-wrap">
                    {selected.length > 0 && multipleSelect ? <SelectedRowInfo selected={selected} /> : null}
                    <Table className="topology-list-table">
                        {defaultColumns ? (
                            <TopoListHeader
                                identify={this.props.identify}
                                defaultColumns={defaultColumns}
                                onSelectAllClick={this.handleSelectAllClick.bind(this)}
                                numSelected={selected.length}
                                rowCount={datas.length}
                                multipleSelect={multipleSelect}
                            />
                        ) : null}
                        {datas && defaultColumns.length ? (
                            <TopologyListBody
                                identify={this.props.identify}
                                datas={datas}
                                defaultColumns={defaultColumns}
                                checked={selected}
                                multipleSelect={multipleSelect}
                                pagination={pagination}
                            />
                        ) : (
                            <div className="progress-cont">
                                <Typography variant="caption" gutterBottom align="center" className="no-data">
                                    No Columns Selected.
                                </Typography>
                            </div>
                        )}
                    </Table>
                    {!refreshTopologySuccess ? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : datas && datas.length > 0 ? null : (
                        <div className="progress-cont">
                            <Typography variant="caption" gutterBottom align="center" className="no-data">
                                No data to display.
                            </Typography>
                        </div>
                    )}
                </div>
                {pagination ? (
                    <TopologyListPagination
                        identify={this.props.identify}
                        pagination={pagination}
                        searchTopoFunc={this.props.searchTopoFunc}
                    />
                ) : null}
            </div>
        );
    }
}

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        selected: filterProps(state, identify, topoReducerName, "multipleSelected"),
        multipleSelect: filterProps(state, identify, topoReducerName, "multipleSelect"),
        refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess"),
        sysconfigDevicetypes: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypes")
    };
};

TopologyList.propTypes = {
    datas: PropTypes.array,
    pagination: PropTypes.object
};

export default connect(
    mapStateToProps,
    null
)(TopologyList);
