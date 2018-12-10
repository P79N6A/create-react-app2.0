import React, { Component } from "react";
// import PropTypes from "prop-types";

import "../styles/weatherContainer.less";
import { theme } from "modules/theme";
import WeatherCard from "./weatherCard";
import classnames from "classnames";
import { Typography, Button, withStyles } from "@material-ui/core";
import WeatherIcons from "react-weathericons";
import { WEATHER_API_CONF_KEY } from "commons/constants/const";
import fetch from "commons/utils/fetch";
const styles = theme => {
    return {
        headerColor: {
            color: theme.palette.common.white
        }
    };
};
// import neaApiConf from "config/neaApiConf.json";
class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse_hover: false,
            twoHourNowCast: {},
            date: new Date(),
            location: {}
        };
        this.nowcastID = null;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    async componentDidMount() {
        this.mounted = true;
        this.setState({
            weatherApiConf: JSON.parse(localStorage.getItem(WEATHER_API_CONF_KEY))
        });
        this.nowcastID = setInterval(
            function() {
                this.update2HourNowcast();
            }.bind(this),
            3600000 // 1hr
        );
        this.timerID = setInterval(
            function() {
                this.setState({
                    date: new Date()
                });
            }.bind(this),
            1000
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                });
                this.update2HourNowcast();
                navigator.geolocation.clearWatch(this.watchID);
            },
            error => {
                this.update2HourNowcast();
            }
        );        
    }
    componentWillUnmount() {
        this.clearInterval();
        this.mounted = false;
    }
    clearInterval = async () => {
        clearInterval(this.nowcastID);
        clearInterval(this.timerID);
        navigator.geolocation.clearWatch(this.watchID);
    };
    handleMouseEnter(event) {
        this.setState({ mouse_hover: true });
        event.stopPropagation();
    }
    handleMouseLeave(event) {
        this.setState({ mouse_hover: false });
        event.stopPropagation();
    }
    async update2HourNowcast() {
        const weatherApiConf = JSON.parse(localStorage.getItem(WEATHER_API_CONF_KEY));
        const {location} = this.state;
        if(weatherApiConf){
            let url = weatherApiConf.url + weatherApiConf.currentUrl + "&appid=" + weatherApiConf.appid;
            url +=
                location.lat && location.lon
                    ? "&lat=" + location.lat + "&lon=" + location.lon
                    : "&q=" + weatherApiConf.defaultLocation;
            try {
                const res = await fetch.get(url);
                if(this.mounted){
                    this.setState({
                        twoHourNowCast: {
                            current_temp: parseInt(res.main.temp - 273.15, 10) + " \u2103",
                            current_description: res.weather[0].description,
                            current_icon: weatherApiConf.icons[res.weather[0].id]
                        }
                    });
                }
            } catch (error) {
                clearInterval(this.nowcastID);
            }
        }
        // fetch(url, { method: "GET", cache: "no-cache" })
        //     .then(res => res.json())
        //     .then(res =>

        //     )
        //     .catch(() => {
        //         clearInterval(this.nowcastID);
        //     });
    }
    render() {
        // let mouse_hover = mouse_hover ? "block" : "none";
        const { classes } = this.props;
        const { twoHourNowCast, location, date, mouse_hover } = this.state;
        return (
            <div
                className="weatherContainer"
                {...this.props.data}
                style={{ backgroundColor: theme.palette.background.dark }}
            >
                {/* <IconButton size="small">
                        {twoHourNowCast.current_icon ? <WeatherIcons name={twoHourNowCast.current_icon} /> : null}
                    </IconButton> */}
                <Button
                    className={classnames("weatherContainer-main", classes.headerColor)}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <div className="weather-left">
                        {twoHourNowCast.current_icon ? (
                            <WeatherIcons name={twoHourNowCast.current_icon} />
                        ) : null}
                    </div>
                    <div className="weather-mid">
                        <Typography className={classnames("tem", classes.headerColor)}>
                            {twoHourNowCast.current_temp}
                        </Typography>
                    </div>
                    <div className="weather-right">
                        <Typography className={classnames("tem", classes.headerColor)}>
                            {(
                                date.toLocaleTimeString().slice(0, -1) +
                                "." +
                                date.toLocaleTimeString().slice(-1) +
                                "."
                            ).toLocaleLowerCase()}
                        </Typography>
                        <Typography className={classnames("tem", classes.headerColor)}>
                            {date.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }).replace(/,([^,]*)$/, "$1")}
                        </Typography>
                    </div>
                </Button>
                {mouse_hover && (
                    <div className="weather-card">
                        <WeatherCard
                            twoHourNowCast={twoHourNowCast}
                            location={location}
                            clock={(
                                date.toLocaleTimeString().slice(0, -1) +
                                "." +
                                date.toLocaleTimeString().slice(-1) +
                                "."
                            ).toLocaleLowerCase()}
                        />
                    </div>
                )}
                {/* <Fade in={mouse_hover} timeout={500}>
                        <div className="weather-card">
                            <WeatherCard data={twoHourNowCast} />
                        </div>
                    </Fade> */}
            </div>
        );
    }
}
export default withStyles(styles)(WeatherContainer);
