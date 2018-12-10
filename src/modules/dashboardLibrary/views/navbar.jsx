import React from "react";
import {
    ListItem,
    List,
    ListItemText,
    IconButton,
    Divider,
    Drawer
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Lists = () => {
    return (
        <List component="nav">
            <ListItem button>
                <ListItemText primary="Dashboard Library" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Drafts" />
            </ListItem>
        </List>
    );
};

const NavBar = props => {
    const { anchor, open, classes, theme, handleDrawerClose } = props;
    return (
        <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <Lists />
        </Drawer>
    );
};

export default NavBar;
