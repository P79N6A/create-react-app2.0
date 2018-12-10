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
import ViewContact from "../common/viewContact";
import { Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MapApplication } from "modules/map";
// import { JSONSchema } from "../../jsonSchema/index";
import { JSONSchema } from "../../common/jsonSchema/index";
import Json from "../schema.json";
import _ from "lodash";
const styles = theme => ({
    "map-container": {
        height: 300
    },
    logo: {
        // width: "100%",
        height: "140px",
        textAlign: "center",
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
        position: "absolute",
        lineHeight: "100px",
        overflow: "hidden",
        width: "200px",
        left: 0,
        "& img": {
            width: "100%"
            // height: "100%"
        },
        "& span": {
            fontSize: "130px",
            width: "100%",
            textAlign: "center"
        }
    },
    listStyle: {
        "& span": {
            wordBreak: "break-all",
            fontSize: "1rem!important",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
    },
    viewmap: {
        height: 300
    },
    "view-container": {
        position: "relative"
    }
});

const property = {
    containers: {
        justify: "flex-end"
    }
};

class ViewAccountForm extends React.Component {
    state = { formData: {}, formField: [], schema: Json };
    render() {
        const { classes, logo = [], account = {} } = this.props;
        // const { formData } = this.state;
        const urlCreator = window.URL || window.webkitURL;
        let url = logo && logo[0] ? urlCreator.createObjectURL(logo[0]) : undefined;
        let location;
        try {
            location = JSON.parse(account.location || "{}");
        } catch (error) {
            location = {};
        }
        let formData = Object.assign({}, account, {
            center: location.center,
            zoom: location.zoom,
            layer: location.layer || "",
            dateofexpiry: (account.dateofexpiry || "").replace(/\//g, "-"),
            status: account.status ? "Acitve" : "Inactive"
        });
        return (
            <div className={classes["view-container"]}>
                <JSONSchema
                    property={property}
                    schema={Json}
                    initState={formData}
                    mode="view"
                    aop={{
                        accountmap: {
                            comp: "accountmap",
                            view: props => {
                                return (
                                    <div className={classes.viewmap}>
                                        <MapApplication
                                            _layer={formData.layer}
                                            zoom={formData.zoom}
                                            center={formData.center || null}
                                            dataSource={[
                                                {
                                                    center: formData.center || [],
                                                    id: `a_${new Date().getTime()}`
                                                }
                                            ]}
                                            needToolbar={false}
                                        />
                                    </div>
                                );
                            }
                        },
                        contact: {
                            comp: "contact",
                            view: props => {
                                const { schema } = props;
                                const { children } = schema;
                                return <ViewContact schema={children} account={formData} />;
                            }
                        },
                        logo: {
                            comp: "logo",
                            view: props => {
                                return (
                                    <div className={classes.logo}>
                                        {url ? <img alt="" src={url} /> : <Icon>image</Icon>}
                                    </div>
                                );
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
ViewAccountForm.propTypes = {
    classes: PropTypes.object
};
ViewAccountForm.defaultProps = {};
export default withStyles(styles)(ViewAccountForm);
