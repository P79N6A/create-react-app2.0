import React from "react";
// import PropTypes from "prop-types";
import Preview from "./tableForPreview";
import CardContent from "@material-ui/core/CardContent";
import Format from "./component/controlFormat";
import Type from "./component/controlType";
import Action from "./component/controlAction";
import QueryScriptControl from "./component/controlQueryScript";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import NameControl from "./component/controlName";

const styles = theme => ({
    drawerPaper: {
        height: "70% !important"
    }
});
const AddTable = props => {
    let { showPreviewTable, classes, identify, onPropertyChange } = props;
    return (
        <Paper className="kpiQuery-drawer">
            <div>
                <CardContent
                    className="kpiQuery-content"
                    onClick={() => {
                        onPropertyChange && showPreviewTable && onPropertyChange(identify, "showPreviewTable", false);
                    }}
                >
                    <NameControl {...props} />
                    <Format {...props} />
                    <Type {...props} />
                    <QueryScriptControl {...props} />
                </CardContent>
                <Action {...props} />
            </div>
            <Drawer
                variant="persistent"
                anchor="bottom"
                open={showPreviewTable}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Preview {...props} />
            </Drawer>
        </Paper>
    );
};

export default withStyles(styles)(AddTable);
