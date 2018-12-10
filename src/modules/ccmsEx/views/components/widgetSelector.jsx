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

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    FormControl,
    MenuItem,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    Icon,
    Grow,
    Radio
} from "@material-ui/core";
import { InputLabel, Select } from "../../../common";
import { I18n } from "react-i18nify";

const styles = Theme => {
    return {
        img: {
            width: "100%"
        },
        visual_grid_item: {
            paddingTop: Theme.spacing.unit * 6,
            display: "flex",
            justifyContent: "center",
            height: "100%",
            borderRadius: 4,
            background: Theme.palette.primary.dark
        },
        gridList_root: {
            padding: `${Theme.spacing.unit * 3}px 0 0 0`
        }
    };
};

class WidgetSelector extends Component {
    state = {
        templates: [],
        category: "None"
    };
    static defaultProps = {
        categories: [],
        checked: ""
    };
    static propTypes = {};
    handleCategoryChange = category => {
        const { onCategoryChange } = this.props;
        const { category: gory } = category;
        this.setState({
            category: gory
        });
        onCategoryChange(category);
    };
    handleWidgetSelected = item => {
        const { onWidgetSelected } = this.props;
        onWidgetSelected(item);
    };
    render = () => {
        let { widgetList: categories, classes, compId, category, templates = [] } = this.props;
        if (!templates.length && category && compId) {
            const cate = categories.filter(item => {
                return item.category === category && item;
            });
            templates = cate[0].template;
        }
        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <InputLabel focused>{I18n.t("ccms.visualCentre.categorySelectPlaceholder")}</InputLabel>
                    <Select fullWidth value={category}>
                        {categories &&
                            categories.map((item, index) => {
                                const { category, label } = item;
                                return (
                                    <MenuItem
                                        onClickCapture={() => this.handleCategoryChange(item)}
                                        key={index}
                                        value={category}
                                    >
                                        {label}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
                <Grid>
                    <GridList
                        cols={3}
                        spacing={8}
                        classes={{
                            root: classes.gridList_root
                        }}
                    >
                        {templates &&
                            templates.map((item, index) => {
                                const { configValue, metadata } = item;
                                return (
                                    <Grow key={index} in timeout={index * 500}>
                                        <GridListTile>
                                            <GridListTileBar
                                                title={metadata.name}
                                                titlePosition="top"
                                                actionIcon={
                                                    <Radio
                                                        checked={compId === metadata.compId}
                                                        onChange={() => this.handleWidgetSelected(item)}
                                                    />
                                                }
                                            />
                                            <div className={classes.visual_grid_item}>
                                                {configValue && configValue.snapshoot ? (
                                                    <img className={classes.img} alt="" src={configValue.snapshoot} />
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
            </React.Fragment>
        );
    };
}

export default withStyles(styles)(WidgetSelector);
