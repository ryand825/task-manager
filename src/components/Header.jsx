import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Drawer, FlatButton } from 'material-ui';
import { app } from '../base.js';


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleMenuClick = () => {
    this.setState({ open: true });
    console.log(this.state.open);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Task Manager"
          onTitleClick={() => {<Link to='/' />}}
          onLeftIconButtonClick={this.handleMenuClick}
          iconElementRight={ this.props.authenticated ?
            <FlatButton
              label="Logout"
              containerElement={<Link to='/logout' />}
              linkButton={true} /> :
              <FlatButton
              label="Login"
              containerElement={<Link to='/login' />}
              linkButton={true} />
            } />
            
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        />
      </div>
    );
  }
}

export default Header;