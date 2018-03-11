import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'materialize-css/dist/css/materialize.css';
import ThemeProvider from './ThemeProvider';


ReactDOM.render(
    // <MuiThemeProvider muiTheme={muiTheme}>
    //         <App />
    // </MuiThemeProvider>,
        <ThemeProvider />,
    document.getElementById('root'));
registerServiceWorker();

