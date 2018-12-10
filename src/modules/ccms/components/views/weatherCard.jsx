import React, { Component } from "react";

import "../styles/weatherCard.less";
import { Typography, Card, CardMedia, CardContent, withStyles } from "@material-ui/core";
// import { MuiThemeProvider } from "@material-ui/core/styles";

import WeatherIcons from "react-weathericons";
// import neaApiConf from "config/neaApiConf.json";
import backImg from "../images/Singtel-back.jpg";
import { WEATHER_API_CONF_KEY } from "commons/constants/const";
import classnames from "classnames";
const styles = theme => ({
    headerColor: {
        color: theme.palette.common.white
    },
    bgcolor: {
        backgroundColor: theme.palette.primary.dark
    },
    mainColor: {
        color: theme.palette.text.primary
    }
});

class WeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), [WEATHER_API_CONF_KEY]: {}, location: props.location };
    }
    getData(url, opt) {
        localStorage.setItem(url, "pending");
        return fetch(url, opt).then(res => {
            return res.json();
        });
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({
            [WEATHER_API_CONF_KEY]: JSON.parse(localStorage.getItem(WEATHER_API_CONF_KEY))
        });
        this.update4DaysForecast();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    update4DaysForecast() {
        const forecast = localStorage.getItem("daysForecast");
        const weatherApiConf = JSON.parse(localStorage.getItem(WEATHER_API_CONF_KEY));
        if (weatherApiConf) {
            if (!forecast || JSON.parse(forecast).timestamp !== new Date().toDateString()) {
                let url = weatherApiConf.url + weatherApiConf.forecastUrl + "&appid=" + weatherApiConf.appid;
                url +=
                    this.state.location.lat && this.state.location.lon
                        ? "&lat=" + this.state.location.lat + "&lon=" + this.state.location.lon
                        : "&q=" + weatherApiConf.defaultLocation;

                if (localStorage.getItem(url) !== "pending") {
                    this.getData(url, { method: "GET", cache: "no-cache" })
                        .then(res => {
                            localStorage.setItem(url, "success");
                            const data = [];
                            let curDate = res.list[0].dt_txt.substr(0, 10),
                                count = 0;
                            for (let i = 0; i < res.list.length && count < weatherApiConf.forecastDays; i++) {
                                if (res.list[i].dt_txt.substr(0, 10) !== curDate) {
                                    count++;
                                    curDate = res.list[i].dt_txt.substr(0, 10);
                                    data.push({
                                        forecast_day: new Date(res.list[i].dt_txt).toLocaleDateString("en-US", {
                                            weekday: "short"
                                        }),
                                        forecast_icon: weatherApiConf.icons[res.list[i].weather[0].id],
                                        forecast_temp_min: res.list[i].main.temp_min,
                                        forecast_temp_max: res.list[i].main.temp_max
                                    });
                                } else if (count > 0) {
                                    data[count - 1].forecast_temp_min =
                                        res.list[i].main.temp_min < data[count - 1].forecast_temp_min
                                            ? res.list[i].main.temp_min
                                            : data[count - 1].forecast_temp_min;
                                    data[count - 1].forecast_temp_max =
                                        res.list[i].main.temp_max > data[count - 1].forecast_temp_max
                                            ? res.list[i].main.temp_max
                                            : data[count - 1].forecast_temp_max;
                                }
                            }
                            localStorage.setItem(
                                "daysForecast",
                                JSON.stringify({
                                    timestamp: new Date().toDateString(),
                                    location: res.city.name,
                                    country: res.city.country,
                                    data: data
                                })
                            );
                            this.create4DaysForecastDom({
                                location: res.city.name,
                                country: res.city.country,
                                data: data
                            });
                        })
                        .catch(() => localStorage.setItem(url, "fail"));
                }
            } else {
                this.create4DaysForecastDom(JSON.parse(forecast));
            }
        }
    }

    create4DaysForecastDom(input) {
        const result = [];
        input.data.forEach((item, index) => {
            result.push(
                <div key={"daysForecast_" + index} className="weatherCard-btm-element">
                    <Typography>{item.forecast_day}</Typography>
                    <Typography className="weatherCard-p">
                        {item.forecast_icon ? <WeatherIcons name={item.forecast_icon} size="2x" /> : null}
                    </Typography>
                    <Typography>
                        {parseInt(item.forecast_temp_min - 273.15, 10) +
                            "/" +
                            parseInt(item.forecast_temp_max - 273.15, 10)}
                    </Typography>
                </div>
            );
        });
        if (this.mounted) {
            this.setState({ daysForecastDom: result, locationName: input.location, countryName: input.country });
        }
    }

    render() {
        const { twoHourNowCast, clock, mainColor } = this.props;
        const { locationName, countryName, daysForecastDom } = this.state;
        return (
            <div className="weatherCard">
                <Card {...twoHourNowCast} className={classnames(classnames.bgcolor, "weatherCard-card")}>
                    <CardMedia image={backImg} className="weatherCard-img">
                        <div className="weatherCard-media">
                            <div className="weatherCard-media-left">
                                {locationName && (
                                    <div>
                                        <div className="weatherCard-location">
                                            <Typography color="inherit" variant="h5">
                                                {locationName}
                                            </Typography>
                                            <Typography color="inherit" variant="subtitle1">
                                                {countryName}
                                            </Typography>
                                        </div>
                                        <div className="weatherCard-seperator" />
                                    </div>
                                )}
                                <div className="weatherCard-details">
                                    <Typography color="inherit" component="p">
                                        {clock}
                                    </Typography>
                                    <Typography color="inherit" component="p">
                                        {twoHourNowCast.current_description}
                                    </Typography>
                                </div>
                            </div>
                            <div className="weatherCard-media-right">
                                <Typography color="inherit" component="p" className="weatherCard-p">
                                    {twoHourNowCast.current_icon ? (
                                        <WeatherIcons name={twoHourNowCast.current_icon} size="3x" />
                                    ) : null}
                                </Typography>
                                <div className="weatherCard-temperature">
                                    <Typography color="inherit" variant="h5">
                                        {twoHourNowCast.current_temp}
                                    </Typography>
                                </div>
                                <div className="weatherCard-api-attrib">OpenWeatherMap</div>
                            </div>
                        </div>
                    </CardMedia>
                    {daysForecastDom && (
                        <CardContent className={classnames("weatherCard-btm", mainColor)}>
                            {daysForecastDom}
                        </CardContent>
                    )}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(WeatherCard);
