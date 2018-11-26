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

  handleClick = () => {
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
                Reactive Chat 2.0
              </Typography>
            </Hidden>
            <Hidden only='xs'>
              <Typography variant='h4' color='inherit' style={{flexGrow:1}}>
                Reactive Chat 2.0
              </Typography>
            </Hidden>
            <Typography color='inherit'>
              built for <a href='https://twitter.com/Gadolfth' target='_blank' rel='noopener noreferrer' style={{color:'white'}}>@Gadolfth</a>
            </Typography>
            <Hidden smUp>
              <IconButton color='inherit' onClick={this.handleClick}>
                <Badge  badgeContent={usersOnline.length} color='secondary' invisible={usersOnline.length < 1}> 
                  <AccountCircle  />
                </Badge>
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>

        <Grid container justify='center'>
          <Grid item xs={12} sm={5}>
            <Chat />
          </Grid>
          <Hidden only='xs'>
            <Grid item sm={3}>
              <UserList />
            </Grid>
          </Hidden>
        </Grid>
        <Drawer open={listOpen} onClose={this.handleClick}>
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
