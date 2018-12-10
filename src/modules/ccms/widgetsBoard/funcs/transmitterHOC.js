import React from "react";

/**
 *
 * @param {freeProps,freeState} params
 */
/**
 *
 */
export const transmitHOC = (...params) => WrappedComponent => {
    const { props, id } = params;
    return class HOCWrappedComponent extends WrappedComponent {
        render = () => <WrappedComponent {...props} key={id} identify={id} />;
    };
};
