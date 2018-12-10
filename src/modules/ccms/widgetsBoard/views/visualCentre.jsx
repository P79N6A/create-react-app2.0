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
import { MenuItem, FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import VisualGridList from "./visualCentreGridList";
// import { theme as themes } from "modules/theme";
import { I18n } from "react-i18nify";
import { InputLabel, Select } from "modules/common";

const styles = theme => {
    return {
        visual_centre_view_grid: {
            paddingTop: theme.spacing.unit * 3,
            "&::-webkit-scrollbar": {
                backgroundColor: "transparent !important"
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent !important",
                borderRadius: 3
            },
            "&:hover::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(6, 14, 27, 0.5) !important"
            }
        }
    };
};

const VisualCentre = ({
    classes,
    templates,
    categories,
    selectWidget,
    onWidgetSelect,
    selectCategory,
    onCategoryChange
}) => {
    return (
        // <MuiThemeProvider theme={themes}>
        <FormControl fullWidth>
            <InputLabel>{I18n.t("ccms.visualCentre.categorySelectPlaceholder")}</InputLabel>
            <Select fullWidth value={selectCategory}>
                {categories &&
                    categories.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                value={item.category}
                                classes={{
                                    root: classes.visual_centre_type_category_select_menu,
                                    selected: classes.visual_centre_type_category_selected
                                }}
                                onClickCapture={() => onCategoryChange(item)}
                            >
                                {item.label}
                            </MenuItem>
                        );
                    })}
            </Select>
            <div className={classes.visual_centre_view_grid}>
                <VisualGridList gridItems={templates} selectedType={selectWidget} changeHandler={onWidgetSelect} />
            </div>
        </FormControl>
        // </MuiThemeProvider>
    );
};

export default withStyles(styles)(VisualCentre);
