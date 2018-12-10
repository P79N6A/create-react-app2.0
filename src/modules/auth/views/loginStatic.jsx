import React from "react";

export const LoginLogo = () => {
    return (
        <div className="login-logo">
            <img src="/static/media/surf-logo-400.png" alt="SURF Logo" />
        </div>
    );
};

export const LoginPowered = () => {
    return (
        <div className="login-powered">
            Powered by &nbsp;
            <img src="/static/media/logo-ncs.png" alt="NCS Logo" />
        </div>
    );
};
