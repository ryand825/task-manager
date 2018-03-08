import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green300} from 'material-ui/styles/colors';
import 'materialize-css/dist/css/materialize.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: green300
    }
})

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
            <App />
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();

