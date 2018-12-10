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
 * Created by chenling on 02/08/2018.
 */
import React from "react";
// import { DatePicker } from "antd";
import PropTypes from "prop-types";
// import { theme as themes } from "modules/theme";
import moment from "moment";
import "../../styles/sop.less"; 
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import RangePicker from "./rangePicker";
const styles = theme => ({
    datePickerWrapper: {
        width: "100%",
        position: "relative",
        zIndex: 2000000,
        margin: "4px 0px 8px!important"
    },
    label: {
        color: theme.palette.secondary.main + "!important"
    },
    input: {
        "&:hover": {
            borderBottom: "0px"
        },
        borderBottom: "2px solid " + theme.palette.secondary.main + "!important"
    },
    dateLabel: {
        color: theme.palette.text.secondary,
        fontSize: "0.75rem",
        "&:focus": {
            color: theme.palette.secondary.main
        }
    },
    inputOrigi: {
        "&:hover": {
            borderColor: theme.palette.text.primary
        },
        borderBottom: "1px solid " + theme.palette.text.primary
    },
    datePicker: {
        width: "100%",
        position: "relative",
        top: "-7px",
        padding: "0",
        "& input": {
            border: "0px!important",
            outline: "none",
            padding: "0",
            background: "none",
            color: theme.palette.text.primary
        }
    }
});

class Date extends React.Component {
    static defaultProps = {
        dateFormat: "YYYY-MM-DD HH:mm:ss"
    };
    state = {
        isOpen: false
    };
    onOpenChange = status => {
        this.setState({
            isOpen: status
        });
    };
    
    render() {
        const { classes, onChange, dateFormat, label, disabled, required, defaultDate, disabledRangeTime, RangePickerId} = this.props;
        const { isOpen } = this.state;
        // sessionStorage.setItem("rangePickerId", RangePickerId);
        return (
            <div className={classes.datePickerWrapper} id={RangePickerId}>
                <label required={required} className={classnames(classes.dateLabel, isOpen ? classes.label : "")}>{required ? [`${label}*`] : {label}}</label>
                <RangePicker
                    style={{width: "100%"}}
                    showTime
                    allowClear={false}
                    disabled={disabled}
                    RangePickerId={RangePickerId}
                    // disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    onChange={onChange}
                    onOpenChange={this.onOpenChange}
                    value={[moment(defaultDate[0], dateFormat), moment(defaultDate[1], dateFormat)]}
                    format="YYYY-MM-DD HH:mm:ss"
                    fullWidth
                />
            </div>
        );
    }
}

Date.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    defaultDate: PropTypes.array.isRequired
};

export default withStyles(styles)(Date);
