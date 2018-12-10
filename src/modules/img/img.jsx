import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./images/SURF_Vertical-RWH.png";

export class Img extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onError = this.onError.bind(this);
    }
    static defaultProps = {
        src: logo
    };
    static propTypes = {
        src: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.setState({ ...this.props });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.state) {
            this.setState({ ...nextProps });
        }
    }

    onError() {
        this.setState({ src: logo });
    }

    render() {
        return (
            <div>
                <img src={this.state.src} alt={this.props.alt} onError={this.onError} style={{ width: "100%", height: "100%" }} />
            </div>
        );
    }
}

export default Img;
