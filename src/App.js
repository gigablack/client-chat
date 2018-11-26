import React, { Component } from 'react';
import Chat from './Components/Chat'
//import $ from 'jquery'
import { connect } from 'react-redux'
import {AppBar,Toolbar,Typography,Grid , Hidden , IconButton,Badge,Drawer} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import UserList from './Components/UserList'
import { ACTIONS } from './Actions/Actions'

const {addUser,removeUser,updateUserList,toggleList} = ACTIONS

class App extends Component {
  componentDidMount(){
    const {socket,addUser,removeUser,updateUserList} = this.props

    socket.on('userConnect',(user)=>{
      console.log('new user')
      addUser(user)
    })

    socket.on('userDisconnected',(userID) => {
      removeUser(userID)
    })

    socket.on('updateUser',(user) =>{
      updateUserList(user)
    })
  }

  handleClick(){
    const {toggleList} = this.props

    toggleList()
  }


  render() {
    const {usersOnline,listOpen} = this.props
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
            <IconButton color='inherit' onClick={this.handleClick}>
              <Badge  badgeContent={usersOnline.length} color='secondary' invisible={usersOnline.length < 1}> 
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
        <Drawer open={listOpen}>
          <UserList />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appIsInit: state.init,
    usersOnline: state.usersOnline,
    socket: state.socket,
    listOpen: state.listOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser(user){
      dispatch(addUser(user))
    },

    removeUser(userID){
      dispatch(removeUser(userID))
    },

    updateUserList(user){
      dispatch(updateUserList(user))
    },

    toggleList(){
      dispatch(toggleList())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
