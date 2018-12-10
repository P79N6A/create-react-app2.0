import React from "react";
import { FormControl, MenuItem, ListItemText, Checkbox } from "@material-ui/core";
import { Select, Input, InputLabel } from "modules/common/index";
// import { I18n } from "react-i18nify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * Call server API based on HTTP DELETE
 * @example
*  <MoveToSelect
        group={group}
        groupData={groupData}
        selectChange={this.selectChange}
        classes={classes}
    />
 *
 * @param {function} selectChange
 * @param {string} group
 * @param {array} groupData
 * @param {object} classes
 * @returns ComponentList
 */
const MoveToSelect = ({ group, selectChange, classes, groupData }) => {
    return (
        <FormControl className={classes.editItem}>
            <InputLabel htmlFor="controlled-open-select">Move to</InputLabel>
            <Select
                multiple
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                value={group}
                onChange={selectChange}
                native={false}
                name="group"
            >
                {groupData.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                        <Checkbox checked={group.indexOf(item.id) > -1} />
                        <ListItemText primary={item.id} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MoveToSelect;
