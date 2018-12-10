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
 * Created by chenling on 30/10/2018.
 */
import React from "react";
import "../styles/container.less";
// import { columnsChanged } from "../funcs/actions";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import {theme as Theme} from "modules/theme";
import { I18n } from "react-i18nify";
const ITEM_HEIGHT = 48;
class ColumnsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            currentCheck: [],
            columnConfig: this.props.columnConfig,
            // multipleSelect: this.props.multipleSelect,
            activeColor: true,
        };
    };

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        let columnConfig = nextProps.columnConfig;
        if (!columnConfig) {
            return;
        };
        this.setState(
            Object.assign(this.state, {
                columnConfig: columnConfig
            })
        );
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = indexKey => {
        // console.log("handleChange");
        let select  = this.state.columnConfig;
        select.map(n => {
            if(n.indexKey === indexKey ){
                return  n.show = !n.show;
            } else {
                return null;
            }
        });
        // console.log(select);
        this.setState(
            Object.assign(this.state, {
                activeColor: true,
                columnConfig: select
            })
        );
        // console.log(this.state.columnConfig);
        this.props.columnsChanged(this.state.columnConfig);
    };

    handleAllClearClick(event) {
        // console.log("handleAllClearClick");
        let keyWord = event.target.getAttribute("data-key");
        // let columnConfig = this.state.columnConfig;
        // let currentCheck = [];
        if (!this.props.columnConfig) {
            return;
        }
        if (keyWord === "all") {
            let select  = this.state.columnConfig;
            select.map(n=>(n.show = true));
            // console.log(select);
            this.setState(
                Object.assign(this.state, {
                    activeColor: true,
                    columnConfig: select
                })
            );
        } else if (keyWord === "clear") {
            let select  = this.state.columnConfig;
            select.map(n=>(n.show = false));
            // console.log(select);
            this.setState(
                Object.assign(this.state, {
                    activeColor: false,
                    columnConfig: select
                })
            );
        }
        // console.log(this.state.columnConfig);
        this.props.columnsChanged(this.state.columnConfig);
    }
    columnCheck(Boolean){
        if(Boolean){
            return true;
        }else{
            return false;
        }
    }
    render() {
        const { anchorEl, columnConfig, activeColor } = this.state;
        // const {handleAllClearClick} = this.props.handleAllClearClick;
        const active = activeColor ? Theme.palette.secondary.dark : "";
        const inactive = activeColor ? "" : Theme.palette.secondary.dark;
        return (
            <div className="columns-filter" style={{ display: "inline-block" }}>
                <Tooltip title="Columns">
                    <IconButton
                        aria-label="Columns"
                        aria-owns={anchorEl ? "long-menu" : null}
                        aria-haspopup="true"
                        onClick={this.handleClick.bind(this)}
                        // style={{ height: "32px", width: "32px", margin: "0 8px" }}
                    >
                        <ViewColumnIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose.bind(this)}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                        }
                    }}
                >
                    <MenuItem key="all-clear" value="all-clear" onClick={this.handleAllClearClick.bind(this)}>
                        <ListItemText style={{ textAlign: "center" }}>
                            <span data-key="all" style={{ color: active }}>
                                Select All
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span data-key="clear" style={{ color: inactive }}>
                                Clear
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {columnConfig &&
                        columnConfig.map(column => (
                            <MenuItem key={column.indexKey} value={column.label}>
                                <Checkbox
                                    onChange={this.handleChange.bind(this, column.indexKey)}
                                    checked={this.columnCheck(column.show)}
                                />
                                <ListItemText primary={I18n.t(`sop.common.${column.label}`)} onClick={this.handleChange.bind(this, column.indexKey)}/>
                            </MenuItem>
                        ))}
                </Menu>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(ColumnsFilter);