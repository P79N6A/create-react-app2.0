import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
const styles = themes => ({
    root: {
		 width: "150px",
		 marginTop: "25px"
	 },
	 thumb: {
		 backgroundColor: themes.palette.secondary.main
	 },
	 track: {
		 backgroundColor: themes.palette.secondary.main
	 }
});

class SimpleSlider extends React.Component {
	 handleChange = (event, value) => {
	 	this.props.handleSliderChange(value);
	 };
 
	 render() {
	 	const { classes, value } = this.props;
	 	return (
	 			<div className={classes.root}>
	 				<Slider value={value} aria-labelledby="label" onChange={this.handleChange}  classes={{ thumb: classes.thumb, track: classes.track }}/>
	 			</div>
	 	);
	 }
}

SimpleSlider.propTypes = {
	 classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);