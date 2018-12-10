import React from "react";
export const Compose = (...args) => {
    return (
        <React.Fragment>
            {args.map((item, i) => {
                return <React.Fragment key={i}>{item}</React.Fragment>;
            })}
        </React.Fragment>
    );
};
