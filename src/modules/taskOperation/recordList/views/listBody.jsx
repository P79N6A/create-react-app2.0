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
 * Created by Chen Ling on 23/10/2018.
 */
import React from "react";
// import PropTypes from "prop-types";
import "../styles/recordList.less";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
// import  { theme }  from "modules/theme";
import moment from "moment";
// import classnames from "classnames";
const styles = theme => ({
    root: {
        height: "100%",
        width: "calc(100% - 56px)"
        // marginTop: theme.spacing.unit * 3
    },
    selected: {
        backgroundColor: "rgba(0, 0, 0, 0.2) !important"
    },
    notSelected: {
        backgroundColor: "rgba(0, 0, 0, 0.04) !important"
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
    tableRow: {
        height: "57px"
    }
});
class RecordListTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // // clearAllColumns: false,
            selected: [],
            selectId: ""
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
    componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps);

    //     let selected = nextProps.selected;
    //     this.setState(
    //         Object.assign(this.state, {
    //             selected: selected
    //         })
    //     );
    }

    // isSelected (id) {
    //     this.props.isSelected(id);
    // }; 
    changeValue (indexKey, data) {
        // console.log(indexKey);
        // console.log(data);
        if(indexKey === "enddate"){
            // console.log(data.enddate);
            return moment(data.enddate).format("YYYY-MM-DD HH:mm:ss");
        }
        // else if(indexKey === "action"){
        //     if(data.l_tb_repmes === ""){
        //         return "";
        //     }else{
        //         return `Q: ${data.l_tb_repmes}; A: ${data.tb_repmes}`;
        //     }
            
        // }else if(indexKey === "assigneeName"){
        //     return `assignee: ${data.assignee}`;
        // }
        else if(indexKey === "assignee"){
            return data.assignee;
        }else if(indexKey === "name"){
            return data.name;
        }
    };
    // rowSelect=(event, data)=>{
    //     event.stopPropagation();
    //     event.nativeEvent.stopImmediatePropagation();
    //     this.props.getFileByTaskId(data);
    // }
    getFileByTaskId = (event, data)=>{
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(data.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ 
            selected: newSelected,
            selectId: data.id
        });
        this.props.getFileByTaskId(data);
    }; 
    isSelected = id => this.state.selected.indexOf(id) !== -1
    ;
    render() {
        const {datas, columnData, classes} = this.props;
        return (
            <TableBody
                className={classes.root} 
                style={{ height: "100%", overflow: "auto"}}
            >
                {datas.length > 0 && (
                    datas.map(data => {
                        const isSelected = this.isSelected(data.id);
                        return (
                            <TableRow
                                className={this.state.selectId === data.id ? classes.selected : classes.notSelected}
                                key={data.id}
                                hover
                                onClick={event => this.getFileByTaskId(event, data)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                selected={isSelected}
                            >
                                {columnData.map(item => {
                                    // return (
                                    if(item.show){
                                        
                                        return(
                                            <TableCell
                                                style={{
                                                    // minWidth: width,
                                                    maxWidth: "50px",
                                                    // width: width
                                                }}

                                                key={item.indexKey}
                                                title={data[item.indexKey]}
                                                
                                            >
                                                {this.changeValue(item.indexKey, data)
                                                }

                                            </TableCell>

                                        );
                                    }
                                    return true;
                                }
                                )}
                            </TableRow>
                        );
                    })
                )}
                {/* {emptyRows > 0 && 
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell  style={{ borderBottom: "none"}} colSpan={6} />
                    </TableRow>
                } */}
            </TableBody>
        );
    }
};

RecordListTableBody.propTypes = {
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
)(withStyles(styles)(RecordListTableBody));
