import React from "react";
import PropTypes from "prop-types";

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <b className="filter selected">{children}</b>;
    } else {
        return (
            <a
                href="javascript:;"
                className="filter not-selected"
                onClick={ev => {
                    ev.preventDefault();
                    onClick();
                }}
            >
                {children}
            </a>
        );
    }
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
