/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidential and proprietary to NCS Pte. Ltd. You shall
*  use this software only in accordance with the terms of the license
*  agreement you entered into with NCS.  No aspect or part or all of this
*  software may be reproduced, modified or disclosed without full and
*  direct written authorisation from NCS.
*
*  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
*  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
*  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
*  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
*  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
*  =========================================================================
*/
/**
 * Created by chenling on 02/08/2018.
 */
import React from "react";
// import { theme as Theme } from "modules/theme";
import {Drawer} from "modules/common";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { CardWithTitle } from "modules/basicCardComps";
import { CardHeader, IconButton, Icon } from "@material-ui/core";
import SopFrom from "./sopFrom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { I18n } from "react-i18nify";
// const drawerWidth = 600;
const styles = theme => ({
    // drawerPaper: {
    //     position: "absolute",
    //     width: drawerWidth,
    //     height: "100%",
    //     transform: `translate(${drawerWidth}px, 0px)`,
    //     transition: theme.transitions.create("width", {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen
    //     }),
    //     backgroundColor: theme.palette.background.paper,
    //     color: theme.palette.text.primary,
    // },
    button: {
        margin: theme.spacing.unit,
        border: "none"
    },
    input: {
        display: "none",
    },
});

// const AddSops = props => {
//     return <Drawer {...props} />;

// };
class AddSops extends React.Component{
    static defaultProps = {
        // title: "",
        // subTitle: "",
        // cancleText: "",
        // submitText: "",
        // icons: [],
        // itemInfo: {
        //     starttime: "",
        //     endtime: ""
        // },
        // open: false,
        // edit: false
        // width: "",
        // height: "",
        // noPadding: false,
        // iconContent: null,
        // onClose: false,
        // cancle: () => {},
        // submit: () => {}
    };
    state = {
        validate: true,
        reset: false,
    //     icons: [],
    //     onClose: true,
    //     isDisabled: false,
    //     isFooter: false,
    //     itemInfo: {
    //         starttime: "",
    //         endtime: ""
    //     },
    //     edit: this.props.edit,
    //     add: this.props.add,
    };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.view){
            return this.setState({
                validate: true,
                reset: true,
            });
        };
        if(nextProps.add){
            return this.setState({
                reset: false,
            });
        }
        // if(nextProps.itemInfo){
        //     this.setState({
        //         itemInfo: nextProps.itemInfo,
        //         edit: nextProps.edit,
        //         add: nextProps.add,
        //     },()=>{
        //         // console.log(this.state);
        //     });
        // }
    };
    buttonValidate=(value)=>{
        // console.log(value);
        this.setState({
            validate: value,
        });
    };
    handleClose=()=>{
        // console.log("handleClose");
        this.setState({
            validate: true,
            reset: true
        });
        this.props.handleClose();
    }
    submitHandle=()=>{
        this.setState({
            reset: true
        });
        this.props.submitHandle();
    }
    handleWidthChangeFunc = () => {
        this.setState({
            shouldWidth2X: !this.state.shouldWidth2X
        });
    };
    render(){
        // console.log(this.props.toggleDrawerShow);
        // console.log(this.state.right);
        const { classes, title, submitText, identify, sopManagmentSchema, toggleDrawerShow} = this.props;
        // console.log(this.props);
        // console.log(this.state);
        // const {  itemInfo, open, edit, add } = this.props;
        // const cancle = cancleText || I18n.t("modal.buttonText.left");
        // const submit = submitText || I18n.t("modal.buttonText.right");
        // console.log(add);
        return (
            // <MuiThemeProvider theme={Theme}>
            <Drawer 
                variant="persistent"
                anchor="right"
                // classes={{
                //     paper: classes.drawerPaper,
                //     // paper: shouldWidth2X ? classes.paper2X : classes.paper
                // }} 
                open={toggleDrawerShow}
            >
                <CardHeader
                    // asContainer
                    // title={title}
                    // handleCloseClick={this.handleClose}
                    // style={{ height: "100%", position: "relative", overflowY: "auto" }}
                    action={
                        <IconButton onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </IconButton>
                    }
                    title={title}
                    subheader=""
                />
                <div className="floatTab-container">
                    <div className="sopFrom">
                        <SopFrom 
                            identify = {identify}
                            add={this.props.add}
                            view={this.props.view}
                            getFormData={this.props.getFormData}
                            edit={this.props.edit}
                            columns={this.props.itemInfo}
                            buttonValidate={this.buttonValidate}
                            reset={this.state.reset}
                            sopManagmentSchema= {sopManagmentSchema}
                        />
                    </div>
                
                </div>
                <div className="sop-tool">
                    <Button                        variant="contained"         color="secondary" 
                        className={classes.button}
                        onClick={this.handleClose}
                    >
                        {I18n.t("common.Cancel")}
                    </Button>

                    {!this.props.view&&<Button    
                        variant="contained"  
                        color="secondary" 
                        className={classes.button}
                        onClick={this.submitHandle}
                        disabled={!this.state.validate}
                    >
                        {submitText}
                    </Button>
                    }
                </div>
                    
                {/* </div> */}
            </Drawer>
            // </MuiThemeProvider>
            
        );
    }
    
}

export default withStyles(styles)(AddSops);