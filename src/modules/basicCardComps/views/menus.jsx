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
 * Created by KaiDi on 25/04/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu, { MenuItem } from "@material-ui/core/Menu";

export class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleClose = this.handleClose.bind(this);
    }
    static defaultProps = {
        anchorEl: null,
        options: []
    };
    static propTypes = {
        handleClick: PropTypes.func.isRequired
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ anchorEl: nextProps.anchorEl });
    }
    handleClose(item) {
        this.setState({ anchorEl: null });
        this.props.handleClick && this.props.handleClick(item);
    }

    render() {
        let { anchorEl } = this.state;
        let { options } = this.props;
        return (
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                    this.handleClose();
                }}
                //     PaperProps={{
                //     style: {
                //         maxHeight: 40 * 4.5,
                //         width: 200
                //     }
                // }}
            >
                {options.map(option => (
                    <MenuItem
                        key={option}
                        onClick={() => {
                            this.handleClose(option);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        );
    }
}

export default Menus;
