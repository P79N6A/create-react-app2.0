import React from "react";
// import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarForKpi = props => {
    let { message,onPropertyChange,identify } = props;
    let timer;
    return (
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={message}
            onClose={()=>{
                onPropertyChange&&onPropertyChange(identify,"message","");
            }}
            onEntered={()=>{
                clearTimeout(timer);
                setTimeout(()=>{
                    onPropertyChange&&onPropertyChange(identify,"message","");
                },5000);
            }}
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{message}</span>}
        />
    );
};

export default SnackbarForKpi;
