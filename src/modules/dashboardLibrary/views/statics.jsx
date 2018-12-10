import { Card, CardHeader, CircularProgress, Icon, Modal } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const CountPanel = ({ countItem, count, classes }) => {
    return (
        <Card
            raised
            style={{
                marginRight: 16,
                width: 160
            }}
        >
            <CardHeader
                style={{
                    padding: "0px 16px"
                }}
                avatar={
                    <Icon
                        style={{
                            fontSize: 30
                        }}
                        color="action"
                    >
                        {countItem.icon}
                    </Icon>
                }
                title={countItem.text}
                subheader={count}
                titleTypographyProps={{
                    variant: "subtitle2",
                    color: "textPrimary"
                }}
                subheaderTypographyProps={{
                    variant: "h6",
                    color: "textPrimary",
                    style: {
                        lineHeight: 1.3
                    }
                }}
            />
        </Card>
    );
};

const defaultProps = {
    height: 0,
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0]
};
const propTypes = {
    height: PropTypes.string
};

class WrapperScrollBar extends React.Component {
    handleMouseScroll = event => {};
    render = () => {
        const { children, height, padding, margin, onScroll } = this.props;
        return (
            <div
                onScroll={onScroll(height)}
                style={{
                    height: height,
                    overflowX: "hidden",
                    overflowY: "auto",
                    margin: margin.reduce((calc, current) => (calc += ` ${current}px`), "").trim(),
                    padding: padding.reduce((calc, current) => (calc += ` ${current}px`), "").trim()
                }}
            >
                <div className="element-wrapper">{children}</div>
            </div>
        );
    };
}
WrapperScrollBar.defaultProps = defaultProps;
WrapperScrollBar.propTypes = propTypes;

const Loading = ({ open }) => {
    return (
        <Modal open={open} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size={50} color="secondary" />
        </Modal>
    );
};

Loading.defaultProps = { open: false };
Loading.propTypes = { open: PropTypes.bool };

export { WrapperScrollBar, CountPanel, Loading };
