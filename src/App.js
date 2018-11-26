import React, { Component } from 'react';
import Chat from './Components/Chat'
//import $ from 'jquery'
import { connect } from 'react-redux'
import {AppBar,Toolbar,Typography,Grid , Hidden , IconButton,Badge,Drawer} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import UserList from './Components/UserList'

class App extends Component {

  render() {
    const {usersOnline} = this.props
    return (
      <div className="App">
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Hidden smUp>
              <Typography variant='h6' color='inherit' style={{flexGrow:1}}>
                Reactive Chat
              </Typography>
            </Hidden>
            <Hidden only='xs'>
              <Typography variant='h4' color='inherit' style={{flexGrow:1}}>
                Reactive Chat
              </Typography>
            </Hidden>
            <IconButton color='inherit' >
              <Badge  badgeContent={usersOnline.length} color='secondary'> 
                <AccountCircle  />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            <Chat />
          </Grid>
        </Grid>
        <Drawer open={true}>
          <UserList />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appIsInit: state.init,
    usersOnline: state.usersOnline
  }
}

export default connect(mapStateToProps)(App);
