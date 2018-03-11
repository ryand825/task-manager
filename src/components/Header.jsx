import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AppBar, Drawer, FlatButton, IconButton, MenuItem, IconMenu, Divider } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: true,
      open: false,
      selectedSpace: 0
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userData.lastSelected !== nextProps.userData.lastSelected && this.props.userData.lastSelected !== 'temp') {
      this.handleSpaceSelect(nextProps.userData.spaces[nextProps.userData.lastSelected]);
      console.log(this.props.lastSelected)
    }
  }

  updateWindowDimensions = () => {
    if (window.innerWidth < 850) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  handleSpaceSelect = (value) => {
    this.setState({ selectedSpace: value });
    this.props.changeSpace(value.id);
  }

  handleMenuClick = () => {
    this.setState({ open: true });
  }

  render() {
    var spaceItems;
    if (this.props.userData.spaces) {
      let spaceIds = [1]
      spaceIds = Object.keys(this.props.userData.spaces);
      spaceItems = spaceIds.map(id => {
        return (
          <MenuItem
            value={this.props.userData.spaces[id].id}
            primaryText={this.props.userData.spaces[id].name}
            onClick={() => this.handleSpaceSelect(this.props.userData.spaces[id])} />
        )
      })
    }

    const Logged = () => (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <div style={{ fontWeight: 'bold' }}>Select TaskSpace</div>
        <Divider />
        {spaceItems}
        <Divider />
        <Link to="/new-task-space">Create new</ Link>
      </IconMenu>
    );

    return (
      <div>
        <AppBar
          title="Task Manager"
          onLeftIconButtonClick={this.handleMenuClick}
          iconElementRight={this.props.authenticated ?
            <FlatButton
              label="Logout"
              containerElement={<Link to='/logout' />}
              linkButton={true} /> :
            <FlatButton
              label="Login"
              containerElement={<Link to='/login' />}
              linkButton={true} />
          } > </AppBar>

        <Drawer
          docked={this.state.isMobile ? false : true}
          width={250}
          open={this.state.isMobile ? this.state.open : true}
          onRequestChange={(open) => this.setState({ open })}>
          <AppBar
            title={this.props.lastSelected ? this.props.userData.spaces[this.props.lastSelected].name : <Redirect to="/new-task-space" />}
            iconElementRight={this.props.authenticated ?
              <Logged />
              : <FlatButton
                label="Login"
                containerElement={<Link to='/login' />}
                linkButton={true} />}
            iconElementLeft={this.state.isMobile ? <IconButton><NavigationClose /></IconButton> : <span />}
            onLeftIconButtonClick={() => this.setState({ open: false })}
          />
        </ Drawer>
      </div>
    );
  }
}

export default Header;