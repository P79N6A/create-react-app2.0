import React, { Component } from "react";
import moment from "moment";

class LoginDateTime extends Component {
    constructor(props) {
        super(props);
        var dt = new moment();
        this.state = {
            month: dt.format("MMMM DD"),
            week: dt.format("YYYY, dddd"),
            time: dt.format("hh:mm A")
        };
    }

    render() {
        return (
            <div className="login-date-time">
                <h2 id="lblMonth">{this.state.month}</h2>
                <p id="lblWeek" className="text-left">
                    {this.state.week}
                </p>
                <p id="lblTime" className="text-left">
                    {this.state.time}
                </p>
            </div>
        );
    }

    componentDidMount() {
        this.interval = setInterval(
            function() {
                var dt = new moment();
                this.setState({
                    month: dt.format("MMMM DD"),
                    week: dt.format("YYYY, dddd"),
                    time: dt.format("hh:mm A")
                });
            }.bind(this),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default LoginDateTime;
