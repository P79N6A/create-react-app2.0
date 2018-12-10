import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 20px)",
        left: "calc(50% - 20px)",
        color: theme.palette.secondary.main,
        zIndex: "30000"
    },
    progressDialog: {
        width: "100%",
        height: "200%",
        top: "-150px",
        left: 0,
        position: "fixed",
        background: "rgba(0,0,0,0.1)",
        zIndex: 30000
    }
});

const Progress = ({ classes, ...other }) => (
    <div>
        <CircularProgress
            className={classes.progress}
            {...other}
        />
        <div className={classes.progressDialog} />
    </div>
);

export default withStyles(styles)(Progress);
