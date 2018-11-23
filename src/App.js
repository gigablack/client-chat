import React, { Component } from 'react';
import Chat from './Components/Chat'
import planetLogo from './images/planet-logo.png'
import $ from 'jquery'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    const {appIsInit} = this.props
    if(appIsInit){
      $('#appTitle').removeClass('d-none').addClass('fadeIn slower delay-1s')
      $('#img').removeClass('d-none').addClass('slow fadeInRight delay-2s')
    }

    return (
      <div className="App">
        
        
        <div className='row'>
          <div className='col-4 text-right'>
            <img src={planetLogo} alt='planet' className='img-fluid planet animated d-none' id='img'></img>
          </div>
          <div className='col-8'>
            <h1 className='display-1 text-left app-title mt-3 animated d-none' id='appTitle'>Reactive Chat</h1>
          </div>
        </div>
        <Chat />
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
