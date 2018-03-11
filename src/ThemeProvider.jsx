import React, { Component } from 'react'
import App from './App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue300 } from 'material-ui/styles/colors';

class ThemeProvider extends Component {
    constructor() {
        super()
        this.state = {
            themeColor: blue300
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({
                palette: {
                    primary1Color: this.state.themeColor
                },
                changeTheme: () => {
                    this.setState({ themeColor: '#f4c842' })
                }
            })}>
                <App />
            </MuiThemeProvider>
        )
    }
}

export default ThemeProvider