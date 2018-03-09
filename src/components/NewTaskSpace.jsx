import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AppBar, Drawer, FlatButton, Paper, Toolbar, ToolbarTitle, TextField, RaisedButton, Snackbar } from 'material-ui';
import uuid from 'uuid';

const style = {
    height: 'auto',
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class NewTaskSpace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    handleNewTaskSpace = () => {
        var taskSpaceName = this.refs.taskSpaceName.getValue();
        if (taskSpaceName) {
            this.props.taskSpaceCreation(taskSpaceName);
        }
    }

    render() {
        return (
            <Paper style={style}>
                <Toolbar><ToolbarTitle text="Create New Task Space" /></Toolbar>
                <TextField
                    floatingLabelText="Task Name"
                    type="text"
                    ref='taskSpaceName'
                /><br />
                <RaisedButton
                    type="submit"
                    label="Create"
                    primary={true}
                    style={{ float: 'left', margin: '18px' }}
                    onClick={this.handleNewTaskSpace} />
            </Paper>
        )
    }
}

export default NewTaskSpace