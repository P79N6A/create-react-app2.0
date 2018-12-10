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
 * Created by Chen Ling on 15/10/2018.
 */
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Typography from "@material-ui/core/Typography";
// import Icon from "@material-ui/core/Icon";
import "../styles/taskFilter.less";
// import Theme from "commons/components/theme";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
class TaskFilter extends Component {
    render() {
        const { searchChange } = this.props;
        return (
            <div>
                <TextField 
                    id="search" 
                    label="Search Task" 
                    type="search" 
                    margin="normal" 
                    className="searchBar" 
                    autoFocus={false}
                    onChange={searchChange}
                />
            </div>
        );
    }
}
TaskFilter.propTypes = {
  
};

export default connect()(TaskFilter);
