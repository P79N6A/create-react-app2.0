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
 * Created by HuLin on 03/08/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { REDUCER_NAME as dataSearch } from "../funcs/constants";
import { requestName, selectVal } from "../funcs/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { I18n } from "react-i18nify";
import Checkbox from "@material-ui/core/Checkbox";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const sitename = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    Collapse: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
    },
    color: {
        color: theme.palette.text.primary,
    },
    nested: {
        color: theme.palette.text.primary,
        paddingLeft: theme.spacing.unit * 4,
    },
    size: {
        width: 40,
        height: 40,
    }
});


function funcSetState (_this, open, subConfigName, checkAll, selected) {
    return _this.setState(
        Object.assign(_this.state, {
            open: open,
            subConfigName: subConfigName,
            checkAll: checkAll,
            selected: selected
        })
    );
}


class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkAll: false,
            selected: [],
            open: false,
            subConfigName: []
        };
    }
  
    handleChange = name => event => {
        const { configvalnames } = this.props;
        let _this = this;

        if(name === "checkAll" && event.target.checked) {
            let obj = [];
            for(var i=0;i<configvalnames.length;i++) {
                obj.push(configvalnames[i].configname);
            } 
            funcSetState(_this, true, obj, true, obj);
        }else if(name === "checkAll" && event.target.checked === false) {
            funcSetState(_this, true, [], false, []);
        }else if(name !== "checkAll" && event.target.checked){ 
            let arr = this.state.subConfigName;
            arr.push(event.target.value);
            if (arr.length === configvalnames.length) {
                funcSetState(_this, true, arr, true, arr);
            } else {
                funcSetState(_this, true, arr, false, arr);
            }         
        }else if(name !== "checkAll" && event.target.checked === false) {
            let arr = this.state.subConfigName;
            arr = this.state.subConfigName.filter(v => v !== event.target.value);
            funcSetState(_this, true, arr, false, arr);
        }

        this.props.onselectVal(this.state.subConfigName);
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    componentWillMount () {    

        let obj = {
            sitename: sitename
        };

        this.props.onrequestName(obj);
    }

    render() {
        const { classes, configvalnames } = this.props;
        return (
            <div className={ classes.root }>
                <List
                    component="nav"
                    style= {{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <ListItem button onClick={this.handleClick}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkAll}
                                    onChange={this.handleChange("checkAll")}
                                    className={classes.color}
                                />
                            }
                        />
                        <ListItemText style={{ textAlign: "center" }}>
                            <span data-key="all" style={{ color: classes.color, whiteSpace: "nowrap"}}>
                                {I18n.t("dataExport.deviceTypes")}
                            </span>
                        </ListItemText>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <div className="data-collapse-wrap">
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit  collapsedHeight="100%">
                            { configvalnames.length === 0 ?
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText style={{ textAlign: "center" }}>
                                            <span data-key="all" style={{ color: classes.color }}>
                                                {I18n.t("dataExport.noData")}  
                                            </span>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                :
                                configvalnames &&
                                configvalnames.map((items, index) =>{
                                    return (
                                        items &&
                                        items.configvals.map((item, index) =>{
                                            return (
                                                <List component="div" disablePadding key={index}>
                                                    <ListItem button className={classes.nested}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={ this.state.selected.includes(items.configname) ? true:false }
                                                                    onChange={this.handleChange(item.configvalname)}
                                                                    value={ items.configname }
                                                                    className={classes.color}
                                                                />
                                                            }
                                                        />
                                                        <ListItemText style={{ textAlign: "center" }}>
                                                            <span data-key="all" style={{ color: classes.color }}>
                                                                { item.configvalname }
                                                            </span>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            );
                                        })
                                    );
                                })  
                            }
                        </Collapse>
                    </div>
                </List>
            </div>
        );
    }
}

Dropdown.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    if(state[dataSearch] && state[dataSearch].configvalname){
        return {
            configvalnames: state[dataSearch].configvalname || []
        };
    }else{
        return {
            configvalnames: []
        };
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onrequestName: (obj) => {
            dispatch(requestName(obj));
        },
        onselectVal: (obj) => {
            dispatch(selectVal(obj));
        }  
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dropdown));

