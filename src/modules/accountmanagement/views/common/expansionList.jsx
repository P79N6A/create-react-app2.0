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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import Expansion from "./expansion";
import ListHead from "../common/listHead";
// import { validation } from "../../jsonSchema/index";
import { validation } from "../../common/jsonSchema/index";
import _ from "lodash";
// import ExpansionStatic from "./expansionStatic";
// import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    "contact-list-delete": {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    "contact-list-margin": {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px"
    }
});
const initJson = {
    salutation: "",
    name: "",
    jobtitle: "",
    address: "",
    countrycode: "",
    sameasaddress: false,
    email: ""
};
class ExpansionList extends React.Component {
    state = {
        columns: [{ ids: Math.random(), schema: _.cloneDeep(this.props.schema), initState: _.cloneDeep(initJson) }],
        originCloumn: [],
        checked: [],
        sameasPrimary: false
    };
    componentWillReceiveProps(nextProps) {
        const { account = {} } = nextProps;
        const { primarycontact, secondarycontact } = account;
        if (_.isEqual(account, this.props.account) || !account.id) return;
        let cloumnArr = [this.setContactValue(primarycontact, true)];
        if (secondarycontact && secondarycontact.name) {
            cloumnArr.push(this.setContactValue(secondarycontact));
        }
        this.setState({
            columns: cloumnArr
        });
    }
    setContactValue = (contact, flag) => {
        return {
            schema: _.cloneDeep(this.props.schema),
            ids: Math.random(Date.now()),
            initState: contact
        };
    };
    checkedHandle = sameasPrimary => {
        const { columns } = this.state;
        if (sameasPrimary) {
            let parimaryAddress = Object.assign.apply({}, columns[0].form.map(n => ({ [n.name]: n.value }))).address;
            let rootColumns = columns.map((column, i) => {
                column.form.map(m => {
                    if (m.name === "address" && i !== 0) {
                        m.value = parimaryAddress;
                    }
                    return m;
                });
                return column;
            });
            this.setState({
                columns: rootColumns
            });
        }
        this.setState({
            sameasPrimary
        });
    };
    addItemHandle = e => {
        const { columns } = this.state;
        if (columns.length >= 2) return;
        this.setState({
            columns: columns.concat({
                ids: Math.random(),
                schema: _.cloneDeep(this.props.schema),
                initState: Object.assign({}, initJson, {
                    sameasaddress: false
                })
            })
        });
    };
    checkHandle = (ids, check) => {
        const { checked } = this.state;
        this.setState({
            checked: !check ? checked.filter(n => n !== ids) : checked.concat(ids)
        });
    };
    deleteContactList = e => {
        const { checked, columns } = this.state;
        let rootColumn = columns.filter(n => !checked.includes(n.ids));
        this.setState({
            columns: rootColumn,
            checked: []
        });
        this.setState({
            columns: rootColumn
        });
        let reflectDatas = rootColumn.map(column => column.initState);
        let flag = this.getValidationRst(rootColumn);
        this.props.reflectFormData(reflectDatas, flag);
    };
    removeItem = ids => {
        const { columns } = this.state;
        let filterColumns = columns.filter(n => n.ids !== ids);
        this.setState({
            columns: filterColumns
        });
        let reflectDatas = filterColumns.map(column => column.initState);
        let flag = this.getValidationRst(filterColumns);
        this.props.reflectFormData(reflectDatas, flag);
    };
    setPrimaryHandle = ids => {
        const { columns } = this.state;
        let rootColumns = columns.map(column => {
            if (column.ids === ids) {
                delete column.schema.sameasaddress;
                delete column.initState.sameasaddress;
            } else {
                column.initState.sameasaddress = false;
                column.schema = _.cloneDeep(this.props.schema);
            }
            return column;
        });
        let reflectDatas = rootColumns.map(column => column.initState);
        this.setState({
            columns: rootColumns
        });
        let flag = this.getValidationRst(rootColumns);
        this.props.reflectFormData(reflectDatas, flag);
    };
    getFormData = (ids, values) => {
        const { columns, sameasPrimary } = this.state;
        let flagAddress = sameasPrimary || false;
        let primaryIndex = null;
        let rootColumns = columns.map((column, i) => {
            if (column.ids === ids) {
                column.initState = values;
            }
            if (column.initState.hasOwnProperty("sameasaddress")) {
                if (column.initState["sameasaddress"] === true) {
                    flagAddress = true;
                }
            } else {
                primaryIndex = i;
            }
            return column;
        });
        if (flagAddress && typeof primaryIndex === "number") {
            let parimaryAddress = columns[primaryIndex].initState.address;
            rootColumns = rootColumns.map((column, i) => {
                if (column.initState.hasOwnProperty("address") && i !== primaryIndex) {
                    column.initState = Object.assign({}, column.initState, { address: parimaryAddress });
                }
                return column;
            });
        }
        let reflectDatas = rootColumns.map(column => column.initState);
        this.setState({
            columns: rootColumns
        });
        let flag = this.getValidationRst(rootColumns);
        this.props.reflectFormData(reflectDatas, flag);
    };
    getValidationRst = columns => {
        let flag = true;
        columns.forEach(column => {
            if (!validation(column.initState, column.schema)) {
                flag = false;
            }
        });
        return flag;
    };
    render() {
        let { columns = [], checked = [] } = this.state;
        const { classes } = this.props;
        if (columns.length === 1) {
            columns = columns.map(n => {
                delete n.schema.sameasaddress;
                delete n.initState.sameasaddress;
                return n;
            });
        }
        return (
            <div className={classes["contact-list-margin"]}>
                <ListHead formtitle icon="add" title="Contact Information *" clickListItemHandle={this.addItemHandle} />
                {/* <ExpansionStatic checkedHandle={this.checkedHandle} clickListItemHandle={this.clickListItemHandle} /> */}
                {checked.length ? (
                    <ListHead
                        icon="delete"
                        className={classes["contact-list-delete"]}
                        clickListItemHandle={this.deleteContactList}
                    />
                ) : null}
                {columns.map((column, i) => {
                    return (
                        <Expansion
                            key={column.ids}
                            columns={column.schema}
                            primarykey={i === 0 ? column.ids : null}
                            checked={checked}
                            removeItem={this.removeItem}
                            titleKey="name"
                            initState={column.initState}
                            ids={column.ids}
                            setPrimaryHandle={this.setPrimaryHandle}
                            getFormData={this.getFormData}
                            checkHandle={this.checkHandle}
                        />
                    );
                })}
            </div>
        );
    }
}
ExpansionList.defaultProps = {};
ExpansionList.propTypes = {
    classes: PropTypes.object,
    reflectFormData: PropTypes.func
};
export default withStyles(styles)(ExpansionList);
