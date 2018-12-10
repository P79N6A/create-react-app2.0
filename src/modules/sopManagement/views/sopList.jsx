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
 * Created by chenling on 02/08/2018.
 */
import React, { Component }from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "../styles/sop.less";
import Table from "@material-ui/core/Table";
// import {theme as Theme} from "modules/theme";
// import Paper from "@material-ui/core/Paper";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
// import TableRow from "@material-ui/core/TableRow";
import SopListHead from "./sopListHead";
import SopListBody from "./sopListBody";
// import SopListTablePagination from "./sopListTablePagination";
import {TablePagination as SopListTablePagination} from "modules/common";
import DeleteDialog from "./deleteDialog";
import {paginationChange, deletSop} from "../funcs/actions";
// import {REDUCER_NAME as sopListReducer} from "../funcs/constants";
import "../styles/sop.less";
import {connect} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// import { lighten } from "@material-ui/core/styles/colorManipulator";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { isNull } from "util";
const toolbarStyles = Theme => ({
    root: {
        paddingRight: Theme.spacing.unit,
    },
    highlight: {
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.secondary.dark
    },
       
    spacer: {
        flex: "1 1 100%",
    },
    actions: {
        color: Theme.palette.text.secondary,
    },
    title: {
        flex: "0 0 auto",
        // backgroundColor: "#b8c1cd",
    },

});
  
let EnhancedTableToolbar = props => {
    const { numSelected, classes, deletSops } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? 
                    <Typography color="inherit" variant="subtitle1" gutterBottom>
                        {numSelected} selected
                    </Typography> : 
                    null
                }
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete"  onClick={deletSops} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>) : null
                }
            </div>
        </Toolbar>
    );
};
  
EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
const styles = theme => ({ 
    root: { 
        ...theme.mixins.gutters(),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    tableWrapper: {
        width: "100%",
        heigth: "calc(100% - 60px)",
        overflowX: "auto",
        overflowY: "auto",
    },
    // sopListHead: {
    //     width: "100%",
    //     "table-layout": "fixed",
    //     overflow: "auto",
    //     // position: "fixed",
    //     background: theme.palette.background.paper 
    // }
});
class SopList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            datas: this.props.datas || [],
            // columnData: this.props.columnData || [],
            selected: this.props.selected ||[],
            // order: "asc",
            // orderBy: "calories",
            loading: this.props.refresh,
            pagination: this.props.pagination,
            open: false
        };
        this.searchTopoFunc = this.searchTopoFunc.bind(this);
    };
    // componentDidMount(){
    //     this.setState(
    //         Object.assign(this.state, {
    //             loading: false,
    //         })
    //     );
    // };
    componentDidUpdate(){
        // console.log("componentDidUpdate");
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        let arrayData = nextProps.datas;
        let pagination = nextProps.pagination;
        let selected = nextProps.seleted;
        let refresh = nextProps.refresh;
        // let multipleSelect = nextProps.multipleSelect;
        // let columnData = nextProps.columnData;
        // if (!arrayData) {
        //     return;
        // };
        this.setState(
            Object.assign(this.state, {
                datas: arrayData,
                pagination: pagination,
                selected: selected || [],
                loading: refresh,
                // multipleSelect: multipleSelect,
                // columnData: columnData
            })
        );
    };
    searchTopoFunc = (currentpage, limit)=>{
        // let keyWord = this.props.keyWord;
        // console.log(limit)
        if(this.state.loading){
            return;
        }
        this.setState({
            loading: true,
            selected: []
        });
        // let identify = this.props.identify;
        // let pagination = this.state.pagination || {};
        // let keyWord = this.props.keyWord || "";
        let {identify, keyWord, sortorders, sortLists, orderDirection,  orderDisplayName, orderBy} = this.props;
        let pagination = {
            currentpage: currentpage,
            limit: limit
        };
        let postData = {
            keyWord: keyWord,
            pagination,
            sortorders,
            sortLists,
            orderDirection,
            orderDisplayName,
            orderBy
        };
        this.props.paginationChange(identify, postData);
    };
    handleChangePage = (event, pagination) => {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        // console.log("handleChangePage");
        this.searchTopoFunc(pagination + 1, this.props.pagination.limit);
    };
    handleChangeRowsPerPage = event => {
        // this.setState({ rowsPerPage: event.target.value, page: 0 }, () => {
        //     this.handleSearchCriteria();
        // });
        let currentpage = this.props.pagination.currentpage;
        this.searchTopoFunc(currentpage, event.target.value);
    };
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(
                Object.assign(this.state, {
                    selected: this.state.datas.map(data => data.processdefinitionid)
                })
            );
            // console.log(this.state);
            return;
        }
        this.setState(
            Object.assign(this.state, {
                selected: []
            })
        );
        // console.log(this.state);
    };
    deletSops=()=>{
        // console.log("deletSops");
        this.setState({
            open: true,
        });
    };
    deletSopsTrue=()=>{
        let open = this.state.open;
        if(open){
            this.setState({
                loading: true,
                open: false
            });
            let identify = this.props.identify;
            let pagination = this.state.pagination || {};
            let keyWord = this.props.keyWord || "";
            let {sortorders, sortLists, orderDirection,  orderDisplayName, orderBy} = this.props;
            let sops= this.state.selected;
            // console.log(sops);
            if(sops.length > 0){
                sops.map(item=>{
                    let postData = {
                        pagination,
                        keyWord,
                        sops: item,
                        sortorders,
                        sortLists,
                        orderDirection,
                        orderDisplayName,
                        orderBy
                    };
                    // console.log(postData);
                    this.props.deletSop(identify, postData); 
                    return null;
                });
            }
        }
    }
    clickRow = (event, id) => {
        // console.log(id);
        event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        const { selected } = this.state;
        // console.log(selected);
        const selectedIndex = selected.indexOf(id);
        // console.log(selectedIndex);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            // console.log(newSelected);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            // console.log(newSelected);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        };
        this.setState({ selected: newSelected });
        
    };
    checkBoxShow=()=>{
        let columnData = this.props.columnData;
        let newColumnData = [];
        if(columnData === []) return;
        columnData.map(n=>{
            if(n.show){
                newColumnData.push(n.indexKey);
                return true;
            }else{
                return true;
            }
        });
        // console.log(newColumnData);
        if(newColumnData.length === 0){
            return false;
        }else{
            return true;
        }
    };
    dialogControl=(value)=>{
        this.setState({
            open: value
        },()=>{
            this.deletSopsTrue();
        }
        );
    }
    // multipleChecked=(data)=>{
    //     // if(data){
    //     console.log(data);
    //     this.setState({ selected: data });
    //     // }
    // };
    render(){
        // console.log(this.props);
        const { pagination, rowsPerPageOptions, editSops, columnData,orderDirection, orderDisplayName, orderBy, openFloatTab, identify} = this.props;
        const { selected, datas, loading} = this.state;
        // console.log(columnData);
        const checkBoxShow = this.checkBoxShow();
        return (
            <div className="sop-list">
                {/* { selected.length > 0 &&
                    <EnhancedTableToolbar 
                        numSelected={selected ? selected.length : 0} 
                        deletSops={this.deletSops}
                    />
                } */}
                <div className="sopList">
                    { selected.length > 0 &&
                        <EnhancedTableToolbar 
                            numSelected={selected ? selected.length : 0} 
                            deletSops={this.deletSops}
                        />
                    }
                    {checkBoxShow && 
                        <Table className="sop-list-table">
                        
                            <SopListHead 
                                onSelectAllClick = {this.handleSelectAllClick}
                                columnData = {columnData}
                                numSelected={selected ? selected.length : 0}
                                rowCount={datas ? datas.length : 0}
                                orderBy={orderBy}
                                orderDirection={orderDirection}
                                orderDisplayName={orderDisplayName}
                                selected={selected}
                                onRequestSort={this.props.onRequestSort}
                            />

                            <SopListBody 
                                datas = {datas}
                                pagination = {pagination}
                                columnData = {columnData}
                                clickRow={this.clickRow}
                                deletSops={this.deletSops}
                                editSops={editSops}
                                selected={selected}
                                openFloatTab={openFloatTab}
                                // multipleChecked={this.multipleChecked}
                            />

                        </Table>
                    }

                    {loading ? 
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                        : datas && datas.length > 0 ? null : 
                            <Typography variant="body1" gutterBottom align="center" className="no-data">
                                No data to display.
                            </Typography>
                    
                    }
                </div>
                {
                    pagination === undefined ? null
                        :
                        <div className="table-Pagination">
                            <SopListTablePagination
                                
                                // pagination={pagination}
                                // rowsPerPageOptions = {rowsPerPageOptions}
                                // searchTopoFunc={this.searchTopoFunc}
                                component="div"
                                count={pagination.totalrecords}
                                rowsPerPage={pagination.limit}
                                page={pagination.currentpage - 1}
                                rowsPerPageOptions={rowsPerPageOptions}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />  
                        </div>
                     
                }
                <DeleteDialog 
                    open = {this.state.open}
                    onClick = {this.dialogControl}
                    identify = {identify}
                />
            </div>
        );
    }
};

SopList.propTypes = {
    tasks: PropTypes.array,
    onCheckTask: PropTypes.func
};
const mapDispatchToProps = (dispatch) => {
    return {
        paginationChange: (identify, postData) => {
            dispatch(paginationChange(identify, postData));
        },
        deletSop: (identify, data) => {
            dispatch(deletSop(identify, data));
        },
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SopList));
