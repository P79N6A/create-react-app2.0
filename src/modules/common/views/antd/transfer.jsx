import React from "react";
import { Transfer } from "antd";
import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../material-ui/loading";
const styles = theme => ({
    "@global": {
        ".ant-transfer": {
            color: themes.palette.text.primary + "!important",
            fontSize: "1rem!important"
        },
        ".ant-transfer-list-search-action": {
            color: themes.palette.text.primary + "!important"
        },
        ".ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover": {
            backgroundColor: themes.palette.action.hover + "!important"
        },
        ".ant-checkbox-checked:after": {
            border: "1px solid " + themes.palette.secondary.main + "!important"
        },
        ".ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-indeterminate .ant-checkbox-inner": {
            backgroundColor: themes.palette.secondary.main + "!important",
            borderColor: themes.palette.secondary.main + "!important"
        },
        ".ant-checkbox-wrapper + span, .ant-checkbox + span": {
            fontSize: "1rem!important"
        },
        ".ant-transfer-list-search-action .anticon": {
            color: themes.palette.text.primary + "!important"
        },
        ".ant-btn-primary": {
            color: themes.palette.text.primary,
            backgroundColor: themes.palette.secondary.main,
            borderColor: themes.palette.secondary.main
        },
        ".ant-checkbox-inner": {
            width: "18px!important",
            height: "18px!important",
            backgroundColor: "rgba(0,0,0,0)!important"
        },
        ".ant-checkbox-checked .ant-checkbox-inner:after": {
            transform: "rotate(45deg) scale(1.2)!important",
            top: "2px!important",
            left: "6px!important",
            borderColor: themes.palette.background.paper + "!important"
            // border: "2px solid " + themes.palette.background.paper
        },
        ".ant-checkbox-indeterminate .ant-checkbox-inner:after": {
            transform: "rotate(0deg) scale(1.2)!important",
            top: "7px!important",
            left: "4px!important"
        },
        ".ant-checkbox-inner:after": {
            border: "2px solid " + themes.palette.background.paper
        },
        ".ant-transfer-list": {
            border: "none!important",
            boxShadow: themes.shadows[10] + "!important"
        },
        ".ant-transfer-list-header": {
            color: themes.palette.text.primary + "!important",
            background: themes.palette.background.paper + "!important",
            borderBottom: "none!important"
        },
        ".ant-input:focus": {
            borderColor: themes.palette.text.primary + "!important",
            "-webkit-box-shadow": "none",
            boxShadow: "none",
            borderRightWidth: "1px !important"
        },
        ".ant-transfer-list-body-not-found": {
            color: themes.palette.text.primary + "!important"
        },
        ".ant-transfer-list-content>.LazyLoad": {
            animation: "TransferHighlightIn 1s"
        },
        "@keyframes TransferHighlightIn": {
            "0%": {
                background: themes.palette.secondary.light
            },
            "100%": {
                background: "transparent"
            }
        },
        progress: {
            margin: theme.spacing.unit * 2,
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "calc(50% - 20px)",
            color: theme.palette.secondary.main,
            zIndex: "2000"
        },
        progressDialog: {
            width: "100%",
            height: "200%",
            top: "-150px",
            left: 0,
            position: "fixed",
            // left: 0,
            background: "rgba(0,0,0,0.1)",
            zIndex: 1330
        },
        full: {
            width: "100%",
            height: "100%",
            opacity: 0
        },
        loading: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0px"
        }
    }
});

const Transfers = ({ isLoading=false, ...Props }) => (
    <div style={{ height: "100%", width: "100%" }}>
        <Transfer {...Props} />
        {isLoading ? <Loading/> : null}
    </div>
);

export default withStyles(styles)(Transfers);
