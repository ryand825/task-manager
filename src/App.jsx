import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks'
import Login from './components/Login';
import Logout from './components/Logout';
import { app } from './base';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    }

    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    // base.removeBinding(this.songsRef);
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header authenticated={this.state.authenticated} />
            <Route exact path='/' component={Tasks} />
            {/* <Route exact path='/login' component={Login} authenticated={this.state.authenticated} /> */}
            <Route exact path='/login' render={(props) => { return this.state.authenticated ? <Redirect to="/" /> : <Login /> }} />
            <Route exact path='/logout' component={Logout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
