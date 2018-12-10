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
import { Grid, GridList, GridListTile, GridListTileBar, Radio, Grow, Icon } from "@material-ui/core";
// import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
// import line from "../images/basic_line.PNG";

const styles = themes => {
    return {
        radio_root: {
            color: themes.palette.primary.contrastText
        },
        visual_grid_item: {
            paddingTop: themes.spacing.unit * 6,
            display: "flex",
            justifyContent: "center",
            height: "100%",
            borderRadius: 4,
            background: themes.palette.primary.dark
        },
        grid_list_tile_header_bar_top: {
            borderRadius: 4
        },
        list_content_img: {
            width: "100%"
        }
    };
};

class VisualGridList extends React.Component {
    state = {};
    render = () => {
        const { classes, gridItems, selectedType, changeHandler } = this.props;
        return (
            <Grid>
                <GridList cols={3} spacing={8}>
                    {gridItems &&
                        gridItems.map((item, index) => {
                            const { metadata, configValue } = item;
                            return (
                                <Grow key={index} in timeout={index * 200}>
                                    <GridListTile title={metadata.name}>
                                        <GridListTileBar
                                            title={metadata.name}
                                            titlePosition="top"
                                            classes={{
                                                titlePositionTop: classes.grid_list_tile_header_bar_top
                                            }}
                                            actionIcon={
                                                <Radio
                                                    classes={{
                                                        root: classes.radio_root
                                                    }}
                                                    onChange={() => changeHandler(item)}
                                                    checked={selectedType === metadata.compId}
                                                />
                                            }
                                        />
                                        <div className={classes.visual_grid_item}>
                                            {configValue.snapshoot ? (
                                                <img
                                                    style={{ width: "100%", border: "1px solid black" }}
                                                    src={configValue.snapshoot}
                                                    alt=""
                                                />
                                            ) : (
                                                <Icon style={{ fontSize: 100 }}>photo</Icon>
                                            )}
                                        </div>
                                    </GridListTile>
                                </Grow>
                            );
                        })}
                </GridList>
            </Grid>
        );
    };
}

export default withStyles(styles)(VisualGridList);
