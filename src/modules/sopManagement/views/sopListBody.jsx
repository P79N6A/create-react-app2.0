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
 * Created by Chen Ling on 19/07/2018.
 */
import React from "react";
// import PropTypes from "prop-types";
import "../styles/sop.less";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
// import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/Delete";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
// import  { theme }  from "modules/theme";
import moment from "moment";
// import { openFloatTab, multipleChecked } from "../funcs/actions";
import Checkbox from "@material-ui/core/Checkbox";
import classnames from "classnames";
// import {REDUCER_NAME as sopListReducer} from "../funcs/constants";
// function getSorting(order, orderBy){
//     return order === "desc"
//         ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
//         : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
// };
const styles = theme => ({
    root: {
        height: "100%",
        width: "calc(100% - 56px)"
        // marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto",
        height: "calc(100% - 56px)",
        overflowY: "hidden"
    },
    blankTable: { textAlign: "center", height: "48px" },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    // selected: {

    //     backgroundColor: "rgba(0, 0, 0, 0.2) !important"
    // },
    // notSelected: {
    //     backgroundColor: "rgba(0, 0, 0, 0.04) !important"
    // },
    tableRow: {
        height: "57px",
        backgroundColor: "rgba(0, 0, 0, 0.2) !important"
    },
    notSelected: {
        backgroundColor: "rgba(0, 0, 0, 0.04) !important"
    },
});
class SopListTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // // clearAllColumns: false,
            selected: this.props.selected || [],
            selecteId: ""
        };
    }
    // state = {
    //     order: "asc",
    //     orderBy: "",
    //     selected: [],
    //     select: false,
    //     data: [],
    //     page: 0,
    //     rowsPerPage: 10
    // };
    // componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps);
    //     // let defaultColumns = nextProps.defaultColumns;
    //     let selected = nextProps.selected;
    //     this.setState(
    //         Object.assign(this.state, {
    //             selected: selected
    //         })
    //     );
    // }

    isSelected (id) {
        this.props.isSelected(id);
    }; 
    changeValue (indexKey, sopData) {
        // console.log(indexKey)
        // console.log(sopData)
        if(indexKey === "starttime" || indexKey === "endtime"){
            // console.log(sopData);
            return moment(sopData).format("YYYY-MM-DD HH:mm:ss");
        }else{
            return sopData;
        }
    };
    rowSelect=(event, sopData)=>{
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        this.setState({
            selecteId: sopData.processdefinitionid
        });
        this.props.openFloatTab(sopData);
    };
    editSops=(event, sopData)=>{
        // console.log("editSops");
        let ev = event || window.event;
        ev.stopPropagation();

        this.setState({
            selecteId: sopData.processdefinitionid
        });
        this.props.editSops(event, sopData);
    };
    clickRow=(event, sopData)=>{
        let ev = event || window.event;
        ev.stopPropagation();

        this.setState({
            selecteId: sopData.processdefinitionid
        });
        this.props.clickRow(event, sopData);
    };
    isSelected = id => this.props.selected.indexOf(id) !== -1;
    render() {
        const {datas, columnData, pagination, classes} = this.props;
        const width = (1 / columnData.length) * 100 + "%";
        const rowsPerPage = pagination.limit;
        // console.log("rowsPerPage" + rowsPerPage);
        const page = pagination.currentpage;
        // console.log("page:" + page);
        const emptyRows =  Math.min(rowsPerPage, datas.length > rowsPerPage ? (datas.length - page * rowsPerPage) : (page * rowsPerPage - datas.length));
        // const emptyRows =  rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);
        // console.log("emptyRows:" + emptyRows);
        const emptyDisplay = datas.length > 0 ? "data-display":"empty-display";
        // console.log(datas);
        // var num=0;
        return (
            <TableBody
                className={classnames("rule-list-body", emptyDisplay)} 
                style={{ height: "100%", overflow: "auto"}}
            >
                {datas.length > 0 && (
                    datas.map(sopData => {
                        const isSelected = this.isSelected(sopData.processdefinitionid);
                        return (
                            <TableRow
                                className={this.state.selecteId === sopData.processdefinitionid ?classes.tableRow : classes.notSelected}
                                key={sopData.processdefinitionid}
                                hover
                                onClick={event => this.rowSelect(event, sopData)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                selected={isSelected}
                            >
                                {columnData.map(item => {
                                    // return (
                                    if(item.show && item.indexKey!=="multipleSelect"){
                                        if(item.label === "Action"){
                                            return(
                                                <TableCell
                                                    style={{
                                                        minWidth: width,
                                                        maxWidth: width,
                                                        width: width
                                                    }}
                                                    key={item.indexKey}
                                                    title={sopData[item.indexKey]}
                                                        
                                                >
                                                    <Tooltip title="Edit">
                                                        <IconButton aria-label="Edit" onClick={event =>this.editSops(event, sopData)}>
                                                            <EditIcon />

                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                    
                                            );
                                        }else{
                                            return(
                                                <TableCell
                                                    style={{
                                                        // minWidth: width,
                                                        maxWidth: "50px",
                                                        // width: width
                                                    }}

                                                    key={item.indexKey}
                                                    title={sopData[item.indexKey]}
                                                    
                                                >
                                                    {this.changeValue(item.indexKey, sopData[item.indexKey])
                                                    }

                                                </TableCell>

                                            );
                                        }
                                    }else if(item.show){
                                        return(
                                            <TableCell key={sopData.processdefinitionid} padding="checkbox">
                                                <Checkbox
                                                    // onChange={handleRowCheck(sopData.processdefinitionid)}
                                                    color="secondary"
                                                    onClick={event =>this.clickRow(event, sopData.processdefinitionid)} 
                                                    checked={isSelected} />
                                            </TableCell>
                                        );
                                    }else{
                                        return null;
                                    }
                                })}
                            </TableRow>
                        );
                    })
                )}
                {emptyRows > 0 && 
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell  style={{ borderBottom: "none"}} colSpan={6} />
                    </TableRow>
                }
            </TableBody>
        );
    }
};

SopListTableBody.propTypes = {
    // datas: PropTypes.array.isRequired,
    // defaultColumns: PropTypes.array.isRequired
};
// const mapStateToProps = (state, ownProps) => {
//     // let identify = ownProps.identify;
//     if(state[sopListReducer]){
//         return {
//             columnData: state[sopListReducer] && state[sopListReducer].columnDatas
//         };
//     }else{
//         return {
//             columnData: []
//         };
//     }
// };


export default connect(
    null,
    null
)(withStyles(styles)(SopListTableBody));
