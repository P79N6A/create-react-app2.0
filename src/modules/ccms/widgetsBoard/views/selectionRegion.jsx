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
 * Created by wplei on 25/05/18.
 */
import React from "react";
import propTypes from "prop-types";
import { Tabs, Tab, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { theme as themes } from "modules/theme";

const styles = theme => {
    return {
        selection_region_Tab_container: {
            // paddingLeft: theme.spacing.unit,
            // paddingRight: theme.spacing.unit,
            // height: "39vh",
            // height: "calc(100% - 280px)",
            // padding: "0 24px"
            // "&>div>div:last-child": {
            //     height: "calc(100% - 81px)",
            //     paddingBottom: "0px"
            // }
            height: "calc(100% - 290px)"
        },
        tabs_labelContainer: {
            marginLeft: -(theme.spacing.unit / 2)
        }
    };
};

const TabContainer = ({ index, tabs }) => {
    return (
        tabs &&
        tabs.filter((item, i) => {
            return item.index === index;
        })[0].content
    );
};

class SelectionRegion extends React.Component {
    state = {};
    static propTypes = {
        tabs: propTypes.arrayOf(
            propTypes.shape({
                label: propTypes.string.isRequired,
                index: propTypes.oneOfType([propTypes.string, propTypes.number]),
                content: propTypes.element
            })
        )
    };
    handleTabChange = (event, value) => {
        this.props.onTabChange(value);
    };
    render = () => {
        const { tabs, classes, index } = this.props;
        return (
            // <MuiThemeProvider theme={themes}>
            <React.Fragment>
                <Tabs
                    value={index}
                    classes={{
                        flexContainer: classes.tabs_labelContainer
                    }}
                    onChange={this.handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {tabs &&
                        tabs.map((item, index) => {
                            return <Tab key={index} label={item.label} value={item.index} />;
                        })}
                </Tabs>
                <Divider />
                <div id="tab_container" className={classes.selection_region_Tab_container}>
                    <TabContainer index={index} tabs={tabs} />
                </div>
            </React.Fragment>
            // </MuiThemeProvider>
        );
    };
}

export default withStyles(styles)(SelectionRegion);
