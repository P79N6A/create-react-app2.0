import React from "react";
import { view as ApplicationView } from "modules/application";
// import { view as Header } from "modules/ccms/header";
import Wrap from "commons/components/wrapComponent";

class Application extends React.Component {
    state = {};
    render() {
        return (
            <Wrap>
                <ApplicationView />
            </Wrap>
        );
    }
}
Application.propTypes = {
    // classes: PropTypes.object.isRequired
};
Application.defaultProps = {};
export default Application;
