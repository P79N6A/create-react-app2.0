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
 * Created by Chen Ling on 24/10/2018.
 */
import React, { Component } from "react";
// impo rt PropTypes from "prop-types";
import "../styles/recordList.less";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
class BasicInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identify: this.props.identify,
            // recordList: this.props.recordList,
            // isLoading: true,
            // tabValue: 1,
            // tabNames: {
            //     0: I18n.t("workflow.recordList.recordInfoName"),
            //     1: I18n.t("workflow.attachments.name")
            // }
        };
    }
    componentWillReceiveProps(nextProps) {
        
        // if(nextProps.recordList !== this.props.recordList ){
        //     this.setState({
        //         recordList: nextProps.recordList,
        //     });
        //     // this.getBpmFiles(this.props.identify, nextProps.recordList);
        // }
        
    };
    render() {
        const {recordData} = this.props;
        // console.log(this.props);
        return (
            // <MuiThemeProvider theme={theme}>
            <div className="basic-info"
            >
                {(recordData.description ==="Reporting"&& recordData.tb_repmes !== "")&& <div>
                    <Typography color="textPrimary"> Aciton:</Typography>
                    <Typography color="textPrimary"> Q: {recordData.name}</Typography>
                    <Typography color="textPrimary"> A: {recordData.tb_repmes}</Typography>
                    <br/>
                    <Typography color="textPrimary"> Basic Info:</Typography>
                    <Typography color="textPrimary"> assignee: {recordData.assignee}</Typography>
                </div>
                }

                {(recordData.description ==="Verification"&&recordData.rb_confirmalarm !== "")&&<div>
                    {/* <Typographycolor="textPrimary"> {recordData.rb_confirmalarm}</Typography> */}
                    <Typography color="textPrimary"> Aciton:</Typography>
                    <Typography color="textPrimary"> Q: {recordData.l_rb_confirmalarm}</Typography>
                    <Typography color="textPrimary"> A: {recordData.rb_confirmalarm}</Typography>
                    <br/>
                    <Typography color="textPrimary"> Basic Info:</Typography>
                    <Typography color="textPrimary"> assignee: {recordData.assignee}</Typography>
                </div>}

                {(recordData.description ==="Dissemination"&&recordData.chk_disinfo !== "")&&<div>
                    {/* <Typographycolor="textPrimary"> {recordData.chk_disinfo}</Typography> */}

                    <Typography color="textPrimary"> Aciton:</Typography>
                    <Typography color="textPrimary"> Q: {recordData.l_chk_disinfo}</Typography>
                    <Typography color="textPrimary"> A: {recordData.chk_disinfo}</Typography>
                    <br/>
                    <Typography color="textPrimary"> Basic Info:</Typography>
                    <Typography color="textPrimary"> assignee: {recordData.assignee}</Typography>

                </div>}

                {(recordData.description ==="Closure"&&recordData.tb_closemessage !== "")&&<div>
                    {/* <Typographycolor="textPrimary"> {recordData.tb_closemessage}</Typography> */}
                    <Typography color="textPrimary"> Aciton:</Typography>
                    <Typography color="textPrimary"> Q: {recordData.name}</Typography>
                    <Typography color="textPrimary"> A: {recordData.tb_closemessage}</Typography>
                    <br/>
                    <Typography color="textPrimary"> Basic Info:</Typography>
                    <Typography color="textPrimary"> assignee: {recordData.assignee}</Typography>

                </div>}

            </div>
            // </MuiThemeProvider>
        );
    }
};

BasicInfoList.propTypes = {
    
};
BasicInfoList.defaultProps = {

};
// const mapStateToProps = (state, ownProps) => {
// };
// const mapDispatchToProps = (dispatch) =>{
// };
export default connect(null, null)(BasicInfoList);