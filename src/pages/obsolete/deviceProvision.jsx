import React from "react";
import { view as DeviceProvisionView } from "modules/topologyManagement";
import Wrap from "commons/components/wrapComponent";
// import { Header } from "modules/header";
// import { Navbar } from "modules/navbar";
// import { Container } from "modules/container";

class DeviceProvision extends React.Component {
    state = {};
    render() {
        return (
            <Wrap>
                {/* <Header title="Device Provisioning" />
                <Navbar />
                <Container> */}
                <DeviceProvisionView />
                {/* </Container> */}
            </Wrap>
        );
    }
}
DeviceProvision.propTypes = {
    // classes: PropTypes.object.isRequired
};
DeviceProvision.defaultProps = {};
export default DeviceProvision;
