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
import { prepareDefaultColumns, prepareRenderDatasForLayer } from "../funcs/renderListColumnsFunc";
import TopologyListBody from "./topologyListBody";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import { connect } from "react-redux";
import SelectedRowInfo from "./selectedRowInfo";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import { multipleChecked } from "../funcs/actions";

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

class TopologyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            defaultColumns: [],
            pagination: this.props.pagination,
            selected: [],
            checkAll: { [this.props.pagination.currentpage - 1]: false },
            multipleSelect: this.props.multipleSelect
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {refreshTopologySuccess,columnConfig,multipleSelect} = nextProps;
        let arrayData = nextProps.datas;
        // let columnConfig = nextProps.columnConfig;
        let selected = nextProps.selected || [];
        // const selectedData = nextProps.selectedData;
        const checkType = "tableColumnsConfig";
        if(!_.isEqual(refreshTopologySuccess,this.props.refreshTopologySuccess)&&!refreshTopologySuccess){
            this.handleSelectAllClick(null,false);
        }
        // const checkType = selectedData&&selectedData.recordtype==="application"?"addTableColumnsConfig":"appTableColumnsConfig";
        if (!arrayData || !columnConfig || !selected) {
            return;
        }

        this.prepareDataAndColumns(checkType, arrayData, columnConfig, nextProps.pagination);
        this.setState(
            Object.assign(this.state, {
                selected: selected,
                multipleSelect: multipleSelect
            })
        );
    }

    prepareDataAndColumns(checkType, arrayData, columnConfig, pagination) {
        let defaultColumns = prepareDefaultColumns(columnConfig, checkType);
        let datas = prepareRenderDatasForLayer(arrayData, defaultColumns);

        this.setState(
            Object.assign(this.state, {
                datas: datas,
                defaultColumns: defaultColumns,
                pagination: pagination
            })
        );
    }

    renderNewSelectedRows(currentSelected, newSelected) {
        let result = [];
        let multipleItems = [];

        _.forEach(currentSelected, outer => {
            let findInSelected = false;
            _.forEach(newSelected, inner => {
                if (outer === inner) {
                    findInSelected = true;
                }
            });
            if (!findInSelected) {
                result.push(outer);
            } else {
                let findInMultiple = false;
                _.forEach(multipleItems, multiple => {
                    if (multiple === outer) {
                        findInMultiple = true;
                    }
                });
                if (!findInMultiple) {
                    multipleItems.push(outer);
                }
            }
        });

        return { result, multipleItems };
    }

    unCheckedRows(flag) {
        this.setState(
            Object.assign(this.state, {
                checkAll: Object.assign(this.state.checkAll, {
                    [this.state.pagination.currentpage - 1]: flag
                })
            })
        );
    }

    handleSelectAllClick = (event, checked) => {
        let currentSelected = this.state.selected;
        const dataWithoutDvc = _.filter(this.state.datas, data => !(data.key.split("_")[1] === "device"));
        const newSelected = _.map(dataWithoutDvc, item => item.key);
        // let newSelected = this.state.datas.map(data => data.key);
        let { result, multipleItems } = this.renderNewSelectedRows(currentSelected.concat(newSelected), newSelected);
        let totalSelected = [];

        if (checked) {
            totalSelected = result.concat(multipleItems);
        } else {
            totalSelected = result;
        }

        this.setState(
            Object.assign(this.state, {
                selected: totalSelected,
                checkAll: Object.assign(this.state.checkAll, {
                    [this.state.pagination.currentpage - 1]: checked
                })
            })
        );
        this.props.multipleChecked(this.props.identify, totalSelected);
    };

    render() {
        const { datas, defaultColumns, pagination, selected, multipleSelect, checkAll } = this.state;
        const { refreshTopologySuccess } = this.props;
        return (
            <div className="topology-list">
                <div className="topology-list-wrap">
                    {selected.length > 0 && multipleSelect ? (
                        <SelectedRowInfo identify={this.props.identify} selected={selected} />
                    ) : null}
                    <Table className="topology-list-table">
                        {defaultColumns ? (
                            <TopoListHeader
                                identify={this.props.identify}
                                defaultColumns={defaultColumns}
                                onSelectAllClick={this.handleSelectAllClick.bind(this)}
                                numSelected={selected.length}
                                rowCount={datas.length}
                                checkAll={checkAll}
                                pagination={pagination}
                                multipleSelect={multipleSelect}
                            />
                        ) : null}
                        {datas && defaultColumns ? (
                            <TopologyListBody
                                identify={this.props.identify}
                                datas={datas}
                                defaultColumns={defaultColumns}
                                checked={selected}
                                multipleSelect={multipleSelect}
                                pagination={pagination}
                                unCheckedRows={this.unCheckedRows.bind(this)}
                            />
                        ) : null}
                    </Table>
                    {!refreshTopologySuccess ? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : datas && datas.length > 0 ? (
                        defaultColumns && defaultColumns.length > 0 ? null : (
                            <Placeholder content="No Columns Selected." />
                        )
                    ) : (
                        <Placeholder content="No data to display." />
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
        // multipleSelect: filterProps(state, identify, topoReducerName, "multipleSelect"),
        refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        multipleChecked: (identify, multipleSelected) => {
            dispatch(multipleChecked(identify, multipleSelected));
        }
    };
};

TopologyList.propTypes = {
    datas: PropTypes.array,
    pagination: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyList);
