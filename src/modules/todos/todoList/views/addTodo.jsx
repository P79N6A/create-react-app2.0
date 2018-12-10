import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodo } from "../funcs/actions";

class AddTodo extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const input = this.input;
        if (!input.value.trim()) {
            return;
        }

        this.props.onAdd(input.value);
        input.value = "";
    }

    render() {
        return (
            <div className="add-todo">
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="new-todo" ref={ref => (this.input = ref)} />
                    <button className="add-btn" type="submit">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

AddTodo.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: text => {
            dispatch(addTodo(text));
        }
    };
};

export default connect(null, mapDispatchToProps)(AddTodo);
