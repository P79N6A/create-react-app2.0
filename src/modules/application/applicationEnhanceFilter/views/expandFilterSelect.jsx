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
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Input, InputLabel, Select } from "modules/common";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { CreatedPredicate } from "../funcs/createPredicate";
import { predicateChanged, filtersValueChanged } from "../funcs/actions";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: "100%"
    }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            maxWidth: 250
        }
    }
};

class ExpandFilterSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            currentSelect: this.props.filter.defaultValue || []
        };
    }
    componentWillMount() {
        if (this.props.filter.filterConfigType !== "DeviceType" || !this.props.topoTypeDatas) {
            return;
        }
        let filter = this.state.filter;
        let topoTypeDatas = this.props.topoTypeDatas;
        let topoTypes = [];
        for (let i = 0; i < topoTypeDatas.length; i++) {
            topoTypes.push(topoTypeDatas[i]["devicetype.displayName"]);
        }
        filter.values = topoTypes;
        this.setState({
            filter: filter
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter.filterConfigType === "DeviceType" && nextProps.topoTypeDatas) {
            let filter = this.state.filter;
            let topoTypeDatas = nextProps.topoTypeDatas;
            let topoTypes = [];
            for (let i = 0; i < topoTypeDatas.length; i++) {
                topoTypes.push(topoTypeDatas[i]["devicetype.displayName"]);
            }
            filter.values = topoTypes;
            this.setState({
                filter: filter
            });
        }
    }

    handleChange(event) {
        this.setState({ currentSelect: event.target.value });
        let { predicate, filterArr } = CreatedPredicate(
            event.target.value,
            this.state.filter.filterConfigType,
            this.props.filterArr
        );
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
        let filterConfig = this.props.filterConfig;
        for (let i = 0; i < filterConfig.length; i++) {
            if (filterConfig[i].filterName === this.state.filter.filterConfigType) {
                filterConfig[i].defaultValue = event.target.value;
            }
        }
        this.props.filtersValueChanged(this.props.identify, filterConfig);
    }

    handleCheckboxCheck(checked) {
        return this.state.currentSelect.indexOf(checked) > -1;
    }

    render() {
        let filter = this.props.filter;
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">{filter.filterConfigType}</InputLabel>
                <Select
                    multiple
                    value={this.state.currentSelect}
                    onChange={this.handleChange.bind(this)}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {filter.values &&
                        filter.values.map(item => (
                            <MenuItem key={item} value={item}>
                                <Checkbox
                                    checked={this.state.currentSelect && this.state.currentSelect.indexOf(item) > -1}
                                />
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        },
        filtersValueChanged: (identify, filterConfig) => {
            dispatch(filtersValueChanged(identify, filterConfig));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ExpandFilterSelect));
