import React from "react";
import PropTypes from "prop-types";
import { Drawer, CardHeader, IconButton, CardContent, CardActions, Icon, Stepper, Step } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Button, StepLabel } from "../../common";
import WidgetSelector from "./components/widgetSelector";
import VisualProps from "./components/visualProps";

const styles = Theme => {
    return {
        drawer_paper: {
            width: "33.2vw",
            position: "absolute"
        },
        cardContent_root: {
            flex: 1,
            overflow: "auto"
        },
        cardActions_root: {
            flexDirection: "row-reverse"
        },
        stepper_horizontal: {}
    };
};

const Operate = ({
    id,
    view,
    props,
    classes,
    open,
    actions,
    steps,
    onClose,
    onActionClick,
    title,
    activeStep,
    onWidgetSelected,
    compId,
    category,
    widgetList,
    templates,
    onCategoryChange
}) => {
    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawer_paper
            }}
        >
            <CardHeader
                title={title}
                action={
                    <IconButton onClick={onClose}>
                        <Icon>close</Icon>
                    </IconButton>
                }
            />
            <Stepper activeStep={activeStep}>
                {steps.map((item, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{item.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <CardContent
                classes={{
                    root: classes.cardContent_root
                }}
            >
                {!!activeStep ? (
                    <VisualProps id={id} get={node => (this.container = node)} view={view} props={props} />
                ) : (
                    <WidgetSelector
                        widgetList={widgetList}
                        compId={compId}
                        category={category}
                        templates={templates}
                        onCategoryChange={onCategoryChange}
                        onWidgetSelected={onWidgetSelected} /*categories={categories} templates={templates}*/
                    />
                )}
            </CardContent>
            <CardActions
                classes={{
                    root: classes.cardActions_root
                }}
            >
                {actions &&
                    actions.map((item, index) => {
                        return item.target === activeStep ? (
                            <Button
                                key={index}
                                color="secondary"
                                onClick={() => onActionClick(item.id, this.container)}
                                size="small"
                            >
                                {item.label}
                            </Button>
                        ) : null;
                    })}
            </CardActions>
        </Drawer>
    );
};

// Operate.prototype.handleActionClick = () => {

// };

Operate.defaultProps = {
    actions: [
        {
            target: 1,
            id: "save",
            label: "SAVE"
        },
        {
            target: 1,
            id: "back",
            label: "BACK"
        },
        {
            target: 0,
            id: "next",
            label: "NEXT"
        },
        {
            target: 0,
            id: "close",
            label: "CLOSE"
        }
    ],
    steps: [
        {
            label: "Select a widget"
        },
        {
            label: "Configure your widget"
        }
    ],
    activeStep: 0
};
Operate.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func
};

export default withStyles(styles)(Operate);
