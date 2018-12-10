import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import encode16bit from "commons/utils/encode16bit";
const styles = {
    media: {
        height: 140,
        width: "100%"
    },
    card: {
        marginTop: "10px"
    }
};

class DrawImage extends React.Component {
    render() {
        const {classes, file, desc} = this.props;
        let token = encode16bit.ascii2hex(sessionStorage.getItem("ISC-Auth-Token"));
        let urls = sessionStorage.getItem("ISC-URL");
        const url = `${JSON.parse(urls).alarmDownload}${file}${token}`;
        return  <Card className={classes.card}>
            {file ? <CardMedia
                className={classes.media}
                image={url}
                title={desc}
            /> : <CardMedia
                className={classes.media}
                image="/static/media/SURF_Landscape-RWH.c3594f2a.png"
                title={desc}
            />}
        </Card>;
    }
}

export default withStyles(styles)(DrawImage);
