import React, { Component } from "react";
// import PropTypes from "prop-types";
import Wrap from "commons/components/wrapComponent";

export default class VisualProps extends Component {
    state = {};
    static defaultProps = {
        view: null,
        id: null,
        props: {}
    };
    static propTypes = {};
    componentDidMount = () => {
        this.props.get(this);
    };
    getNode = node => {
        this.storeContainer = node;
    };
    getProps = () => {
        try {
            if (this.storeContainer) {
                return this.storeContainer.getData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    callLoading = () => {};
    render = () => {
        const { view: V, id, props } = this.props;
        return (
            <Wrap>
                {V ? (
                    <V
                        identify={id}
                        get={this.getNode}
                        lockSave={() => {}}
                        callLoading={this.callLoading}
                        {...JSON.parse(JSON.stringify(props))}
                    />
                ) : null}
            </Wrap>
        );
    };
}
