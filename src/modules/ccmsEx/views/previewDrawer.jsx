import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";

const PREVIEW_MAX_HEIGHT = 24;
const PREVIEW_MAX_WIDTH = 22;
const drawerWidth = 33.2;

const PreviewContainer = ({ children, layout, lock }) => {
    const { h, w } = layout;
    const w_unit = (window.innerWidth * (1 - drawerWidth / 100)) / PREVIEW_MAX_HEIGHT;
    const h_unit = window.innerHeight / PREVIEW_MAX_WIDTH;
    return (
        <div
            style={{
                pointerEvents: lock ? "none" : "all",
                width: `${w >= PREVIEW_MAX_HEIGHT ? (PREVIEW_MAX_HEIGHT - 1) * w_unit : w * w_unit}px`,
                height: `${h >= PREVIEW_MAX_WIDTH ? (PREVIEW_MAX_WIDTH - 1) * h_unit : h * h_unit}px`
            }}
        >
            {children}
        </div>
    );
};

PreviewContainer.defaultProps = {
    layout: {
        h: 0,
        w: 0
    },
    lock: true
};

const styles = Theme => {
    return {
        drawer_paper: {
            width: "66.8vw",
            position: "absolute",
            // background: "transparent",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,.7)"
        }
    };
};

const Preview = ({ open, id, props, layout, editable, MuiTheme, classes, ccmsAction, settings, view: V, app }) => {
    ccmsAction && store.dispatch(ccmsAction(props, id));
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawer_paper
            }}
        >
            <PreviewContainer layout={layout} lock={!settings.editable}>
                {V ? <V identify={id} {...props} currentApplicationInfo={app} MuiTheme={MuiTheme} /> : null}
            </PreviewContainer>
        </Drawer>
    );
};

Preview.defaultProps = {
    open: false,
    props: {},
    layout: {
        w: 0,
        h: 0
    },
    editable: false,
    view: null,
    id: "",
    settings: {
        editable: false
    }
};

Preview.propsTypes = {
    open: PropTypes.bool,
    props: PropTypes.object,
    layout: PropTypes.object,
    editable: PropTypes.bool,
    view: PropTypes.oneOf([PropTypes.element, PropTypes.any]),
    MuiTheme: PropTypes.object
};

export default withStyles(styles)(Preview);
