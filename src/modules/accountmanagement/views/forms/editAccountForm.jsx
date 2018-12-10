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
import Json from "../schema.json";
import SearchSelect from "../common/SearchSelect";
import ExpansionList from "../common/expansionList";
import { AccountMap } from "modules/map";
import { Upload } from "../../common/index";
import { withStyles, Avatar, Icon } from "@material-ui/core";
import ThemeSelect from "../common/themeSelect";
// import { JSONSchema } from "../../jsonSchema/index";
import { JSONSchema } from "../../common/jsonSchema/index";
import _ from "lodash";
const styles = theme => ({
    "account-upload": {
        display: "inline-block",
        marginRight: "24px",
        position: "absolute",
        left: 0
    },
    "account-form": {
        display: "inline-block",
        width: "calc(100% - 168px)"
    },
    "account-actar-container": {
        display: "flex",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    },
    image: {
        width: "120px",
        height: "120px",
        margin: "0 auto 8px",
        borderRadius: "0px"
    },
    icon: {
        fontSize: "160px"
    },
    ajust: {
        marginTop: theme.spacing.unit * 1.5
    },
    imgstyle: {
        height: "auto"
    }
});

const property = {
    containers: {
        justify: "flex-end"
    }
};

const initJson = {
    iotgateway: "IoThub",
    othergroup: ""
};

class EditAccountForm extends React.Component {
    state = {
        fileList: [],
        formData: {},
        account: {},
        initState: {},
        basicRst: false,
        contactRst: false,
        groupRst: false
    };
    componentWillReceiveProps(nextProps) {
        const { account = {}, open, logo = [] } = nextProps;
        if (logo && logo.length) {
            const urlCreator = window.URL || window.webkitURL;
            let url = logo && logo[0] ? urlCreator.createObjectURL(logo[0]) : undefined;
            this.setState({
                url: url
            });
        }
        if (_.isEqual(account, this.props.account) || open === false) return;
        const {
            activemqendport,
            activemqhost,
            activemqstartport,
            grpcendport,
            grpcstartport,
            hazlecastendport,
            hazlecaststartport,
            tomcatendport,
            tomcatstartport,
            ...otherData
        } = account;
        let center, zoom, layer;
        try {
            center = JSON.parse(account.location || "{}").center || [];
            zoom = JSON.parse(account.location || "{}").zoom || 12;
            layer = JSON.parse(account.location || "{}").layer || "";
        } catch (error) {
            center = [];
            zoom = 12;
            layer = "";
        }
        this.setState({
            formData: Object.assign({}, otherData, { center, zoom, layer }),
            account: Object.assign({}, otherData, { center, zoom, layer })
        });
    }

    reflectFormData = (contactData, validation) => {
        let { formData } = this.state;
        let index = contactData.findIndex(data => !data.hasOwnProperty("sameasaddress"));
        contactData.forEach((item, i) => {
            if (index === i) {
                formData.primarycontact = item;
            } else {
                const { sameasaddress, ...otherItem } = item;
                formData.secondarycontact = otherItem;
            }
        });
        this.setState(
            {
                formData: formData,
                contactRst: validation
            },
            () => {
                const { formData, basicRst, contactRst } = this.state;
                this.props.reflectFormData(formData, !!(contactRst && basicRst));
            }
        );
    };
    getFiles = fileList => {
        this.setState({
            fileList
        });
        this.props.fileListFun(fileList);
    };
    getLocation = (value, name) => {
        this.setState(
            {
                formData: Object.assign({}, this.state.formData, { [name]: value })
            },
            () => {
                const { formData, basicRst, contactRst } = this.state;
                this.props.reflectFormData(formData, !!(contactRst && basicRst));
            }
        );
    };
    getDatas = (values, schema, flag) => {
        this.setState(
            {
                formData: Object.assign({}, this.state.formData, values),
                basicRst: flag
            },
            () => {
                const { formData, basicRst, contactRst } = this.state;
                this.props.reflectFormData(formData, !!(contactRst && basicRst));
            }
        );
    };
    render() {
        const { account = {}, fileList = [], url = "" } = this.state;
        const { accountGroupDatas, classes } = this.props;
        const replace = (
            <div className={classes.image}>
                {url ? (
                    <Avatar classes={{ img: classes.imgstyle }} alt="" src={url} className={classes.image} />
                ) : (
                    <Avatar className={classes.image}>
                        <Icon className={classes.icon}>image</Icon>
                    </Avatar>
                )}
            </div>
        );
        return (
            <div className="schema-container">
                <JSONSchema
                    property={property}
                    schema={Json}
                    initState={Object.assign({}, initJson, account)}
                    getDatas={this.getDatas}
                    aop={{
                        liveSearchSelect: {
                            comp: "liveSearchSelect",
                            view: props => {
                                return (
                                    <SearchSelect
                                        {...this.props}
                                        opts={accountGroupDatas}
                                        getGroupValue={group => {
                                            props._updatevalue(group, props.schema.name);
                                        }}
                                    />
                                );
                            }
                        },
                        accountmap: {
                            comp: "accountmap",
                            view: props => {
                                return (
                                    <AccountMap
                                        getData={e => {
                                            // this.getLocation(e, "center");
                                            props._updatevalue(e, "center");
                                        }}
                                        getZoom={e => {
                                            // this.getLocation(e, "zoom");
                                            props._updatevalue(e, "zoom");
                                            // this.getZoom(e);
                                        }}
                                        getLayer={e => {
                                            props._updatevalue(e, "layer");
                                        }}
                                        center={account.center || []}
                                        zoom={account.zoom || 10}
                                        layer={account.layer || ""}
                                        editOrAdd="edit"
                                    />
                                );
                            }
                        },
                        contact: {
                            comp: "contact",
                            view: props => {
                                const { schema } = props;
                                const { children } = schema;
                                return (
                                    <ExpansionList
                                        schema={children}
                                        account={account}
                                        reflectFormData={this.reflectFormData}
                                    />
                                );
                            }
                        },
                        logo: {
                            comp: "logo",
                            view: props => {
                                return (
                                    <div className={classes["account-upload"]}>
                                        <Upload
                                            type="square"
                                            isUpload={true}
                                            replace={replace}
                                            beforeUpload={() => false}
                                            disabled={false}
                                            multiple={false}
                                            maxSize={30000}
                                            getFiles={this.getFiles}
                                            fileList={fileList}
                                        />
                                    </div>
                                );
                            }
                        },
                        theme: {
                            comp: "theme",
                            view: props => {
                                return <ThemeSelect {...props} theme={account.uitheme || ""} />;
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
EditAccountForm.propTypes = {
    classes: PropTypes.object
};
EditAccountForm.defaultProps = {};
export default withStyles(styles)(EditAccountForm);
