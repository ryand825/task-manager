import React, { Component } from 'react';
import { Paper, Toolbar, ToolbarTitle, TextField, RaisedButton, Snackbar } from 'material-ui';
import { app } from '../base.js';


const style = {
    height: 'auto',
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            snackbar: false,
            snackbarMessage: '',
            passwordValidation: '',
            passwordMatch: false,
            passwordLength: ''
        }


    }

    handleLogin = () => {
        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        var errorMessage = '';
        app.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            errorMessage = error.message;
            this.setState({ snackbar: true, snackbarMessage: errorMessage });
        });
    }

    createAccount = () => {
        var email = this.refs.newEmail.getValue();
        var password = this.refs.newPassword.getValue();
        var errorMessage = '';
        app.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            user.sendEmailVerification().then(() => {
                console.log("verification sent")
            })
        }).catch((error) => {
            errorMessage = error.message;
            this.setState({ snackbar: true, snackbarMessage: errorMessage });
        });
    }

    handleSnackbarClose = () => {
        this.setState({ snackbar: false, snackbarMessage: '' });
    }

    handlePasswordValidate = () => {
        var password = this.refs.newPassword.getValue();
        var retypePassword = this.refs.retypePassword.getValue();
        if (password !== retypePassword && retypePassword !== '') {
            this.setState({ passwordValidation: 'Passwords do not match.', passwordMatch: false })
        } else if (password === retypePassword && password !== '') {
            this.setState({ passwordValidation: '', passwordMatch: true })
        }

        if (password.length < 6) {
            this.setState({ passwordLength: 'Password must be atleast 6 characters long' })
        } else {
            this.setState({ passwordLength: '' })
        }
    }

    render() {
        return (
            <div>
                {/* Login */}
                <Paper style={style}>
                    <Toolbar><ToolbarTitle text="Login existing user" /></Toolbar>
                    <TextField
                        floatingLabelText="Email"
                        type="email"
                        ref='email'
                    /><br />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        ref='password'
                    /><br />
                    <RaisedButton
                        type="submit"
                        label="Login"
                        primary={true}
                        style={{ float: 'left', margin: '18px' }}
                        onClick={this.handleLogin} />
                </Paper> <br />

                {/* New User */}
                <Paper style={style}>
                    <Toolbar><ToolbarTitle text="Create new user" /></Toolbar>
                    <TextField
                        floatingLabelText="Email"
                        type="email"
                        ref="newEmail"
                    /><br />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        errorText={this.state.passwordLength}
                        ref="newPassword"
                        onChange={this.handlePasswordValidate}
                    /><br />
                    <TextField
                        floatingLabelText="Re-type Password"
                        type="password"
                        errorText={this.state.passwordValidation}
                        onChange={this.handlePasswordValidate}
                        ref='retypePassword'
                    /><br />
                    <RaisedButton label="Create Account" onClick={this.createAccount} primary={true} style={{ float: 'left', margin: '18px' }} />
                </Paper>

                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default Header;