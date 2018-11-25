import React, { Component } from 'react';
import Chat from './Components/Chat'
//import $ from 'jquery'
import { connect } from 'react-redux'
import {AppBar,Toolbar,Typography,Grid} from '@material-ui/core'

class App extends Component {

  render() {
    const {appIsInit} = this.props
    if(appIsInit){
      //$('#appTitle').removeClass('d-none').addClass('fadeIn slower delay-1s')
      //$('#img').removeClass('d-none').addClass('slow fadeInRight delay-2s')
    }

    return (
      <div className="App">
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              Reactive Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            <Chat />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appIsInit: state.init
  }
}

export default connect(mapStateToProps)(App);
