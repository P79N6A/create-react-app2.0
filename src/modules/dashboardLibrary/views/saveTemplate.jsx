/*
* =========================================================================
*  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
/**
 * @save the library template
 * @module SaveTemplate
 * @author LUOJIA
 * @exports {
 *  SaveTemplate
 * }
 */
import React from "react";
import Dialog from "./dialog";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import {} from "../funcs/actions";
import { I18n } from "react-i18nify";
// import { REDUCER_NAME as topoReducer } from "../funcs/constants";

const styles = theme => ({
    editItemL: {
        width: "100%",
        marginBottom: "20px"
    },
    root: {
        padding: "20px"
    }
});

class SaveTemplate extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        title: I18n.t("modal.modal.saveTemplate.title"),
        subTitle: I18n.t("modal.modal.saveTemplate.subTitle"),
        open: false,
        desc: "",
        name: ""
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }

    cancle = () => {};

    submit = () => {};

    render() {
        const { classes } = this.props;
        const { title, subTitle, open } = this.state;
        return (
            <Dialog title={title} cancle={this.cancle} submit={this.submit} open={open} subTitle={subTitle}>
                <Typography className={classes.root}>
                    <TextField
                        label={I18n.t("modal.saveTemplate.label")}
                        name="name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <TextField
                        label={I18n.t("modal.saveTemplate.desc")}
                        name="desc"
                        margin="dense"
                        multiline
                        rows={4}
                        rowsMax={6}
                        value={this.state.desc}
                        onChange={this.handleChange}
                    />
                </Typography>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaveTemplate));
