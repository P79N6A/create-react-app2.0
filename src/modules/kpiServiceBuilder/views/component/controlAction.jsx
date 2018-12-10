import CardActions from "@material-ui/core/CardActions";
import React from "react";
// import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ActionControl = props => {
    let {
        type,
        identify,
        onGetPreview,
        format,
        queryScript,
        onPropertyChange,
        onSaveKpi,
        modifiedby,
        name
    } = props;
    return (
        <CardActions>
            <Button
                variant="contained"
                color="primary"
                onClick={e => {
                    e.nativeEvent.stopImmediatePropagation();
                    onGetPreview && onGetPreview(identify, type, format, queryScript);
                    onPropertyChange && onPropertyChange(identify, "showPreviewTable", true);
                }}
            >
                See Preview
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={e => {
                    e.nativeEvent.stopImmediatePropagation();
                    onSaveKpi && onSaveKpi(identify, name, modifiedby, type, format, queryScript);
                }}
            >
                Save
            </Button>
        </CardActions>
    );
};

export default ActionControl;
