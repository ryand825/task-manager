import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Paper, Toolbar, ToolbarTitle, TextField, RaisedButton } from 'material-ui';

const style = {
    width: 300,
    margin: 20,
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

    handleRedirectComplete = () => {
        this.props.redirectComplete();
    }

    render() {
        if (this.props.redirect) {
            this.handleRedirectComplete();
            return <Redirect to="/" />
        }
        return (
            <div>
                <Paper style={style}>
                    <Toolbar><ToolbarTitle text="Create New Task Space" /></Toolbar>
                    <TextField
                        floatingLabelText="Task Space Name"
                        type="text"
                        ref='taskSpaceName'
                    /><br />
                    <RaisedButton
                        type="submit"
                        label="Create"
                        primary={true}
                        style={{ float: 'left', margin: '18px' }}
                        onClick={this.handleNewTaskSpace} />
                </Paper><br />

                {!this.props.data ?
                    <Paper style={{ display: 'inline-block', width: '300px', padding: '20px', borderRadius: "25px" }}>
                        Create a new space to get started<br />
                        A task space is where you will store and organize individual tasks. </Paper>
                    : ''}
            </div>
        )
    }
}

export default NewTaskSpace