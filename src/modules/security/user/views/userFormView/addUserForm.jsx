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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { Upload } from "../../../common/index";
import { connect } from "react-redux";
import { REDUCER_NAME as FilterReducer, getDate } from "../../funcs/constants";
// import * as actions from "../../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import { JSONSchema } from "modules/accountmanagement/common/jsonSchema/index";
import SearchSelect from "../common/searchSelect";
import initJson from "../schema.json";
import _ from "lodash";
import { Icon, Avatar } from "@material-ui/core";
const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px",
        display: "flex",
        "&>div:first-child": {
            marginRight: theme.spacing.unit * 2
        }
    },
    "user-upload": {
        display: "inline-block",
        marginRight: "24px",
        position: "absolute",
        left: 0
    },
    "schem-container": {
        position: "relative",
        width: "100%",
        padding: "16px"
    },
    image: {
        width: "120px",
        height: "120px",
        margin: "0 auto 8px"
    },
    icon: {
        fontSize: "120px"
    },
    twoItem: {
        display: "flex",
        "&>div:first-child": {
            // marginRight: theme.spacing.unit * 2
        }
    },
    therrItem: {
        display: "flex",
        "&>div:nth-child(2)": {
            marginRight: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit * 2
        }
    },
    listStyle: {
        "& span": {
            wordBreak: "break-all",
            fontSize: "1rem!important"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
    },
    ulStyle: {
        width: "50%"
    },
    padding: {
        padding: theme.spacing.unit * 2
    },
    search: {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px"
    }
});

const property = {
    containers: {
        justify: "flex-end"
    }
};

/**
 * AddUserForm split layout form component
 * @example
 *
 *
 * @param {array} getFormData
 * @param {array} columns
 * @param {boolean} readOnly
 * @param {boolean} validate
 * @returns Component
 */

class AddUserForm extends React.Component {
    state = {
        schema: _.cloneDeep(initJson),
        groupvalue: [],
        origin: [],
        currList: [],
        loading: false,
        disabled: false
    };
    componentWillReceiveProps(nextProps) {
        const { avator = [] } = nextProps;
        if (_.isEqual(this.props.opts, nextProps.opts)) {
            this.setState({
                loading: false,
                disabled: false
            });
        }
        if (avator && avator.length) {
            this.setState({
                url: avator[1].url
            });
        }
    }
    getDatas = (values, schema, validation) => {
        this.props.getFormData(values, validation);
    };
    render() {
        const { classes, getFiles, fileList } = this.props;
        let { url, schema } = this.state;
        delete schema.active;
        const replace = (
            <div className={classes.image}>
                {url ? (
                    <Avatar alt="" src={url} className={classes.image} />
                ) : (
                    <Avatar className={classes.image}>
                        <Icon className={classes.icon}>person</Icon>
                    </Avatar>
                )}
            </div>
        );
        return (
            <div className={classes["schem-container"]}>
                <JSONSchema
                    property={property}
                    schema={schema}
                    initState={{
                        dateofexpiry: true,
                        timerange: [getDate(), getDate().replace(/(\d{4})/, (match, $1) => +$1 + 1)]
                    }}
                    getDatas={this.getDatas}
                    aop={{
                        upload: {
                            comp: "upload",
                            view: props => {
                                return (
                                    <div className={classes["user-upload"]}>
                                        <Upload
                                            type="circle"
                                            isUpload={true}
                                            replace={replace}
                                            beforeUpload={() => false}
                                            disabled={false}
                                            multiple={false}
                                            maxSize={200}
                                            getFiles={getFiles}
                                            fileList={fileList}
                                        />
                                    </div>
                                );
                            }
                        },
                        liveSearchSelect: {
                            comp: "liveSearchSelect",
                            view: props => {
                                const { _updatevalue, schema } = props;
                                return <SearchSelect {...this.props} _updatevalue={_updatevalue} name={schema.name} />;
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

AddUserForm.propTypes = {
    classes: PropTypes.object,
    getFormData: PropTypes.func.isRequired
};
AddUserForm.defaultProps = {
    placeholder: "Search Group",
    label: "Group",
    getGroupValue: () => {}
};

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};

export default connect(mapStateToProps)(withStyles(styles)(AddUserForm));
