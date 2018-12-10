import React, { Component } from "react";

function getTime(now) {
    var seconds = now.getSeconds();
    var hours = now.getHours();
    var mins = now.getMinutes();

    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";

    var hdegree = hours * 30 + mins / 2;
    var hrotate = "rotate(" + hdegree + "deg)";

    var mdegree = mins * 6;
    var mrotate = "rotate(" + mdegree + "deg)";
    return {
        second: {
            msTransform: srotate,
            WebkitTransform: srotate,
            MozTransform: srotate,
            OTransform: srotate,
            transform: srotate
        },
        minute: {
            msTransform: hrotate,
            WebkitTransform: hrotate,
            MozTransform: hrotate,
            OTransform: hrotate,
            transform: hrotate
        },
        hour: {
            msTransform: mrotate,
            WebkitTransform: mrotate,
            MozTransform: mrotate,
            OTransform: mrotate,
            transform: mrotate
        }
    };
}

class LoginClock extends Component {
    constructor(props) {
        super(props);
        var dt = new Date();
        this.state = getTime(dt);
    }

    render() {
        return (
            <ul id="clock">
                <li id="sec" style={this.state.second} />
                <li id="hour" style={this.state.hour} />
                <li id="min" style={this.state.minute} />
            </ul>
        );
    }

    componentDidMount() {
        this.interval = setInterval(
            function() {
                var dt = new Date();
                this.setState(getTime(dt));
            }.bind(this),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default LoginClock;
