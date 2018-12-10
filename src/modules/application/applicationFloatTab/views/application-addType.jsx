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
// import { TextField } from "modules/common";
// import ListItem from "@material-ui/core/ListItem";
import { Select, InputLabel } from "modules/common";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// import jp from "jsonpath";
import _ from "lodash";

const typeList = [{ value: "application", label: "Application" }, { value: "address", label: "Address" }];

class TypeSelection extends React.Component {
    state = {value:""};

    componentDidMount(){
        this.setState({value:this.props.value});
    }

    componentWillReceiveProps(nextProps){
        if(_.isEqual(nextProps.value,this.props.value)){
            return;
        }
        this.setState({value:nextProps.value});
    }

    onChange = value => {
        this.setState({value},()=>{
            this.props.onTypeChange(value);
        });
    };

    render() {
        const { onChange } = this;
        const {value} = this.state;
        // const { sysconfigDeviceSchema } = this.props;
        return (
            <div className="detail-cont">
                <FormControl style={{width:"100%"}}>
                    <InputLabel htmlFor="type-helper">Select Type</InputLabel>
                    <Select
                        value={value?value.value : ""}
                        onChange={event => {
                            const value = _.find(typeList,["value",event.target.value]);
                            onChange(value);
                        }}
                        inputProps={{
                            name: "type",
                            id: "type-helper"
                        }}
                    >
                        {_.map(typeList || [], item => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

TypeSelection.propTypes = {};

TypeSelection.defaultProps = {};

export default TypeSelection;
