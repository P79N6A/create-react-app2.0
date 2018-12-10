import { withStyles } from "@material-ui/core/styles";
import { view as Header } from "modules/header";
import { view as Navbar } from "modules/navbar";
import PropTypes from "prop-types";
import React from "react";
// import _ from "lodash";

const styles = Theme => {
    return {
        container: {
            background: Theme.palette.primary.main
        }
    };
};

const NORMAL_PADDING = "72px 8px 8px 8px";

const defaultProps = {
    padding: true, // container padding
    container: true, // if wrap by comtainer
    header: [true, {}], // show header + header config
    navbar: [true, {}], // show navbar + navbar config
    modules: []
};

const propTypes = {
    padding: PropTypes.bool,
    container: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    header: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    navbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    modules: PropTypes.array
};

const Container = ({ modules, padding, container, header, navbar, classes }) => {
    const appInfo = sessionStorage.getItem("ISC-APPLICATION-INFO") || null;
    const C =
        modules &&
        modules.map((mojo, index) => {
            const { V, props, identify } = mojo;
            return V ? (
                <V
                    key={identify || index}
                    {...props}
                    currentApplicationInfo={(appInfo && JSON.parse(appInfo)) || null}
                />
            ) : null;
        });
    return (
        <React.Fragment>
            {container ? (
                <React.Fragment>
                    {(header === true || header[0] === true) && (
                        <Header {...header[1] || {}} application={(appInfo && JSON.parse(appInfo)) || null} />
                    )}
                    {(navbar === true || navbar[0] === true) && (
                        <Navbar {...navbar[1] || {}} application={(appInfo && JSON.parse(appInfo)) || null} />
                    )}
                    <div
                        className={classes.container}
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: padding && NORMAL_PADDING
                        }}
                    >
                        {C}
                    </div>
                </React.Fragment>
            ) : (
                C
            )}
        </React.Fragment>
    );
};

Container.defaultProps = defaultProps;
Container.propTypes = propTypes;

export default withStyles(styles)(Container);
