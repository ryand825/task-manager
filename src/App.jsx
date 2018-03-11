import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks'
import Login from './components/Login';
import Logout from './components/Logout';
import NewTaskSpace from './components/NewTaskSpace';
import { app, base } from './base';
import uuid from 'uuid';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated === true) {
          return <Component {...props}{...rest} />
        } else {
          return (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }
      }
      }
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      userData: {
        spaces: {
          temp: {
            id: 'temp',
            name: 'Loading'
          }
        },
        lastSelected: 'temp'
      },
      loading: true,
      userIds: {},
      selectedSpace: '',
      redirect: false
    }



    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
          authenticated: true,
          loading: false
        })
        base.reset();
        this.userSpaces = base.syncState(`userIds/${user.uid}`, {
          context: this,
          state: 'userData'
        }).then(console.log('updated state: ', this.state.userData))
        // console.log(user.uid);
      } else {
        this.userSpaces = "";
        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false,
          userIds: {},
          userData: { spaces: { temp: { temp: 'temp' } } },
        })
      }
    })
  }

  createSpace = (taskSpaceName) => {
    var tempId = uuid.v4();
    if (this.state.userData.hasOwnProperty('spaces')) {
      var newSpace = this.state.userData;
      newSpace.spaces[tempId] = { id: tempId, name: taskSpaceName }
      newSpace.lastSelected = tempId;
      this.setState({ userData: newSpace, redirect: true })
    } else {
      this.setState({
        userData: {
          spaces: {
            [tempId]: {
              id: tempId,
              name: taskSpaceName
            }
          },
          lastSelected: tempId
        },
        redirect: true
      })
    }
  }

  handleChangeSpace = (nextSpace) => {
    var userData = this.state.userData;
    userData.lastSelected = nextSpace;
    this.setState({ userData })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.userSpaces);
    base.reset();
  }

  redirectComplete = () => {
    this.setState({ redirect: false })
  }

  // handleRemoveBase = () => {
  //   base.reset();
  //   console.log('remove base');
  // }

  // componentWillUpdate(){
  //   this.removeAuthListener();
  // }

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
            <Header authenticated={this.state.authenticated}
              userData={this.state.userData}
              lastSelected={this.state.userData.lastSelected}
              changeSpace={this.handleChangeSpace} />
            <PrivateRoute exact path='/taskspace/:taskspaceId'
              authenticated={this.state.authenticated}
              component={Tasks} />
            <PrivateRoute exact path='/new-task-space'
              authenticated={this.state.authenticated}
              component={NewTaskSpace}
              taskSpaceCreation={this.createSpace}
              redirect={this.state.redirect}
              redirectComplete={this.redirectComplete} 
              data={this.state.userData.lastSelected}/>
            {/* <Route exact path='/' component={Tasks} /> */}
            {/* <Route exact path='/login' component={Login} authenticated={this.state.authenticated} /> */}
            <Route exact path='/login' render={(props) => { return this.state.authenticated ? <Redirect to="/taskspace" /> : <Login /> }} />
            <Route exact path='/logout' component={Logout} removeBase={this.handleRemoveBase} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
