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
 * Created by KaiDi on 25/05/2018.
 */

import React from "react";
// import { theme as themes } from "modules/theme";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import LeftIcon from "@material-ui/icons/ArrowLeft";
import RightIcon from "@material-ui/icons/ArrowRight";

export const multipleShadow = "10";
const drawerWidth = 600;

const styles = Theme => ({
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        transform: `translate(${drawerWidth}px, 0px)`,
        transition: Theme.transitions.create("width", {
            easing: Theme.transitions.easing.sharp,
            duration: Theme.transitions.duration.enteringScreen
        }),
        boxShadow: Theme.shadows[multipleShadow],
        overflowY: "visible",
        zIndex: 1100
    },
    paper2X: {
        position: "absolute",
        width: drawerWidth * 1.5,
        height: "100%",
        // transform: `translate(-${drawerWidth}px, 0px)`,
        transition: Theme.transitions.create("width", {
            easing: Theme.transitions.easing.sharp,
            duration: Theme.transitions.duration.enteringScreen
        }),
        overflowY: "visible",
        boxShadow: Theme.shadows[multipleShadow]
    },
    arrow: {
        width: 0,
        height: 0,
        borderWidth: "50px 40px 50px 0",
        borderStyle: "solid",
        borderColor: `transparent ${Theme.palette.primary.light} transparent transparent`,
        position: "absolute",
        left: "-40px",
        top: "48%",
        display: "flex",
        alignItems: "center",
        color: Theme.palette.text.primary,
        cursor: "pointer"
    },
    icon: {
        fontSize: "55px"
    }
});

class Drawers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldWidth2X: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open !== nextProps.open && nextProps.open) {
            this.setState({
                shouldWidth2X: false
            });
        }
    }

    handleWidthChangeFunc = () => {
        this.setState({
            shouldWidth2X: !this.state.shouldWidth2X
        });
    };

    render() {
        const { classes, children, open } = this.props;
        const { shouldWidth2X } = this.state;
        return (
            <Drawer
                {...this.props}
                classes={{
                    paper: shouldWidth2X ? classes.paper2X : classes.paper
                }}
            >
                {open ? (
                    <div className={classes.arrow} onClick={this.handleWidthChangeFunc.bind(this)}>
                        {shouldWidth2X ? <RightIcon className={classes.icon} /> : <LeftIcon className={classes.icon} />}
                    </div>
                ) : null}
                {children}
            </Drawer>
        );
    }
}

export default withStyles(styles)(Drawers);
