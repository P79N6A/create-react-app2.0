// import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
    "@global": {
        // chrome scroll bar
        "::-webkit-scrollbar": {
            width: 12,
            height: 10,
            backgroundColor: theme.palette.scrollBar.scrollBar
        },

        "::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.scrollBar.thumb
        },

        ".showScrollbar:hover::-webkit-scrollbar": {
            backgroundColor: theme.palette.scrollBar.scrollBarHover
        },

        ".showScrollbar:hover::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.scrollBar.thumbHover
        }
    }
});
const ScrollBar = ({ classes }) => null;
ScrollBar.defaultProps = {};
ScrollBar.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(ScrollBar);
