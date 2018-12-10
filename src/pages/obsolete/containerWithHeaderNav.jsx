import React from "react";
import { view as Header } from "modules/header";
import { view as Navbar } from "modules/navbar";

const Template = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Navbar />
            {children}
        </React.Fragment>
    );
};

export default Template;
